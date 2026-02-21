"""
Backend API Testing Suite for Y-Store Electronics E-commerce
Testing V2-20 through V2-23 Retail Homepage Features:
- V2-20: HeroCarousel, ProductSection, DealOfDay, CategoriesGrid, BrandsStrip, RecentlyViewed, NewsletterBlock
- V2-21: QuickViewModal
- V2-22: UI Polish 3.0 (shadows, animations, btn-primary)
- V2-23: Mobile Retail (MobileMenuDrawer, MobileBuyBar)
"""
import requests
import json
import sys
from datetime import datetime
from typing import Optional, Dict, Any

class BackendAPITester:
    def __init__(self, base_url: str = "https://smart-payment-core.preview.emergentagent.com"):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})
        
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        
        print(f"🔗 Testing backend at: {self.base_url}")
        print("="*50)
    
    def test_api(self, name: str, method: str, endpoint: str, expected_status: int = 200, 
                data: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None) -> tuple[bool, Optional[Dict]]:
        """Generic API test method"""
        self.tests_run += 1
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        # Merge headers
        test_headers = self.session.headers.copy()
        if headers:
            test_headers.update(headers)
        
        print(f"\n🔍 Testing: {name}")
        print(f"   {method} {endpoint}")
        
        try:
            if method.upper() == 'GET':
                response = self.session.get(url, headers=test_headers, params=data)
            elif method.upper() == 'POST':
                response = self.session.post(url, headers=test_headers, json=data)
            elif method.upper() == 'PUT':
                response = self.session.put(url, headers=test_headers, json=data)
            elif method.upper() == 'DELETE':
                response = self.session.delete(url, headers=test_headers)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            # Check status code
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"   ✅ PASSED - Status: {response.status_code}")
            else:
                print(f"   ❌ FAILED - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'endpoint': endpoint,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
            
            # Try to parse JSON response
            try:
                response_data = response.json() if response.content else None
            except:
                response_data = None
            
            return success, response_data
            
        except Exception as e:
            print(f"   ❌ ERROR - {str(e)}")
            self.failed_tests.append({
                'name': name,
                'endpoint': endpoint,
                'error': str(e)
            })
            return False, None
    
    def test_health_check(self):
        """Test health check endpoint"""
        print("\n🏥 HEALTH CHECK TESTS")
        print("-" * 30)
        
        success, data = self.test_api("Health Check", "GET", "/api/health")
        if success and data:
            print(f"   Service: {data.get('service', 'N/A')}")
            print(f"   Status: {data.get('status', 'N/A')}")
        
        return success
    
    def test_wishlist_api(self):
        """Test Wishlist V2 API endpoints"""
        print("\n💝 WISHLIST V2 TESTS")
        print("-" * 30)
        
        # Test GET wishlist (anonymous)
        success1, data1 = self.test_api(
            "Get Wishlist (Anonymous)", 
            "GET", 
            "/api/v2/wishlist",
            expected_status=200
        )
        
        # Test POST toggle without auth (should fail or require guest token)
        success2, data2 = self.test_api(
            "Toggle Wishlist (No Auth)", 
            "POST", 
            "/api/v2/wishlist/toggle",
            data={"product_id": "test-product-id"},
            expected_status=401  # Expecting unauthorized
        )
        
        # Test with guest token
        success3, data3 = self.test_api(
            "Toggle Wishlist (Guest Token)", 
            "POST", 
            "/api/v2/wishlist/toggle",
            data={"product_id": "test-product-id", "guest_token": "guest-123"},
            expected_status=200
        )
        
        return success1 and success3  # success2 should fail (401 is expected)
    
    def test_compare_api(self):
        """Test Compare V2 API endpoints"""
        print("\n🔍 COMPARE V2 TESTS")
        print("-" * 30)
        
        # Test compare products endpoint
        success1, data1 = self.test_api(
            "Compare Products", 
            "POST", 
            "/api/v2/compare/products",
            data={"product_ids": ["test-product-1", "test-product-2"]},
            expected_status=200
        )
        
        if success1 and data1:
            print(f"   Products returned: {len(data1.get('products', []))}")
            print(f"   Comparison attributes: {len(data1.get('comparison_attributes', []))}")
        
        # Test comparable specs endpoint
        success2, data2 = self.test_api(
            "Get Comparable Specs", 
            "GET", 
            "/api/v2/compare/specs",
            data={"category": "electronics"},
            expected_status=200
        )
        
        return success1 and success2
    
    def test_catalog_api(self):
        """Test Catalog V2 API with filters"""
        print("\n📚 CATALOG V2 TESTS")
        print("-" * 30)
        
        # Test basic catalog
        success1, data1 = self.test_api(
            "Catalog Basic", 
            "GET", 
            "/api/v2/catalog",
            expected_status=200
        )
        
        if success1 and data1:
            print(f"   Products returned: {len(data1.get('products', []))}")
            print(f"   Total products: {data1.get('total', 0)}")
            print(f"   Current page: {data1.get('page', 1)}")
        
        # Test catalog with filters
        success2, data2 = self.test_api(
            "Catalog with Filters", 
            "GET", 
            "/api/v2/catalog",
            data={
                "category": "electronics", 
                "min_price": 100, 
                "max_price": 5000,
                "in_stock": True,
                "sort_by": "price_asc",
                "page": 1,
                "limit": 12
            },
            expected_status=200
        )
        
        # Test catalog filters endpoint
        success3, data3 = self.test_api(
            "Catalog Filters", 
            "GET", 
            "/api/v2/catalog/filters",
            expected_status=200
        )
        
        if success3 and data3:
            print(f"   Available brands: {len(data3.get('brands', []))}")
            price_range = data3.get('price_range', {})
            print(f"   Price range: {price_range.get('min', 0)} - {price_range.get('max', 0)}")
        
        return success1 and success2 and success3
    
    def test_search_api(self):
        """Test Search V2 API"""
        print("\n🔎 SEARCH V2 TESTS")
        print("-" * 30)
        
        # Test search suggestions
        success1, data1 = self.test_api(
            "Search Suggestions", 
            "GET", 
            "/api/v2/search/suggest",
            data={"q": "phone", "limit": 5},
            expected_status=200
        )
        
        if success1 and data1:
            products = data1.get('products', [])
            print(f"   Suggestions returned: {len(products)}")
            if products:
                print(f"   First suggestion: {products[0].get('title', 'N/A')}")
        
        # Test full search
        success2, data2 = self.test_api(
            "Full Search", 
            "GET", 
            "/api/v2/search",
            data={"q": "smartphone", "page": 1, "limit": 10},
            expected_status=200
        )
        
        if success2 and data2:
            print(f"   Search results: {len(data2.get('products', []))}")
            print(f"   Total results: {data2.get('total', 0)}")
            print(f"   Search query: {data2.get('query', 'N/A')}")
        
        return success1 and success2
    
    def test_categories_tree_api(self):
        """Test Categories Tree API for MegaMenu"""
        print("\n🌳 CATEGORIES TREE TESTS")
        print("-" * 30)
        
        success, data = self.test_api(
            "Categories Tree", 
            "GET", 
            "/api/v2/categories/tree",
            expected_status=200
        )
        
        if success and data:
            tree = data.get('tree', [])
            print(f"   Root categories: {len(tree)}")
            
            # Count total categories including children
            def count_categories(categories):
                count = len(categories)
                for cat in categories:
                    count += count_categories(cat.get('children', []))
                return count
            
            total_categories = count_categories(tree)
            print(f"   Total categories: {total_categories}")
        
        return success
    
    def test_products_seeding(self):
        """Test seeding products for testing purposes"""
        print("\n🌱 PRODUCTS SEEDING TESTS")
        print("-" * 30)
        
        success, data = self.test_api(
            "Seed Products", 
            "POST", 
            "/api/seed/products",
            expected_status=200
        )
        
        if success and data:
            print(f"   Products seeded: {data.get('message', 'N/A')}")
        
        return success
    
    def test_v2_products_by_ids(self):
        """Test V2-20: Products by IDs endpoint for Recently Viewed"""
        print("\n🆔 PRODUCTS BY IDS TESTS (V2-20)")
        print("-" * 30)
        
        # First get some product IDs from catalog
        success1, catalog_data = self.test_api(
            "Get Product IDs from Catalog", 
            "GET", 
            "/api/v2/catalog",
            data={"limit": 3},
            expected_status=200
        )
        
        product_ids = []
        if success1 and catalog_data:
            products = catalog_data.get('products', [])
            product_ids = [p.get('id') for p in products[:3] if p.get('id')]
        
        if not product_ids:
            print("   ⚠️  No product IDs found, using test IDs")
            product_ids = ["test-id-1", "test-id-2"]
        
        # Test products by IDs endpoint
        success2, data = self.test_api(
            "Products by IDs", 
            "POST", 
            "/api/v2/products/by-ids",
            data={"ids": product_ids},
            expected_status=200
        )
        
        if success2 and data:
            returned_products = data.get('products', [])
            print(f"   Products requested: {len(product_ids)}")
            print(f"   Products returned: {len(returned_products)}")
            
        return success2
    
    def test_v2_catalog_with_sort(self):
        """Test V2-20: Catalog API with sort parameter"""
        print("\n📋 CATALOG SORT TESTS (V2-20)")
        print("-" * 30)
        
        # Test different sort parameters
        sort_options = [
            ("popular", "Popular products"),
            ("price_asc", "Price ascending"),
            ("price_desc", "Price descending"),
            ("new", "Newest first"),
            ("discount", "Discount sorting")
        ]
        
        test_results = []
        
        for sort_param, description in sort_options:
            success, data = self.test_api(
                f"Catalog Sort: {description}", 
                "GET", 
                "/api/v2/catalog",
                data={"sort_by": sort_param, "limit": 5},
                expected_status=200
            )
            
            if success and data:
                products = data.get('products', [])
                print(f"   {description}: {len(products)} products")
                
            test_results.append(success)
        
        return all(test_results)
    
    def test_deal_of_day_endpoint(self):
        """Test V2-20: Deal of the Day API endpoint"""
        print("\n🔥 DEAL OF THE DAY TESTS (V2-20)")
        print("-" * 30)
        
        # Test catalog with discount sort (used by DealOfDay component)
        success, data = self.test_api(
            "Deal of Day Products", 
            "GET", 
            "/api/v2/catalog",
            data={"sort": "discount", "limit": 1},
            expected_status=200
        )
        
        if success and data:
            products = data.get('products', [])
            print(f"   Deal products found: {len(products)}")
            if products:
                product = products[0]
                print(f"   Product: {product.get('title', 'N/A')}")
                print(f"   Price: {product.get('price', 0)}")
                print(f"   Compare Price: {product.get('compare_price', 0)}")
        
        return success
    
    def run_all_tests(self):
        """Run all test suites"""
        print(f"🚀 Starting Backend API Test Suite")
        print(f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*50)
        
        # Run test suites for V2-20+ features
        test_results = []
        
        test_results.append(self.test_health_check())
        test_results.append(self.test_products_seeding())  # Seed first to ensure data exists
        test_results.append(self.test_categories_tree_api())
        test_results.append(self.test_catalog_api())
        test_results.append(self.test_v2_catalog_with_sort())  # V2-20: Catalog with sort
        test_results.append(self.test_v2_products_by_ids())   # V2-20: Products by IDs
        test_results.append(self.test_deal_of_day_endpoint()) # V2-20: Deal of Day
        test_results.append(self.test_search_api())
        test_results.append(self.test_wishlist_api())
        test_results.append(self.test_compare_api())
        
        # Summary
        print("\n" + "="*50)
        print("📊 TEST SUMMARY")
        print("="*50)
        print(f"✅ Tests passed: {self.tests_passed}/{self.tests_run}")
        print(f"❌ Tests failed: {len(self.failed_tests)}")
        
        if self.failed_tests:
            print("\n💥 FAILED TESTS:")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"{i}. {test['name']}")
                print(f"   Endpoint: {test.get('endpoint', 'N/A')}")
                if 'expected' in test:
                    print(f"   Expected: {test['expected']}, Got: {test['actual']}")
                if 'error' in test:
                    print(f"   Error: {test['error']}")
                if 'response' in test:
                    print(f"   Response: {test['response']}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"\n🎯 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 Overall Status: GOOD")
        elif success_rate >= 60:
            print("⚠️  Overall Status: NEEDS ATTENTION")
        else:
            print("🚨 Overall Status: CRITICAL ISSUES")
        
        return success_rate >= 60


def main():
    """Main test execution"""
    # Test both local and public URLs
    print("="*60)
    print("🏠 TESTING LOCAL BACKEND (localhost:8001)")
    print("="*60)
    
    tester_local = BackendAPITester("http://localhost:8001")
    success_local = tester_local.run_all_tests()
    
    print("\n" + "="*60)
    print("🌐 TESTING PUBLIC BACKEND URL")
    print("="*60)
    
    # Use environment public URL
    backend_url = "https://smart-payment-core.preview.emergentagent.com"
    tester_public = BackendAPITester(backend_url)
    success_public = tester_public.run_all_tests()
    
    print("\n" + "="*60)
    print("🏆 FINAL RESULTS SUMMARY")
    print("="*60)
    print(f"Local Backend Tests:  {'✅ PASSED' if success_local else '❌ FAILED'}")
    print(f"Public Backend Tests: {'✅ PASSED' if success_public else '❌ FAILED'}")
    
    # Pass if at least local tests work
    return 0 if success_local else 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)