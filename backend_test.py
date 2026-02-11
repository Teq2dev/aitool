#!/usr/bin/env python3
"""
Backend API Testing for AI Tools Directory
Tests admin endpoints and public endpoints
"""

import requests
import json
import sys
from typing import Dict, Any

# Base URL from environment
BASE_URL = "https://toolhub-45.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def test_endpoint(method: str, endpoint: str, headers: Dict[str, str] = None, data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Test an API endpoint and return structured results"""
    url = f"{API_BASE}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=30)
        elif method.upper() == "POST":
            response = requests.post(url, headers=headers, json=data, timeout=30)
        elif method.upper() == "PUT":
            response = requests.put(url, headers=headers, json=data, timeout=30)
        elif method.upper() == "DELETE":
            response = requests.delete(url, headers=headers, timeout=30)
        else:
            return {"error": f"Unsupported method: {method}"}
        
        result = {
            "url": url,
            "method": method.upper(),
            "status_code": response.status_code,
            "success": response.status_code < 400,
            "headers": dict(response.headers),
            "response_time": response.elapsed.total_seconds()
        }
        
        # Try to parse JSON response
        try:
            result["response"] = response.json()
        except:
            result["response"] = response.text
            
        return result
        
    except requests.exceptions.RequestException as e:
        return {
            "url": url,
            "method": method.upper(),
            "error": str(e),
            "success": False
        }

def print_test_result(test_name: str, result: Dict[str, Any]):
    """Print formatted test results"""
    print(f"\n{'='*60}")
    print(f"TEST: {test_name}")
    print(f"{'='*60}")
    
    if "error" in result:
        print(f"❌ ERROR: {result['error']}")
        return
    
    status_icon = "✅" if result["success"] else "❌"
    print(f"{status_icon} {result['method']} {result['url']}")
    print(f"Status Code: {result['status_code']}")
    print(f"Response Time: {result['response_time']:.3f}s")
    
    if isinstance(result["response"], dict):
        print(f"Response: {json.dumps(result['response'], indent=2)}")
    else:
        print(f"Response: {result['response']}")

def main():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests for AI Tools Directory")
    print(f"Base URL: {BASE_URL}")
    print(f"API Base: {API_BASE}")
    
    # Test Results Storage
    test_results = {}
    
    # 1. Health Check - Public endpoint
    print("\n" + "="*80)
    print("TESTING PUBLIC ENDPOINTS (Should work without auth)")
    print("="*80)
    
    result = test_endpoint("GET", "")
    print_test_result("Health Check - GET /api", result)
    test_results["health_check"] = result
    
    # 2. Public Tools List
    result = test_endpoint("GET", "/tools")
    print_test_result("Public Tools List - GET /api/tools", result)
    test_results["public_tools"] = result
    
    # 3. Public Categories List
    result = test_endpoint("GET", "/categories")
    print_test_result("Public Categories List - GET /api/categories", result)
    test_results["public_categories"] = result
    
    # 4. Featured Tools
    result = test_endpoint("GET", "/featured")
    print_test_result("Featured Tools - GET /api/featured", result)
    test_results["featured_tools"] = result
    
    # Test Admin Endpoints WITHOUT Authentication (Should return 401)
    print("\n" + "="*80)
    print("TESTING ADMIN ENDPOINTS WITHOUT AUTH (Should return 401)")
    print("="*80)
    
    # 5. Admin Users API - Should return 401
    result = test_endpoint("GET", "/admin/users")
    print_test_result("Admin Users API (No Auth) - GET /api/admin/users", result)
    test_results["admin_users_no_auth"] = result
    
    # 6. Admin Tools API - Should return 401
    result = test_endpoint("GET", "/admin/tools?status=all")
    print_test_result("Admin Tools API (No Auth) - GET /api/admin/tools?status=all", result)
    test_results["admin_tools_no_auth"] = result
    
    # 7. Admin Check API - Should return isAdmin: false
    result = test_endpoint("GET", "/admin/check")
    print_test_result("Admin Check API (No Auth) - GET /api/admin/check", result)
    test_results["admin_check_no_auth"] = result
    
    # Test User-specific endpoints without auth (Should return 401)
    print("\n" + "="*80)
    print("TESTING USER ENDPOINTS WITHOUT AUTH (Should return 401)")
    print("="*80)
    
    # 8. My Submissions - Should return 401
    result = test_endpoint("GET", "/my-submissions")
    print_test_result("My Submissions (No Auth) - GET /api/my-submissions", result)
    test_results["my_submissions_no_auth"] = result
    
    # 9. My Blog Submissions - Should return 401
    result = test_endpoint("GET", "/my-blog-submissions")
    print_test_result("My Blog Submissions (No Auth) - GET /api/my-blog-submissions", result)
    test_results["my_blog_submissions_no_auth"] = result
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    public_endpoints_working = 0
    admin_endpoints_properly_protected = 0
    total_public = 0
    total_admin = 0
    
    # Check public endpoints
    public_tests = ["health_check", "public_tools", "public_categories", "featured_tools"]
    for test_name in public_tests:
        total_public += 1
        if test_results[test_name]["success"]:
            public_endpoints_working += 1
            print(f"✅ {test_name}: Working")
        else:
            print(f"❌ {test_name}: Failed - Status {test_results[test_name].get('status_code', 'Error')}")
    
    # Check admin endpoints (should return 401)
    admin_tests = ["admin_users_no_auth", "admin_tools_no_auth", "my_submissions_no_auth", "my_blog_submissions_no_auth"]
    for test_name in admin_tests:
        total_admin += 1
        result = test_results[test_name]
        if result.get("status_code") == 401:
            admin_endpoints_properly_protected += 1
            print(f"✅ {test_name}: Properly protected (401)")
        else:
            print(f"❌ {test_name}: Not properly protected - Status {result.get('status_code', 'Error')}")
    
    # Special case for admin/check (should return isAdmin: false, not 401)
    admin_check_result = test_results["admin_check_no_auth"]
    if (admin_check_result["success"] and 
        isinstance(admin_check_result["response"], dict) and 
        admin_check_result["response"].get("isAdmin") == False):
        print(f"✅ admin_check_no_auth: Working correctly (returns isAdmin: false)")
    else:
        print(f"❌ admin_check_no_auth: Not working correctly")
    
    print(f"\nPublic Endpoints: {public_endpoints_working}/{total_public} working")
    print(f"Admin Endpoints: {admin_endpoints_properly_protected}/{total_admin} properly protected")
    
    # Overall assessment
    if public_endpoints_working == total_public and admin_endpoints_properly_protected == total_admin:
        print("\n🎉 ALL TESTS PASSED - Backend API is working correctly!")
        return True
    else:
        print("\n⚠️  SOME TESTS FAILED - Check individual results above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)