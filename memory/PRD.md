# Y-Store Marketplace - PRD

## Original Problem Statement
Реализовать для Y-Store E-commerce:
- BLOCK V2-19: Wishlist + Compare 2.0
- Search 2.0 (Live suggest + instant dropdown)
- Filters 2.0 (Sidebar + Chips + Price slider)
- MegaMenu 2.0 (как у Фокстрота)
- Homepage Retail 3.0

## Architecture Summary

### Tech Stack
- **Backend**: FastAPI (Python 3.11), uvicorn, motor (async MongoDB)
- **Frontend**: React 19 + Tailwind CSS + shadcn/ui + lucide-react
- **Database**: MongoDB (motor async driver)
- **Bot**: Aiogram 3.x (Telegram Admin Bot)
- **Payments**: Fondy
- **Delivery**: Nova Poshta API

### Key Integrations
- **Telegram Bot**: 8239151803:AAFBBuflCH5JPWUxwN9UfifCeHgS6cqxYTg
- **Nova Poshta**: 5cb1e3ebc23e75d737fd57c1e056ecc9
- **Fondy**: Merchant ID 1558123
- **Emergent LLM Key**: sk-emergent-63fCfE8A0DcDb3cFb4

## What's Been Implemented

### 2026-02-21 - V2-19 Blocks Complete ✅

#### 1. Wishlist API (Backend)
**File**: `/app/backend/modules/wishlist/wishlist_routes.py`
- ✅ `GET /api/v2/wishlist` - get wishlist items with products
- ✅ `POST /api/v2/wishlist/toggle` - add/remove from wishlist
- ✅ `POST /api/v2/wishlist/add` - add to wishlist
- ✅ `POST /api/v2/wishlist/remove` - remove from wishlist
- ✅ `DELETE /api/v2/wishlist/clear` - clear all items
- ✅ `POST /api/v2/wishlist/merge` - merge guest to user on login
- Supports both guest (guest_token) and authenticated users

#### 2. Compare API (Backend)
**File**: `/app/backend/modules/compare/compare_routes.py`
- ✅ `POST /api/v2/compare/products` - get full product details for comparison
- ✅ `GET /api/v2/compare/specs` - get comparable specifications
- Client-only localStorage storage (faster, simpler)

#### 3. Compare System (Frontend)
**Files**:
- `/app/frontend/src/utils/compare.js` - localStorage helper functions
- `/app/frontend/src/components/compare/CompareBar.jsx` - sticky bottom bar
- `/app/frontend/src/pages/ComparePage.jsx` - full comparison table
- Max 4 products, localStorage + event dispatch for reactivity

#### 4. Search 2.0 (Frontend)
**Files**:
- `/app/frontend/src/components/SearchInput.jsx` - live search with dropdown
- `/app/frontend/src/pages/SearchResults.jsx` - search results page
- Features: debounce 300ms, products/categories/popular suggestions
- Already existing API: `/api/v2/search/suggest`

#### 5. Filters 2.0 (Frontend)
**File**: `/app/frontend/src/components/catalog/FiltersSidebar.jsx`
- ✅ Price range inputs + slider
- ✅ Brand checkboxes (Apple, Samsung, etc.)
- ✅ In stock toggle
- ✅ Rating filter
- ✅ Clear all filters button

#### 6. MegaMenu 2.0 (Already exists)
**File**: `/app/frontend/src/components/layout/MegaMenu.jsx`
- ✅ Full-width 3-column dropdown
- ✅ Categories from API `/api/v2/categories/tree`
- ✅ Subcategories on hover
- ✅ Promo blocks (Sale, New arrivals)
- ✅ Popular tags

## Current Status

**Backend**: RUNNING ✅ (localhost:8001)
**Frontend**: RUNNING ✅ (localhost:3000)
**MongoDB**: RUNNING ✅
**Preview**: https://smart-payment-core.preview.emergentagent.com (activating)

### Test Results (All Local APIs)
- ✅ Wishlist GET/POST/DELETE - Working
- ✅ Compare products API - Working
- ✅ Search suggest - 2 products found for "iPhone"
- ✅ Categories tree - 10 root categories
- ✅ Catalog with filters - 43 products total

## URLs
- **Preview**: https://smart-payment-core.preview.emergentagent.com
- **API Docs**: /docs (Swagger)
- **Admin**: /admin
- **Cabinet**: /cabinet
- **Catalog**: /catalog
- **Wishlist**: /wishlist or /favorites
- **Compare**: /compare or /comparison
- **Search**: /search?q=...

## Prioritized Backlog

### P0 - Done ✅
- [x] Wishlist API (backend + frontend sync)
- [x] Compare system (localStorage + sticky bar)
- [x] Search 2.0 (live dropdown)
- [x] Filters 2.0 (sidebar)
- [x] MegaMenu 2.0 (already existed)

### P1 - Next Priority
- [ ] Homepage Retail 3.0 - banner carousel, product sections
- [ ] Product page wishlist/compare buttons
- [ ] Recently viewed products
- [ ] Price slider component enhancement

### P2 - Future
- [ ] A/B testing for conversions
- [ ] Real-time stock updates
- [ ] Push notifications

## Files Created/Modified

### Backend
```
/app/backend/modules/wishlist/
├── __init__.py
└── wishlist_routes.py (NEW)

/app/backend/modules/compare/
├── __init__.py  
└── compare_routes.py (NEW)
```

### Frontend
```
/app/frontend/src/utils/compare.js (NEW)
/app/frontend/src/components/compare/CompareBar.jsx (UPDATED)
/app/frontend/src/components/catalog/FiltersSidebar.jsx (NEW)
/app/frontend/src/components/SearchInput.jsx (NEW)
/app/frontend/src/pages/ComparePage.jsx (NEW)
/app/frontend/src/pages/WishlistPage.jsx (UPDATED)
/app/frontend/src/pages/SearchResults.jsx (UPDATED)
```

## Test Report
- Backend success: 100% (localhost)
- Frontend UI: 100% (renders correctly)
- API Integration: Pending preview activation
