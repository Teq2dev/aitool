# 🚀 Vercel Deployment Guide for AI Directory

## ⚠️ IMPORTANT: MongoDB Setup Required

**Your current MongoDB (localhost:27017) won't work on Vercel!**

You need a cloud MongoDB database. Follow these steps:

---

## Step 1: Set Up MongoDB Atlas (Free)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a **FREE** account
3. Create a new cluster (choose the FREE tier - M0)
4. Select a cloud provider and region (closest to your users)
5. Click "Create Cluster" (takes 3-5 minutes)

### 1.2 Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin` (or your choice)
5. Password: Click "Autogenerate Secure Password" and **SAVE IT**
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.3 Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.4 Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. **SAVE THIS CONNECTION STRING** - you'll need it!

---

## Step 2: Update Clerk Settings

### 2.1 Add Vercel Domain to Clerk
1. Go to https://dashboard.clerk.com
2. Select your application
3. Go to "Domains" section
4. Add your Vercel domain (you'll get this after deployment):
   - Example: `your-app-name.vercel.app`
5. Save changes

### 2.2 Get Production Keys (Optional but Recommended)
1. In Clerk dashboard, check if you want to use production keys
2. Current keys are test keys (pk_test_*, sk_test_*)
3. For production, switch to production keys in Clerk dashboard

---

## Step 3: Push Code to GitHub

### 3.1 Initialize Git Repository

```bash
cd /app
git init
git add .
git commit -m "Initial commit: AI Directory with Blogs"
```

### 3.2 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `ai-tools-directory` (or your choice)
3. Description: "AI Tools Directory with blog functionality"
4. Choose **Public** or **Private**
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

### 3.3 Push to GitHub
```bash
# Replace YOUR_USERNAME and YOUR_REPO with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to Vercel

### 4.1 Import Project
1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Click "Import" next to your repository
4. Vercel will auto-detect Next.js configuration

### 4.2 Configure Project Settings
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `yarn build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)

### 4.3 Add Environment Variables

**Click "Environment Variables" and add these:**

```env
MONGO_URL=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/
DB_NAME=ai_directory
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG9nZXRoZXItcm9vc3Rlci00OS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_n7jVHit60hu9slvvfDMmexEjqwqVHAH1pfCj630njJ
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
CORS_ORIGINS=*
```

**Important:**
- Replace `MONGO_URL` with your MongoDB Atlas connection string from Step 1.4
- Replace `NEXT_PUBLIC_BASE_URL` after you know your Vercel URL
- For production, consider updating Clerk keys to production keys

### 4.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build and deployment
3. Vercel will provide a URL: `https://your-app-name.vercel.app`

---

## Step 5: Initialize Database with Sample Data

### 5.1 Run Database Initialization

After successful deployment:

1. Open your deployed app: `https://your-app-name.vercel.app`
2. In browser, visit: `https://your-app-name.vercel.app/api/init`
3. You should see: `{"success":true,"message":"Database initialized"}`
4. This loads 12 AI tools, 26 categories, and 3 blog posts

### 5.2 Verify Deployment

Test these URLs:
- Home: `https://your-app-name.vercel.app/`
- Tools: `https://your-app-name.vercel.app/tools`
- Blogs: `https://your-app-name.vercel.app/blogs`
- Categories: `https://your-app-name.vercel.app/categories`

---

## Step 6: Update Clerk Domain

### 6.1 Add Vercel URL to Clerk
1. Go back to Clerk dashboard
2. Add your Vercel URL: `your-app-name.vercel.app`
3. Save changes
4. Test authentication by signing up on your deployed app

---

## 🎯 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Connection string obtained and working
- [ ] Code pushed to GitHub
- [ ] Vercel project created and deployed
- [ ] All environment variables added to Vercel
- [ ] Database initialized with `/api/init`
- [ ] Vercel domain added to Clerk
- [ ] Authentication tested (sign up/sign in)
- [ ] All pages loading correctly
- [ ] Admin dashboard accessible

---

## 🔧 Common Issues & Solutions

### Issue 1: "Cannot connect to database"
**Solution:** Check MongoDB Atlas connection string
- Ensure password is correct (no special characters need URL encoding)
- Verify IP whitelist includes 0.0.0.0/0
- Check MongoDB cluster is running

### Issue 2: "Clerk authentication not working"
**Solution:** 
- Add Vercel domain to Clerk dashboard
- Verify environment variables are set correctly
- Check Clerk keys are correct

### Issue 3: "API routes returning 404"
**Solution:**
- Ensure `NEXT_PUBLIC_BASE_URL` is set correctly
- Verify all API routes are in `/app/api/[[...path]]/route.js`

### Issue 4: "Build failed on Vercel"
**Solution:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify no TypeScript errors

---

## 📝 Environment Variables Reference

| Variable | Example | Required | Description |
|----------|---------|----------|-------------|
| MONGO_URL | mongodb+srv://... | ✅ Yes | MongoDB Atlas connection string |
| DB_NAME | ai_directory | ✅ Yes | Database name |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | pk_test_... | ✅ Yes | Clerk public key |
| CLERK_SECRET_KEY | sk_test_... | ✅ Yes | Clerk secret key |
| NEXT_PUBLIC_BASE_URL | https://your-app.vercel.app | ✅ Yes | Your app URL |
| CORS_ORIGINS | * | ⚠️ Optional | CORS configuration |

---

## 🚀 Automatic Deployments

After initial setup, any push to your GitHub main branch will automatically trigger a new deployment on Vercel!

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main
# Vercel will auto-deploy!
```

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Clerk Docs:** https://clerk.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## ✅ Success!

Once deployed, your AI Tools Directory will be live at:
`https://your-app-name.vercel.app`

Share it with the world! 🎉