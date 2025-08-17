-- Initialize database for EverShop

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure the database exists
CREATE DATABASE evershop WITH OWNER postgres;

-- Connect to the database
\c evershop;

-- Set timezone
SET timezone = 'UTC';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE evershop TO postgres;