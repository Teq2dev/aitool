#!/usr/bin/env python3
"""
Backend API Testing Script for AI Directory
Tests critical backend endpoints including file upload and tool submission
"""

import requests
import json
import os
import tempfile
from io import BytesIO

# Base URL from environment
BASE_URL = "https://nextai-dir.preview.emergentagent.com"

def test_file_upload_api():
    """Test 1: File Upload API (/api/upload)"""
    print("\n" + "="*60)
    print("TEST 1: File Upload API (/api/upload)")
    print("="*60)
    
    try:
        # Create a test image file
        test_content = b"Test image content for upload testing"
        
        # Prepare multipart form data
        files = {
            'file': ('test-image.jpg', BytesIO(test_content), 'image/jpeg')
        }
        
        url = f"{BASE_URL}/api/upload"
        print(f"Testing POST {url}")
        print(f"File size: {len(test_content)} bytes")
        
        response = requests.post(url, files=files, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ SUCCESS: {json.dumps(data, indent=2)}")
            
            # Verify response structure
            if 'success' in data and data['success'] and 'url' in data and 'filename' in data:
                print("✅ Response structure is correct")
                
                # Check if file exists (try to access the uploaded file)
                file_url = f"{BASE_URL}{data['url']}"
                print(f"Checking if file exists at: {file_url}")
                
                file_check = requests.get(file_url, timeout=10)
                if file_check.status_code == 200:
                    print("✅ File is accessible via public URL")
                    return True
                else:
                    print(f"❌ File not accessible: {file_check.status_code}")
                    return False
            else:
                print("❌ Response structure is incorrect")
                return False
        else:
            print(f"❌ FAILED: {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error details: {json.dumps(error_data, indent=2)}")
            except:
                print(f"Error text: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ EXCEPTION: {str(e)}")
        return False

def test_tool_submission_api():
    """Test 2: Tool Submission API (/api/tools POST)"""
    print("\n" + "="*60)
    print("TEST 2: Tool Submission API (/api/tools POST)")
    print("="*60)
    
    try:
        url = f"{BASE_URL}/api/tools"
        print(f"Testing POST {url}")
        
        # Test data for tool submission
        tool_data = {
            "name": "TestAI Tool",
            "website": "https://testai-tool.example.com",
            "shortDescription": "A comprehensive AI tool for testing purposes",
            "description": "This is a detailed description of the TestAI tool that provides various AI capabilities for testing and development purposes.",
            "logo": "/uploads/test-logo.jpg",
            "categories": ["ai-tools", "productivity"],
            "pricing": "Free"
        }
        
        print(f"Request payload: {json.dumps(tool_data, indent=2)}")
        
        # Test without authentication first
        print("\n--- Testing WITHOUT Authentication ---")
        response = requests.post(url, json=tool_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 401:
            print("✅ EXPECTED: 401 Unauthorized (authentication required)")
            try:
                error_data = response.json()
                print(f"Error response: {json.dumps(error_data, indent=2)}")
            except:
                print(f"Error text: {response.text}")
            
            print("\n--- Testing WITH Mock Authentication Headers ---")
            # Try with mock auth headers to see what happens
            headers = {
                'Authorization': 'Bearer mock-token',
                'Content-Type': 'application/json'
            }
            
            response_with_auth = requests.post(url, json=tool_data, headers=headers, timeout=30)
            print(f"Status Code with mock auth: {response_with_auth.status_code}")
            
            if response_with_auth.status_code == 401:
                print("✅ EXPECTED: Still 401 (proper auth validation)")
                return True
            else:
                print(f"Response with mock auth: {response_with_auth.text}")
                return True
                
        elif response.status_code == 200:
            print("⚠️  UNEXPECTED: Tool submission succeeded without authentication")
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            return False
        else:
            print(f"❌ UNEXPECTED STATUS: {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error details: {json.dumps(error_data, indent=2)}")
            except:
                print(f"Error text: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ EXCEPTION: {str(e)}")
        return False

def test_health_check():
    """Test basic health check endpoint"""
    print("\n" + "="*60)
    print("HEALTH CHECK: Basic API connectivity")
    print("="*60)
    
    try:
        url = f"{BASE_URL}/api"
        print(f"Testing GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API is healthy: {json.dumps(data, indent=2)}")
            return True
        else:
            print(f"❌ API health check failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ EXCEPTION: {str(e)}")
        return False

def check_uploads_directory():
    """Check if uploads directory exists"""
    print("\n" + "="*60)
    print("DIRECTORY CHECK: /app/public/uploads/")
    print("="*60)
    
    uploads_dir = "/app/public/uploads"
    
    if os.path.exists(uploads_dir):
        print(f"✅ Directory exists: {uploads_dir}")
        
        # List files in directory
        try:
            files = os.listdir(uploads_dir)
            print(f"Files in directory: {len(files)}")
            if files:
                print("Recent files:")
                for f in files[-5:]:  # Show last 5 files
                    file_path = os.path.join(uploads_dir, f)
                    size = os.path.getsize(file_path)
                    print(f"  - {f} ({size} bytes)")
        except Exception as e:
            print(f"Error listing files: {e}")
        
        return True
    else:
        print(f"❌ Directory does not exist: {uploads_dir}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 BACKEND API TESTING STARTED")
    print(f"Base URL: {BASE_URL}")
    
    results = {}
    
    # Run tests
    results['health_check'] = test_health_check()
    results['uploads_directory'] = check_uploads_directory()
    results['file_upload'] = test_file_upload_api()
    results['tool_submission'] = test_tool_submission_api()
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 ALL TESTS PASSED!")
    else:
        print("⚠️  Some tests failed - check details above")
    
    return passed_tests == total_tests

if __name__ == "__main__":
    main()