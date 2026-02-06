# 🚀 Quick Vercel Deployment Steps

## TL;DR - Fast Track Deployment

### 1️⃣ Set Up MongoDB Atlas (5 minutes)
```
→ Go to https://mongodb.com/cloud/atlas/register
→ Create FREE M0 cluster
→ Create database user (save password!)
→ Whitelist all IPs (0.0.0.0/0)
→ Get connection string
→ Save it: mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/
```

### 2️⃣ Push to GitHub (2 minutes)
```bash
cd /app
git init
git add .
git commit -m "AI Directory - Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3️⃣ Deploy on Vercel (3 minutes)
```
→ Go to https://vercel.com/new
→ Import your GitHub repository
→ Add Environment Variables:
   MONGO_URL=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/
   DB_NAME=ai_directory
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG9nZXRoZXItcm9vc3Rlci00OS5jbGVyay5hY2NvdW50cy5kZXYk
   CLERK_SECRET_KEY=sk_test_n7jVHit60hu9slvvfDMmexEjqwqVHAH1pfCj630njJ
   NEXT_PUBLIC_BASE_URL=https://YOUR-APP.vercel.app
   CORS_ORIGINS=*
→ Click Deploy
```

### 4️⃣ Initialize Database (1 minute)
```
→ Visit: https://YOUR-APP.vercel.app/api/init
→ Should see: {"success":true,"message":"Database initialized"}
```

### 5️⃣ Update Clerk (1 minute)
```
→ Go to https://dashboard.clerk.com
→ Add domain: YOUR-APP.vercel.app
→ Save
```

## ✅ Done!
Your app is live at: `https://YOUR-APP.vercel.app`

---

## 📋 Environment Variables Checklist

Copy these to Vercel:

```env
MONGO_URL=mongodb+srv://[YOUR_CONNECTION_STRING]
DB_NAME=ai_directory
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG9nZXRoZXItcm9vc3Rlci00OS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_n7jVHit60hu9slvvfDMmexEjqwqVHAH1pfCj630njJ
NEXT_PUBLIC_BASE_URL=https://[YOUR-VERCEL-URL].vercel.app
CORS_ORIGINS=*
```

---

## ⚠️ Important Notes

1. **MongoDB:** Must use MongoDB Atlas (cloud), localhost won't work on Vercel
2. **Connection String:** Replace `<password>` with actual password, no brackets
3. **Clerk Domain:** Add Vercel URL to Clerk dashboard after deployment
4. **Initialize DB:** Visit `/api/init` after first deployment
5. **Auto-Deploy:** Every git push to main branch auto-deploys to Vercel

---

## 🆘 Quick Troubleshooting

**"Cannot connect to database"**
→ Check MongoDB Atlas connection string & whitelist 0.0.0.0/0

**"Clerk auth not working"**
→ Add Vercel domain to Clerk dashboard

**"404 on API routes"**
→ Ensure NEXT_PUBLIC_BASE_URL matches Vercel URL

---

For detailed instructions, see: **VERCEL_DEPLOYMENT_GUIDE.md**
