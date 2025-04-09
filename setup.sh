#!/bin/bash

export MYSQL_ROOT_PASSWORD=$(sudo -E grep 'temporary password' /var/log/mysqld.log | tail -1 | awk '{print $NF}')
export MYSQL_USER="nuxt_app_user"

export MYSQL_DATABASE="nuxt_app_db"
export PROJECT_REPO=git@github.com:karimPortfolio/nuxt-app.git
export PROJECT_NAME=nuxt-app
export DIR_PATH="/var/www"
# export APP_FILE_NAME="app.js"

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
  curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
  sudo yum install -y nodejs
  node -v
  npm -v
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


# Clone project
echo "cloning project from $PROJECT_REPO ..."
git clone "$PROJECT_REPO"


# Navigate into the project folder
cd "$PROJECT_NAME" || { echo "Failed to enter directory $PROJECT_NAME"; exit 1; }

# Install project dependencies
echo "Installing project dependencies..."
npm install

# create .env file
echo "Creating .env file..."
touch .env
echo DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@localhost:3306/$MYSQL_DATABASE" > .env


# run project
echo "Running project..."
node .output/server/index.mjs


echo "Congrats!! You're live now ;)"
