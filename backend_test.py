#!/usr/bin/env python3
"""
Backend API Testing Script for AI Tools Directory
Tests the Phase 1 implementation endpoints
"""

import requests
import json
import sys
from typing import Dict, Any

# Base URL from environment
BASE_URL = "https://aifinder-24.preview.emergentagent.com"

def test_health_check():
    """Test GET /api health check endpoint"""
    print("\n=== Testing Health Check ===")
    try:
        response = requests.get(f"{BASE_URL}/api", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            # Verify response structure
            if data.get('status') == 'ok':
                print("✅ Health check passed - API is responding correctly")
                return True
            else:
                print("❌ Health check failed - unexpected response structure")
                return False
        else:
            print(f"❌ Health check failed - HTTP {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check failed - Network error: {e}")
        return False

def test_blogs_endpoint():
    """Test GET /api/blogs endpoint with pagination"""
    print("\n=== Testing GET /api/blogs Endpoint ===")
    
    # Test 1: Basic blogs fetch with limit=3
    print("\n--- Test 1: GET /api/blogs?limit=3 ---")
    try:
        response = requests.get(f"{BASE_URL}/api/blogs?limit=3", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            # Verify response structure
            required_keys = ['blogs', 'total', 'page', 'totalPages']
            missing_keys = [key for key in required_keys if key not in data]
            
            if missing_keys:
                print(f"❌ Missing required keys: {missing_keys}")
                return False
            
            blogs = data.get('blogs', [])
            print(f"Number of blogs returned: {len(blogs)}")
            print(f"Total blogs: {data.get('total')}")
            print(f"Current page: {data.get('page')}")
            print(f"Total pages: {data.get('totalPages')}")
            
            # Verify blog structure
            if blogs:
                blog = blogs[0]
                required_blog_fields = ['_id', 'title', 'slug', 'excerpt', 'coverImage', 'category', 'readTime', 'views']
                missing_blog_fields = [field for field in required_blog_fields if field not in blog]
                
                if missing_blog_fields:
                    print(f"❌ Blog missing required fields: {missing_blog_fields}")
                    print(f"Available blog fields: {list(blog.keys())}")
                    return False
                
                print(f"✅ Blog structure verified - sample blog: {blog.get('title')}")
                print(f"   - ID: {blog.get('_id')}")
                print(f"   - Slug: {blog.get('slug')}")
                print(f"   - Category: {blog.get('category')}")
                print(f"   - Read Time: {blog.get('readTime')} min")
                print(f"   - Views: {blog.get('views')}")
            else:
                print("⚠️ No blogs returned - this might be expected if database is empty")
            
            print("✅ GET /api/blogs endpoint working correctly")
            return True
            
        else:
            print(f"❌ Blogs endpoint failed - HTTP {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Blogs endpoint failed - Network error: {e}")
        return False

def test_admin_users_endpoint():
    """Test GET /api/admin/users endpoint (should return 401 when not authenticated)"""
    print("\n=== Testing GET /api/admin/users Endpoint ===")
    
    print("--- Test: GET /api/admin/users (unauthenticated) ---")
    try:
        response = requests.get(f"{BASE_URL}/api/admin/users", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            if data.get('error') == 'Unauthorized':
                print("✅ Admin users endpoint correctly returns 401 for unauthenticated requests")
                return True
            else:
                print("❌ Expected 'Unauthorized' error message")
                return False
        else:
            print(f"❌ Expected 401 status code, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Admin users endpoint failed - Network error: {e}")
        return False

def test_admin_user_management_endpoints():
    """Test PUT /api/admin/users/:id/make-admin and remove-admin endpoints"""
    print("\n=== Testing Admin User Management Endpoints ===")
    
    # These endpoints require authentication, so we expect 401 responses
    test_user_id = "test_user_123"
    
    # Test make-admin endpoint
    print(f"\n--- Test: PUT /api/admin/users/{test_user_id}/make-admin (unauthenticated) ---")
    try:
        response = requests.put(f"{BASE_URL}/api/admin/users/{test_user_id}/make-admin", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            print("✅ Make-admin endpoint correctly returns 401 for unauthenticated requests")
            make_admin_result = True
        else:
            print(f"❌ Expected 401 status code, got {response.status_code}")
            print(f"Response: {response.text}")
            make_admin_result = False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Make-admin endpoint failed - Network error: {e}")
        make_admin_result = False
    
    # Test remove-admin endpoint
    print(f"\n--- Test: PUT /api/admin/users/{test_user_id}/remove-admin (unauthenticated) ---")
    try:
        response = requests.put(f"{BASE_URL}/api/admin/users/{test_user_id}/remove-admin", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            print("✅ Remove-admin endpoint correctly returns 401 for unauthenticated requests")
            remove_admin_result = True
        else:
            print(f"❌ Expected 401 status code, got {response.status_code}")
            print(f"Response: {response.text}")
            remove_admin_result = False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Remove-admin endpoint failed - Network error: {e}")
        remove_admin_result = False
    
    return make_admin_result and remove_admin_result

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests for AI Tools Directory")
    print(f"Base URL: {BASE_URL}")
    
    results = {}
    
    # Run all tests
    results['health_check'] = test_health_check()
    results['blogs_endpoint'] = test_blogs_endpoint()
    results['admin_users_endpoint'] = test_admin_users_endpoint()
    results['admin_user_management'] = test_admin_user_management_endpoints()
    
    # Summary
    print("\n" + "="*60)
    print("📊 TEST RESULTS SUMMARY")
    print("="*60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print("⚠️ Some backend tests failed - see details above")
        return 1

if __name__ == "__main__":
    sys.exit(main())