-- Create email_events table to track all Resend email events
CREATE TABLE IF NOT EXISTS public.email_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  email_id text NOT NULL,
  email text NOT NULL,
  subject text,
  from_email text,
  to_email text,
  timestamp timestamp with time zone NOT NULL,
  raw_data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_events_pkey PRIMARY KEY (id)
);

-- Create index for faster lookups by email_id and event_type
CREATE INDEX IF NOT EXISTS idx_email_events_email_id ON public.email_events(email_id);
CREATE INDEX IF NOT EXISTS idx_email_events_type ON public.email_events(event_type);
CREATE INDEX IF NOT EXISTS idx_email_events_to_email ON public.email_events(to_email);

-- Enable RLS
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;

-- Admin can view all email events
CREATE POLICY "Admins can view all email events"
  ON public.email_events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

COMMENT ON TABLE public.email_events IS 'Tracks all email events from Resend webhooks';
