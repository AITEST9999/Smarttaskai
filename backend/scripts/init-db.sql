-- Initialize the Smart Task Manager database
-- This script runs when the PostgreSQL container starts for the first time

-- Create the main database (if it doesn't exist)
SELECT 'CREATE DATABASE smart_task_manager'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'smart_task_manager')\gexec

-- Create test database for running tests
SELECT 'CREATE DATABASE smart_task_manager_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'smart_task_manager_test')\gexec

-- Enable required extensions
\c smart_task_manager

-- Enable uuid extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for additional crypto functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Switch to test database and enable extensions there too
\c smart_task_manager_test

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; 