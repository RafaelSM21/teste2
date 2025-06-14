-- Create the role if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'lynch_admin') THEN
      CREATE ROLE lynch_admin WITH LOGIN PASSWORD '@rl3yz1nh4ch@n';
   END IF;
END
$do$;

-- Create the database if it doesn't exist
CREATE DATABASE "LynchAreaDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1; 