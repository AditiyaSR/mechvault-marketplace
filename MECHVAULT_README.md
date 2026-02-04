# MechVault - Premium Engineering Assets Marketplace

A high-performance, premium digital marketplace for Engineering Assets (CAD files, 3D models, Blueprints) built with Next.js 16 and Google Sheets as the backend.

## 🚀 Features

- **Google Sheets Backend** - 100% CMS powered by Google Sheets with 60s ISR
- **Premium UI/UX** - Clean, technical, and trustworthy design
- **Advanced Filtering** - Real-time search, category filters, and price range slider
- **Responsive Design** - Mobile-first approach with sticky buy bar on mobile
- **Dark Mode Support** - System default or toggle switch
- **Skeleton Loading** - Smooth loading states during data revalidation
- **Toast Notifications** - User feedback for all interactions
- **SEO Optimized** - Dynamic metadata for product pages
- **Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** (App Router) - React framework with ISR support
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Premium accessible components
- **Framer Motion** - Smooth animations and transitions
- **next-themes** - Dark mode support
- **Lucide React** - Beautiful icon library

### Data & State
- **google-spreadsheet** - Google Sheets API integration
- **React Hooks** - Built-in state management

## 📦 Installation

### Prerequisites
- Node.js 18+ (or Bun)
- Google Cloud account (for Google Sheets API)

### Setup Steps

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Configure Google Sheets**
   - Follow the detailed setup guide in `GOOGLE_SHEETS_SETUP.md`
   - Get your Google Sheets API credentials
   - Create your Google Sheet with the required structure

3. **Set Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your credentials:
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-sheet-id-here
   ```

4. **Run Development Server**
   ```bash
   bun run dev
   ```

5. **Open in Browser**
   Visit `http://localhost:3000` to see your MechVault marketplace.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   └── route.ts          # Product API with ISR (60s)
│   │   └── categories/
│   │       └── route.ts          # Categories API with ISR (60s)
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                 # Landing page
│   ├── market/
│   │   └── page.tsx            # Full catalog with filters
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx        # Product detail page
│   └── not-found.tsx           # Custom 404 page
├── components/
│   ├── mechvault/
│   │   ├── Hero.tsx           # Dynamic typing effect hero
│   │   ├── Navbar.tsx         # Glassmorphism navbar
│   │   ├── ProductCard.tsx    # Premium product cards
│   │   └── FilterSidebar.tsx  # Advanced filters
│   ├── theme-provider.tsx      # Theme provider
│   └── ui/                   # shadcn/ui components
├── hooks/
│   └── use-toast.ts           # Toast hook
├── lib/
│   ├── sheets.ts              # Google Sheets integration
│   └── utils.ts              # Utility functions
└── types/
    └── product.ts             # Product types
```

## 🎨 Visual Design

### Color Scheme
- **Primary Color:** Deep Industrial Blue (`#0F172A`)
- **Accent Color:** Engineer Orange (`#F97316`)
- **Typography:** Inter (Google Fonts)

### Design Principles
- Clean and technical aesthetic
- High contrast for readability
- Smooth micro-interactions
- Mobile-first responsive design
- Accessible by default (WCAG AA)

## 📄 Google Sheet Structure

The first sheet should have these columns:

| Column | Description | Required |
|--------|-------------|----------|
| `id` | Unique product identifier | Yes |
| `title` | Product name | Yes |
| `category` | Category (e.g., CAD Library) | Yes |
| `price` | Display price | Yes |
| `original_price` | Original price for discounts | No |
| `description` | Markdown-supported description | Yes |
| `images` | Comma-separated image URLs | No |
| `tags` | Comma-separated tags | No |
| `link_shopee` | Shopee purchase link | No |
| `link_whatsapp` | WhatsApp order link | No |
| `badge` | Badge text (Best Seller, New) | No |
| `is_active` | TRUE/FALSE to hide products | No |

## 🔧 Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
```

## 🌐 API Endpoints

All API routes use ISR with 60-second revalidation:

### Products
- `GET /api/products` - Get all products
- `GET /api/products?id=PROD001` - Get specific product
- `GET /api/products?featured=true&limit=8` - Get featured products

### Categories
- `GET /api/categories` - Get all categories

## 📱 Pages

### Home Page (`/`)
- Hero section with dynamic typing effect
- Featured products carousel
- Feature highlights
- Call-to-action sections

### Marketplace (`/market`)
- Full product catalog
- Real-time search
- Category filters
- Price range slider
- Grid/List view toggle

### Product Detail (`/product/[id]`)
- Image gallery with thumbnails
- Product information
- Tabs (Description, Specifications, How to Use)
- Related products
- Sticky buy bar (mobile)

### 404 Page
- Custom error page
- Navigation back to home or marketplace

## 🎯 Key Features Explained

### Google Sheets Integration
- **ISR with 60s revalidation** - Balances freshness and performance
- **Automatic parsing** - Handles comma-separated images and tags
- **Error handling** - Graceful degradation if API fails
- **Rate limit friendly** - Built-in caching to avoid API limits

### Product Cards
- **Hover effects** - Lift and shadow on hover (Framer Motion)
- **Lazy loading** - Optimized image loading
- **Badges** - Visual indicators for discounts and featured items
- **Dual actions** - View Details and Buy Now buttons

### Advanced Filters
- **Real-time search** - Instant filtering as you type
- **Category checkboxes** - Multiple category selection
- **Price range slider** - Easy price filtering
- **Mobile-responsive** - Slide-out panel on mobile

### Performance Optimizations
- **Image optimization** - Next.js Image component with lazy loading
- **Code splitting** - Automatic code splitting by routes
- **ISR** - 60-second revalidation for data freshness
- **Skeleton loading** - Smooth UX during data fetches

## 🔒 Security Notes

- **Never commit** `.env.local` to version control
- **Use HTTPS** for all image URLs
- **Validate inputs** on the client side
- **Secure service account keys** in environment variables

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
Add these in your hosting platform:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_ID`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For setup issues, refer to `GOOGLE_SHEETS_SETUP.md`
For questions, contact the development team.

## 🎨 Design System

### Typography Scale
- Headings: Inter font, bold weights
- Body: Inter font, regular weights
- Captions: Inter font, light weights

### Spacing System
- Base unit: 4px (0.25rem)
- Consistent 4px increments

### Border Radius
- Small: 0.25rem (4px)
- Medium: 0.5rem (8px)
- Large: 0.75rem (12px)

### Shadows
- Subtle: 0 1px 2px rgba(0,0,0,0.05)
- Medium: 0 4px 6px rgba(0,0,0,0.1)
- Large: 0 10px 15px rgba(0,0,0,0.1)

## 📊 Performance Targets

- **Lighthouse Score:** 90+ across all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
