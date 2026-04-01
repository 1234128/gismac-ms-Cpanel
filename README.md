
### 5. Configure Environment Variables
In the Node.js App interface:
- Add environment variables:
- `NODE_ENV` = `production`
- `PORT` = [assigned by cPanel]
- `MONGODB_URI` = your MongoDB connection string
- `JWT_SECRET` = your secure JWT secret (min 32 chars)

### 6. Setup MongoDB Database
**Option A - cPanel MongoDB:**
1. Open "MongoDB" in cPanel
2. Create Database: `gismac_db`
3. Create User with password
4. Note the connection string

**Option B - MongoDB Atlas:**
1. Create cluster at mongodb.com
2. Add IP whitelist (0.0.0.0/0 for all or your server IP)
3. Create database user
4. Copy connection string to `.env`

### 7. Restart Application
In the Node.js App interface, click "Restart"

### 8. Verify Deployment
- Visit your domain
- Check health endpoint: `https://yourdomain.com/api/v1/health`
- Test login with provided credentials

## Default Test Credentials

| Email | Password | Role | Tier |
|-------|----------|------|------|
| admin@gismac.co.ke | Admin123! | Administrator | 1 |
| hr@gismac.co.ke | HR123! | HR Manager | 2 |
| finance@gismac.co.ke | Finance123! | Finance Officer | 3 |
| supervisor@gismac.co.ke | Super123! | Site Supervisor | 4 |
| guard@gismac.co.ke | Guard123! | Security Guard | 5 |

## Troubleshooting

### Application Won't Start
- Check error logs in cPanel Node.js interface
- Verify `app.js` exists in root folder
- Ensure port matches `.htaccess` configuration

### Database Connection Failed
- Verify MongoDB service is running
- Check firewall rules allow MongoDB port
- Test connection string format

### 500 Errors
- Check `JWT_SECRET` is set and 32+ characters
- Verify all npm packages installed
- Review application logs in cPanel

### Frontend Not Loading
- Ensure `frontend` folder contains `index.html`
- Check `.htaccess` rewrite rules
- Verify static file serving is working

## File Structure After Deployment
