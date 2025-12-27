-- Create email_events table to track all email delivery events
CREATE TABLE IF NOT EXISTS email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  email_id TEXT,
  email TEXT NOT NULL,
  subject TEXT,
  status TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_email_events_email ON email_events(email);
CREATE INDEX idx_email_events_email_id ON email_events(email_id);
CREATE INDEX idx_email_events_created_at ON email_events(created_at DESC);
CREATE INDEX idx_email_events_status ON email_events(status);

-- Add email tracking columns to contact_submissions
ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS email_valid BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS unsubscribed BOOLEAN DEFAULT false;

-- Enable RLS
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

-- Admin can view all email events
CREATE POLICY "Admins can view email events"
ON email_events FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);
