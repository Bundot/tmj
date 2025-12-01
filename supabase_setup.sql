-- 1. Reset Policies
DROP POLICY IF EXISTS "Allow authenticated users to insert content" ON content;
DROP POLICY IF EXISTS "Allow authenticated users to update content" ON content;
DROP POLICY IF EXISTS "Allow authenticated users to manage content" ON content;
DROP POLICY IF EXISTS "Allow anonymous to manage content" ON content;
DROP POLICY IF EXISTS "Allow public to read content" ON content;

-- 2. Create Strict Policy for Authenticated Users (Admin)
-- This allows ONLY logged-in users to Insert, Update, Delete
CREATE POLICY "Allow authenticated users to manage content"
  ON content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Create Public Read Policy
-- This allows EVERYONE (including anonymous) to READ content
CREATE POLICY "Allow public to read content"
  ON content
  FOR SELECT
  TO anon
  USING (true);

-- 4. (Optional) Clean up the old users table if you want
-- DROP TABLE IF EXISTS users;
