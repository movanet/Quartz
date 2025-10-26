#!/bin/bash

PUBLIC_DIR="D:\Obsidian\Apps\crpgwebsite\quartz\public"

echo "=== Local Build Verification ==="
echo ""

echo "1. Homepage:"
test -f "$PUBLIC_DIR/index.html" && echo "  ✓ index.html exists" || echo "  ✗ MISSING"

echo ""
echo "2. People Pages (15 expected):"
count=$(find "$PUBLIC_DIR/people" -name "*.html" -type f | wc -l)
echo "  Found: $count HTML files"
test -f "$PUBLIC_DIR/people/mohamad-mova-alafghani.html" && echo "  ✓ mohamad-mova-alafghani.html" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/people/dyah-paramita.html" && echo "  ✓ dyah-paramita.html" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/people/feril-hariat.html" && echo "  ✓ feril-hariat.html" || echo "  ✗ MISSING"

echo ""
echo "3. Program Pages:"
test -f "$PUBLIC_DIR/aiira/index.html" && echo "  ✓ AIIRA" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/ehrdd/index.html" && echo "  ✓ EHRDD" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/wash/index.html" && echo "  ✓ WASH" || echo "  ✗ MISSING"

echo ""
echo "4. Key Pages:"
test -f "$PUBLIC_DIR/about-us/profile.html" && echo "  ✓ About Us" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/publications/index.html" && echo "  ✓ Publications" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/research/index.html" && echo "  ✓ Research" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/events/index.html" && echo "  ✓ Events" || echo "  ✗ MISSING"

echo ""
echo "5. Assets:"
test -f "$PUBLIC_DIR/assets/2023/07/Corporate-Profile-CRPG-2023.pdf" && echo "  ✓ PDF (2023)" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/assets/2018/12/lj.png" && echo "  ✓ Logo" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/assets/2023/10/Workshop-Pembuka-kegiatan-KONEKSI.jpg" && echo "  ✓ Image (2023)" || echo "  ✗ MISSING"

asset_count=$(find "$PUBLIC_DIR/assets" -type f | wc -l)
echo "  Total assets: $asset_count files"

echo ""
echo "6. Static Files:"
test -f "$PUBLIC_DIR/sitemap.xml" && echo "  ✓ sitemap.xml" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/index.css" && echo "  ✓ index.css" || echo "  ✗ MISSING"
test -f "$PUBLIC_DIR/CNAME" && echo "  ✓ CNAME" || echo "  ✗ MISSING"

echo ""
echo "7. Total HTML Files:"
html_count=$(find "$PUBLIC_DIR" -name "*.html" -type f | wc -l)
echo "  $html_count HTML files generated"

echo ""
echo "=== Verification Complete ==="
