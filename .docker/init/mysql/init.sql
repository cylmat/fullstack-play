-- Create database
CREATE DATABASE IF NOT EXISTS symfony DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'pass';

-- Grant privileges
GRANT ALL PRIVILEGES ON symfony.* TO 'user'@'%';

-- Apply changes
FLUSH PRIVILEGES;