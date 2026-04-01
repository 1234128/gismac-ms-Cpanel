# Gismac MS - cPanel Deployment Guide

## Prerequisites
- cPanel hosting with Node.js support (Node.js Selector)
- MongoDB database (cPanel MongoDB or MongoDB Atlas)
- File Manager access or FTP client

## Deployment Steps

### 1. Prepare Your Application
- Ensure all files follow the structure above
- Update `.htaccess` with your assigned port number
- Configure `.env` with your database credentials

### 2. Upload Files
1. Log in to cPanel
2. Open File Manager
3. Navigate to `public_html` or your subdomain folder
4. Upload all project files maintaining the directory structure

### 3. Setup Node.js Application
1. In cPanel, open "Setup Node.js App" or "Node.js Selector"
2. Click "Create Application"
3. Select Node.js version 18.x or higher
4. Set Application Root to your project folder
5. Set Application URL to your domain/subdomain
6. Set Application Startup File to `app.js`
7. Click "Create"

### 4. Install Dependencies
In the Node.js App interface:
- Click "Run NPM Install" or use the provided terminal
- Alternatively, use cPanel Terminal:
