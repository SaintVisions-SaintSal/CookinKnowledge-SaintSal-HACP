-- CookinBiz Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'affiliate', 'vp')),
  affiliate_code VARCHAR(50) UNIQUE,
  referred_by VARCHAR(50),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email and role
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('lending', 'realestate', 'investment', 'tech', 'merchant', 'payroll', 'affiliate', 'contact')),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'lost')),
  data JSONB NOT NULL,
  source VARCHAR(255),
  affiliate_code VARCHAR(50),
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_leads_form_type ON leads(form_type);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_affiliate_code ON leads(affiliate_code);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- AFFILIATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  vp_id UUID REFERENCES affiliates(id),
  commission_rate DECIMAL(5,4) DEFAULT 0.40,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  pending_earnings DECIMAL(12,2) DEFAULT 0,
  paid_earnings DECIMAL(12,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'suspended')),
  payout_method VARCHAR(50),
  payout_details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_affiliates_code ON affiliates(code);
CREATE INDEX idx_affiliates_vp_id ON affiliates(vp_id);
CREATE INDEX idx_affiliates_status ON affiliates(status);

-- ============================================
-- REFERRALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id) NOT NULL,
  lead_id UUID REFERENCES leads(id),
  user_id UUID REFERENCES users(id),
  plan VARCHAR(50),
  amount DECIMAL(12,2) DEFAULT 0,
  commission DECIMAL(12,2) DEFAULT 0,
  vp_commission DECIMAL(12,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'cancelled')),
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_referrals_affiliate_id ON referrals(affiliate_id);
CREATE INDEX idx_referrals_status ON referrals(status);

-- ============================================
-- MARKETING CAMPAIGNS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id),
  title VARCHAR(255) NOT NULL,
  campaign_type VARCHAR(50) NOT NULL CHECK (campaign_type IN ('social', 'email', 'video')),
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MARKETING POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS marketing_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES marketing_campaigns(id),
  channel VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  content TEXT NOT NULL,
  media_url TEXT,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  ai_source VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MARKETING TASKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS marketing_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES marketing_campaigns(id),
  task_type VARCHAR(50) NOT NULL,
  prompt TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'done', 'error')),
  result_data JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- MARKETING METRICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS marketing_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES marketing_posts(id),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  opens INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STRIPE SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  plan VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- AI CONVERSATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  model VARCHAR(50) DEFAULT 'claude',
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Admins can read all users
CREATE POLICY "Admins can read all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'vp')
    )
  );

-- Leads policies
CREATE POLICY "Admins can manage all leads" ON leads
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'vp')
    )
  );

CREATE POLICY "Users can view own leads" ON leads
  FOR SELECT USING (user_id = auth.uid());

-- Affiliate policies
CREATE POLICY "Affiliates can view own data" ON affiliates
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "VPs can view their team" ON affiliates
  FOR SELECT USING (
    vp_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid())
  );

-- Referrals policies
CREATE POLICY "Affiliates can view own referrals" ON referrals
  FOR SELECT USING (
    affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid())
  );

-- Marketing policies
CREATE POLICY "Affiliates can manage own campaigns" ON marketing_campaigns
  FOR ALL USING (
    affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid())
  );

-- AI Conversations policies
CREATE POLICY "Users can manage own conversations" ON ai_conversations
  FOR ALL USING (user_id = auth.uid());

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_affiliates_updated_at
  BEFORE UPDATE ON affiliates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to generate affiliate code
CREATE OR REPLACE FUNCTION generate_affiliate_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.affiliate_code IS NULL THEN
    NEW.affiliate_code = UPPER(SUBSTRING(MD5(NEW.id::text || NOW()::text) FROM 1 FOR 8));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_affiliate_code_trigger
  BEFORE INSERT ON affiliates
  FOR EACH ROW EXECUTE FUNCTION generate_affiliate_code();

-- ============================================
-- INITIAL DATA
-- ============================================

-- Insert admin user (update with your actual admin user ID after auth creation)
-- INSERT INTO users (email, full_name, role) VALUES 
-- ('ryan@cookinknowledge.com', 'Ryan Capatosto', 'admin');

-- Commission rates per plan (for reference)
-- Unlimited: $99/mo -> $3.80/mo affiliate, $3.80/mo VP
-- Pro: $297/mo -> $13.50/mo affiliate, $13.50/mo VP  
-- Teams: $497/mo -> $38.50/mo affiliate, $38.50/mo VP
-- Enterprise: Custom -> $100 one-time affiliate, $50 one-time VP
