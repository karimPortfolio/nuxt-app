#!/bin/bash

export MYSQL_ROOT_PASSWORD=$(sudo -E grep 'temporary password' /var/log/mysqld.log | tail -1 | awk '{print $NF}')
export MYSQL_USER="newuser"
export MYSQL_PASSWORD="newpassword"
export MYSQL_DATABASE="yourdatabase"
export PROJECT_REPO=git@github.com:karimPortfolio/deploy-node-app.git
export PROJECT_NAME=deploy-node-app
export PATH="/var/www"
export APP_FILE_NAME="app.js"

#update system
 yum update -y

# Install Git if not already installed
echo "Checking if Git is installed..."
if ! git --version &>/dev/null; then
  echo "Git is not installed. Installing Git..."
  yum install git -y
else
  echo "Git is already installed."
fi

# Install Nodejs if not installed
if ! node -v &>/dev/null; then
  echo 'Nodejs is not installed. Installing Nodejs'
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install --lts
  nvm use --lts
else 
  echo 'Nodejs already installed'
fi

# Install PM2 if not installed
if ! pm2 -v &>/dev/null; then
  echo 'PM2 is not installed. Installing PM2'
  npm install pm2 -g
else 
  echo 'PM2 already installed'
  fi

# Install PM2 if not installed
if ! pm2 -v &>/dev/null; then
  echo 'PM2 is not installed. Installing PM2'
  npm install pm2 -g
else 
  echo 'PM2 already installed'
fi

# Install supervisor
if ! supervisor -v &>/dev/null; then
  echo 'Supervisor is not installed. Installing Supervisor'
  npm install supervisor -g
else 
  echo 'Supervisor already installed'
fi


# Install MySQL and start the service
echo "Installing MySQL..."
 yum install -y mysql-server
systemctl enable --now mysqld

# Secure MySQL installation
echo "Securing MySQL..."
mysql_secure_installation

# Create MySQL user and grant privileges

echo "Creating MySQL user and granting privileges..."

 mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOF
CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;
CREATE USER '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';
GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'%';
FLUSH PRIVILEGES;
EXIT;
EOF

