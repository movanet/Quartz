#!/bin/bash

# Comprehensive Site Testing Script
BASE_URL="https://movanet.github.io/Quartz"

echo "=== CRPG Site Comprehensive Test ==="
echo "Testing: $BASE_URL"
echo "Date: $(date)"
echo ""

# Test 1: Homepage
echo "1. Testing Homepage..."
curl -s -o /dev/null -w "Status: %{http_code}\n" "$BASE_URL/"

# Test 2: People pages
echo ""
echo "2. Testing People Pages..."
for person in "mohamad-mova-alafghani" "dyah-paramita" "feril-hariat"; do
    echo "  - $person:"
    curl -s -o /dev/null -w "    Status: %{http_code}\n" "$BASE_URL/people/$person"
done

# Test 3: Program pages
echo ""
echo "3. Testing Program Pages..."
for prog in "aiira" "ehrdd" "wash"; do
    echo "  - $prog:"
    curl -s -o /dev/null -w "    Status: %{http_code}\n" "$BASE_URL/$prog"
done

# Test 4: Key pages
echo ""
echo "4. Testing Key Pages..."
for page in "about-us" "publications" "research" "events" "gallery"; do
    echo "  - $page:"
    curl -s -o /dev/null -w "    Status: %{http_code}\n" "$BASE_URL/$page"
done

# Test 5: Assets (sample)
echo ""
echo "5. Testing Assets..."
curl -s -o /dev/null -w "  - Logo: %{http_code}\n" "$BASE_URL/assets/2018/12/lj.png"
curl -s -o /dev/null -w "  - PDF (2023): %{http_code}\n" "$BASE_URL/assets/2023/07/Corporate-Profile-CRPG-2023.pdf"
curl -s -o /dev/null -w "  - Image (2023): %{http_code}\n" "$BASE_URL/assets/2023/10/Workshop-Pembuka-kegiatan-KONEKSI.jpg"

# Test 6: Search and static files
echo ""
echo "6. Testing Static Features..."
curl -s -o /dev/null -w "  - Search Index: %{http_code}\n" "$BASE_URL/static/contentIndex.json"
curl -s -o /dev/null -w "  - CSS: %{http_code}\n" "$BASE_URL/index.css"
curl -s -o /dev/null -w "  - Sitemap: %{http_code}\n" "$BASE_URL/sitemap.xml"

# Test 7: Check if new content exists
echo ""
echo "7. Checking for New Content..."
curl -s "$BASE_URL/" | grep -q "Center for Regulation Policy and Governance" && echo "  ✓ Homepage title found" || echo "  ✗ Homepage title NOT found"
curl -s "$BASE_URL/people/mohamad-mova-alafghani" | grep -q "Mohamad" && echo "  ✓ People page content found" || echo "  ✗ People page NOT found"

echo ""
echo "=== Test Complete ==="
