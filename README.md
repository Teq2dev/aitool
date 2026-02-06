# AI Tools Directory

A comprehensive AI tools directory listing website inspired by GrabOn, featuring 3000+ AI tools across multiple categories.

## 🚀 Features Implemented

### Core Features (Phase 1 - MVP)
✅ **Home Page**
- Hero section with search bar
- Featured/sponsored tools section
- Trending tools carousel
- Latest submitted tools
- Category grid with beautiful icons
- Stats section (3000+ tools, 26+ categories)
- Newsletter signup section
- Submit tool CTA buttons

✅ **Tool Listing Page**
- Grid view of all tools
- Category & tag filters
- Sort options (trending, newest, top rated, most popular)
- Tool cards with ratings & descriptions
- Highlighted featured/sponsored tools
- Pagination support
- Search functionality

✅ **Tool Detail Page**
- Complete tool overview with logo
- Features list
- Pricing information
- Tags & categories
- User ratings & votes
- Related tools section
- "Visit Website" button
- Back navigation

✅ **Submit Tool Page**
- Comprehensive submission form
- Fields: name, website, logo, description, categories, tags, features, pricing
- Category selection (max 3)
- Tag management
- Feature list builder
- Preview before submit
- Submission status tracking

✅ **User Dashboard**
- View all submitted tools
- Submission status (pending/approved/rejected)
- Filter by status
- Statistics cards
- Edit capabilities
- Quick navigation

✅ **Admin Dashboard**
- View all tools (pending/approved/rejected)
- Approve/reject submissions
- Feature/unfeature tools
- Delete tools
- Statistics overview
- Tool management interface

✅ **Categories Page**
- Browse all categories
- Filter by type (Topics, Tasks, Roles)
- Tool count per category
- Beautiful icon-based design

✅ **Authentication**
- Clerk integration for user management
- Sign in/Sign up modals
- Protected routes for dashboard and admin
- User profiles

✅ **Search & Discovery**
- Global search bar
- Advanced filters (category, pricing, rating)
- Trending section
- Featured tools

## 🎨 Design

- **Color Scheme**: White, Blue (#0066FF), and Black
- **Framework**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Responsive**: Mobile-first design
- **Beautiful UI**: Modern, clean, and professional

## 📊 Database Schema

**Categories Collection:**
- name, slug, type (topic/task/role), description, icon, toolCount

**Tools Collection:**
- name, slug, description, website, logo, categories, tags, pricing
- rating, votes, status (pending/approved/rejected)
- featured, sponsored, trending flags
- submittedBy (user ID), createdAt

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Language**: JavaScript

## 🔑 Environment Variables

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=ai_directory
NEXT_PUBLIC_BASE_URL=your_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

## 📁 Project Structure

```
/app
├── app/
│   ├── api/[[...path]]/route.js  # All API routes
│   ├── page.js                    # Home page
│   ├── layout.js                  # Root layout with Clerk
│   ├── tools/
│   │   ├── page.js               # Tools listing
│   │   └── [slug]/page.js        # Tool detail
│   ├── categories/page.js        # Categories page
│   ├── submit/page.js            # Submit tool form
│   ├── dashboard/page.js         # User dashboard
│   └── admin/page.js             # Admin dashboard
├── components/
│   ├── ToolCard.js               # Tool card component
│   ├── CategoryCard.js           # Category card component
│   └── SearchBar.js              # Search component
├── lib/
│   ├── db.js                     # MongoDB connection
│   └── sample-data.js            # Initial data
└── middleware.js                 # Clerk middleware
```

## 🚀 Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables in `.env`

3. Start the development server:
```bash
yarn dev
```

4. Initialize the database:
```bash
curl http://localhost:3000/api/init
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📝 API Endpoints

- `GET /api/tools` - List all tools (with filters)
- `GET /api/tools/:slug` - Get single tool
- `POST /api/tools` - Submit new tool
- `PUT /api/tools/:id` - Update tool
- `DELETE /api/tools/:id` - Delete tool
- `GET /api/categories` - List all categories
- `GET /api/featured` - Get featured tools
- `GET /api/trending` - Get trending tools
- `GET /api/my-submissions` - User's submissions
- `GET /api/admin/tools` - All tools (admin)
- `PUT /api/admin/tools/:id/approve` - Approve tool
- `PUT /api/admin/tools/:id/reject` - Reject tool
- `PUT /api/admin/tools/:id/featured` - Toggle featured

## 🎯 Sample Data

The application comes pre-loaded with:
- 12 popular AI tools (ChatGPT, Midjourney, DALL-E 3, etc.)
- 26 categories across Topics, Tasks, and Roles
- All tools have ratings, votes, and complete information

## 📱 Features Not Included (Phase 2)

- Blog functionality
- Payment integration for sponsorships
- Email notifications
- Advanced analytics
- Newsletter system
- SEO sitemap generation

## 🌟 Key Highlights

1. **SEO-Friendly**: Clean URLs, proper meta tags
2. **Beautiful Icons**: Emoji-based category icons
3. **Professional Design**: Modern UI with smooth animations
4. **User-Friendly**: Intuitive navigation and search
5. **Admin Control**: Complete tool management system
6. **Real-time Updates**: Hot reload enabled
7. **Secure**: Clerk authentication integration
8. **Responsive**: Works perfectly on all devices

## 📄 License

MIT License
