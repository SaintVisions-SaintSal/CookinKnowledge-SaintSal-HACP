# Resend Webhook Setup Guide

## Webhook Configuration

### 1. Endpoint URL
Add this webhook to your Resend dashboard:

**Production:**
```
https://cookinbiz.com/api/webhooks/resend
```

**Development (Vercel Preview):**
```
https://your-project.vercel.app/api/webhooks/resend
```

### 2. Event Types
Select ALL of these event types in Resend:

- ✅ `email.sent` - Email was accepted by the sending service
- ✅ `email.delivered` - Email was successfully delivered to recipient's inbox
- ✅ `email.delivery_delayed` - Email delivery was delayed
- ✅ `email.complained` - Recipient marked email as spam
- ✅ `email.bounced` - Email bounced (hard or soft bounce)
- ✅ `email.opened` - Recipient opened the email
- ✅ `email.clicked` - Recipient clicked a link in the email

### 3. What Happens With Each Event

**email.sent**
- Logged to database for tracking
- Confirms email was accepted by mail server

**email.delivered**
- Logged to database
- Confirms successful delivery to inbox

**email.bounced**
- Logged with bounce type (hard/soft)
- Hard bounces = invalid email address
- Soft bounces = temporary issue (full inbox, server down)

**email.complained**
- Logged as spam complaint
- Should immediately unsubscribe this contact

**email.opened**
- Tracks email opens for engagement metrics
- Logged with timestamp

**email.clicked**
- Tracks link clicks for engagement
- Logs which link was clicked

### 4. Database Storage

All events are stored in the `email_events` table:
```sql
- id: unique event ID
- event_type: type of event (email.sent, email.delivered, etc.)
- email_id: Resend email ID
- email: recipient email address
- subject: email subject line
- from_email: sender email
- to_email: recipient email
- timestamp: when event occurred
- raw_data: full webhook payload (JSONB)
- created_at: when we logged the event
```

### 5. Viewing Email Events

Admins can query email events:
```sql
-- View all events for a specific email
SELECT * FROM email_events WHERE email = 'user@example.com';

-- View all bounces
SELECT * FROM email_events WHERE event_type = 'email.bounced';

-- View email engagement (opens + clicks)
SELECT * FROM email_events 
WHERE event_type IN ('email.opened', 'email.clicked')
ORDER BY timestamp DESC;
```

### 6. Testing the Webhook

After adding the webhook in Resend:
1. Send a test email from your app
2. Check the Resend dashboard for webhook delivery status
3. Query the `email_events` table to confirm events are being logged
4. Check your app logs for the `[v0] Resend webhook received` messages

### 7. Security

The webhook endpoint verifies Resend's signature using Svix headers:
- `svix-id`
- `svix-timestamp`
- `svix-signature`

If these headers are missing, the webhook rejects the request.

### 8. Troubleshooting

**Webhook not receiving events:**
- Verify URL is correct in Resend dashboard
- Check that all event types are selected
- Ensure your app is deployed and accessible
- Check Resend webhook logs for delivery failures

**Events not appearing in database:**
- Check app logs for database errors
- Verify `email_events` table exists
- Run the migration script: `004_create_email_events_table.sql`
- Check RLS policies allow insertion

**Errors in logs:**
- Look for `[v0] Resend webhook error` messages
- Check that Supabase connection is working
- Verify environment variables are set correctly
