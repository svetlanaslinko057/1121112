# Y-Store Marketplace - PRD

## Original Problem Statement
Поднять фронтенд, бэкенд, MongoDB из GitHub репозитория https://github.com/svetlanaslinko057/123424
Изучить текущий код, архитектуру, админку, фронт, бэк и подготовить к доработке.

**Таски на доработку:**
- BLOCK V2-19: Wishlist + Compare 2.0
- Search 2.0 (Live suggest + instant dropdown)
- Filters 2.0 (Sidebar + Chips + Price slider)
- MegaMenu 2.0 (как у Фокстрота)
- Homepage Retail 3.0

## Architecture Summary

### Tech Stack
- **Backend**: FastAPI (Python 3.11), uvicorn, motor (async MongoDB driver)
- **Frontend**: React 19 + Tailwind CSS + shadcn/ui + lucide-react
- **Database**: MongoDB (motor async driver)
- **Bot**: Aiogram 3.x (Telegram Admin Bot)
- **Payments**: Fondy (Merchant ID 1558123)
- **Delivery**: Nova Poshta API

### Key Integrations
- **Telegram Bot Token**: 8239151803:AAFBBuflCH5JPWUxwN9UfifCeHgS6cqxYTg
- **Nova Poshta API**: 5cb1e3ebc23e75d737fd57c1e056ecc9
- **Fondy**: Merchant ID 1558123, Password i4F...bD4
- **Emergent LLM Key**: sk-emergent-63fCfE8A0DcDb3cFb4

## What's Been Implemented

### 2026-02-21 - Initial Setup ✅
- [x] Cloned repository from GitHub https://github.com/svetlanaslinko057/123424
- [x] Created .env files with provided credentials
- [x] Installed all dependencies (pip + yarn)
- [x] Started backend (FastAPI on port 8001)
- [x] Started frontend (React on port 3000)
- [x] Started MongoDB
- [x] Seeded 43 products and 58 categories

### V2-19: Wishlist + Compare API (2026-02-21) ✅
- [x] Created `/app/backend/modules/wishlist/wishlist_routes.py`
  - GET /api/v2/wishlist - get wishlist items
  - POST /api/v2/wishlist/toggle - toggle product in wishlist
  - POST /api/v2/wishlist/add - add to wishlist
  - POST /api/v2/wishlist/remove - remove from wishlist
  - DELETE /api/v2/wishlist/clear - clear wishlist
  - POST /api/v2/wishlist/merge - merge guest wishlist to user
- [x] Created `/app/backend/modules/compare/compare_routes.py`
  - POST /api/v2/compare/products - get comparison products
  - GET /api/v2/compare/specs - get comparable specs
- [x] Created `/app/frontend/src/components/compare/CompareBar.jsx` - sticky compare bar
- [x] Created `/app/frontend/src/pages/SearchResults.jsx` - search results page
- [x] Added /search and /wishlist routes

### Existing Features (from cloned repo)
- Header V3 with search
- Cart with drawer
- Product Page V3
- Checkout V3
- Cabinet V2 with OTP login
- Catalog V2 with filters
- Favorites and Comparison pages
- Admin Panel with analytics
- CRM Dashboard
- AI Product Descriptions
- Nova Poshta integration
- Fondy payment integration

## Current State

**Backend**: RUNNING ✅ (http://localhost:8001)
**Frontend**: RUNNING ✅ (http://localhost:3000)
**MongoDB**: RUNNING ✅
**Preview URL**: https://smart-payment-core.preview.emergentagent.com (loading)

**Database Stats**:
- Products: 43
- Categories: 58

## URLs
- **Preview**: https://smart-payment-core.preview.emergentagent.com
- **API Health**: /api/health
- **Admin**: /admin (requires admin login)
- **Cabinet**: /cabinet (OTP login for guests)
- **Catalog**: /catalog
- **Wishlist**: /wishlist or /favorites
- **Compare**: /comparison or /compare
- **Search**: /search?q=...

## Credentials
- **Admin**: admin@ystore.com / admin123

## Prioritized Backlog

### P0 - In Progress
- [ ] Wait for preview URL to activate
- [ ] Test all V2-19 features end-to-end

### P1 - Next Priority
- [ ] MegaMenu 2.0 - full-width dropdown with categories
- [ ] Filters 2.0 - price slider component
- [ ] Homepage Retail 3.0 - banner carousel, sections

### P2 - Future
- [ ] SMS notifications (currently mocked)
- [ ] Real-time tracking updates
- [ ] A/B testing improvements

## File Structure Summary

### Backend Modules (/app/backend/modules/)
```
├── wishlist/           # NEW: V2-19 Wishlist API
├── compare/            # NEW: V2-19 Compare API
├── auth/              # Authentication
├── cabinet/           # Guest cabinet
├── products/          # Products CRUD
├── orders/            # Orders V2
├── payments/          # Fondy integration
├── delivery/          # Nova Poshta
├── bot/               # Telegram admin bot
├── admin/             # Admin analytics
└── ...
```

### Frontend Pages (/app/frontend/src/pages/)
```
├── SearchResults.jsx   # NEW: Search results page
├── ProductPageV3.jsx   # Product page
├── CheckoutV3.jsx      # Checkout
├── CatalogV2.js        # Catalog with filters
├── CabinetV2.jsx       # Guest cabinet
├── AdminPanel.js       # Admin dashboard
└── ...
```

## Test Results (iteration_1)
- Backend success: 100% (local)
- Frontend success: 100%
- All V2-19 APIs functional
