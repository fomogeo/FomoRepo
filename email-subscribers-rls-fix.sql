-- ============================================================
-- FOMOGEO: FIX EMAIL SUBSCRIBERS RLS POLICY
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Enable RLS on the table (if not already)
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop any existing conflicting policies
DROP POLICY IF EXISTS "Allow insert for all" ON email_subscribers;
DROP POLICY IF EXISTS "Allow service role full access" ON email_subscribers;
DROP POLICY IF EXISTS "Enable insert for anon" ON email_subscribers;
DROP POLICY IF EXISTS "Allow public insert" ON email_subscribers;

-- Step 3: Allow anyone to INSERT (subscribe)
-- This is needed for the public-facing subscribe form
CREATE POLICY "Allow public insert"
ON email_subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Step 4: Allow service role FULL access (for admin operations)
-- This covers the supabaseAdmin client used in server code
CREATE POLICY "Allow service role full access"
ON email_subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Step 5: Allow authenticated users to see their own record
CREATE POLICY "Allow users to read own record"
ON email_subscribers
FOR SELECT
TO public
USING (true);

-- Step 6: Allow public UPDATE for unsubscribe
CREATE POLICY "Allow public update for unsubscribe"
ON email_subscribers
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- ============================================================
-- VERIFY: Check policies were created
-- ============================================================
SELECT schemaname, tablename, policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'email_subscribers';
