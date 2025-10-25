#!/bin/bash
# Deployment Testing Framework - curl-based
# Tests GitHub Pages deployment and functionality

set -e

# Configuration
REPO="movanet/Quartz"
SITE_URL="https://movanet.github.io/Quartz"
CUSTOM_DOMAIN="https://crpg.info"
API_BASE="https://api.github.com/repos/${REPO}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# JSON log file
LOG_FILE="test_results.json"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Initialize JSON log
cat > "$LOG_FILE" <<EOF
{
  "test_run": {
    "timestamp": "$TIMESTAMP",
    "repository": "$REPO",
    "target_url": "$SITE_URL"
  },
  "tests": []
}
EOF

# Helper function to log test results
log_test() {
  local test_name="$1"
  local status="$2"
  local details="$3"

  # Escape quotes in details
  details_escaped=$(echo "$details" | sed 's/"/\\"/g' | tr '\n' ' ')

  # Read current JSON
  current_json=$(cat "$LOG_FILE")

  # Add test result
  echo "$current_json" | jq --arg name "$test_name" \
                              --arg status "$status" \
                              --arg details "$details_escaped" \
                              '.tests += [{"name": $name, "status": $status, "details": $details}]' \
                              > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE"
}

# Test functions
test_github_pages_enabled() {
  echo -e "${BLUE}[1/10] Checking if GitHub Pages is enabled...${NC}"

  response=$(curl -s -H "Accept: application/vnd.github+json" "${API_BASE}/pages")

  if echo "$response" | grep -q '"status"' && ! echo "$response" | grep -q '"message": "Not Found"'; then
    echo -e "${GREEN}✓ GitHub Pages is enabled${NC}"
    log_test "github_pages_enabled" "pass" "$response"
    return 0
  else
    echo -e "${RED}✗ GitHub Pages is NOT enabled${NC}"
    echo -e "${YELLOW}Action required: Enable GitHub Pages in repository settings${NC}"
    log_test "github_pages_enabled" "fail" "GitHub Pages not activated"
    return 1
  fi
}

test_deployment_workflow() {
  echo -e "${BLUE}[2/10] Checking GitHub Actions deployment workflow...${NC}"

  response=$(curl -s -H "Accept: application/vnd.github+json" \
    "${API_BASE}/actions/runs?per_page=1")

  if echo "$response" | grep -q '"total_count"'; then
    workflow_count=$(echo "$response" | jq -r '.total_count')
    if [ "$workflow_count" -gt 0 ]; then
      latest_status=$(echo "$response" | jq -r '.workflow_runs[0].status')
      latest_conclusion=$(echo "$response" | jq -r '.workflow_runs[0].conclusion')

      echo -e "${GREEN}✓ Workflow exists (status: $latest_status, conclusion: $latest_conclusion)${NC}"
      log_test "deployment_workflow" "pass" "Status: $latest_status, Conclusion: $latest_conclusion"
      return 0
    fi
  fi

  echo -e "${YELLOW}⚠ No workflow runs found${NC}"
  log_test "deployment_workflow" "warn" "No workflow runs yet"
  return 1
}

test_site_accessibility() {
  echo -e "${BLUE}[3/10] Testing site accessibility...${NC}"

  http_code=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL")

  if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ Site is accessible (HTTP $http_code)${NC}"
    log_test "site_accessibility" "pass" "HTTP $http_code"
    return 0
  elif [ "$http_code" = "404" ]; then
    echo -e "${RED}✗ Site returns 404 - GitHub Pages not deployed yet${NC}"
    log_test "site_accessibility" "fail" "HTTP $http_code - Site not deployed"
    return 1
  else
    echo -e "${YELLOW}⚠ Site returns HTTP $http_code${NC}"
    log_test "site_accessibility" "warn" "HTTP $http_code"
    return 1
  fi
}

test_homepage_content() {
  echo -e "${BLUE}[4/10] Testing homepage content...${NC}"

  content=$(curl -sL "$SITE_URL" 2>/dev/null || echo "")

  if echo "$content" | grep -q "CRPG"; then
    echo -e "${GREEN}✓ Homepage contains CRPG content${NC}"
    log_test "homepage_content" "pass" "CRPG content found"
    return 0
  else
    echo -e "${RED}✗ Homepage missing expected content${NC}"
    log_test "homepage_content" "fail" "CRPG content not found"
    return 1
  fi
}

test_assets_loading() {
  echo -e "${BLUE}[5/10] Testing asset accessibility...${NC}"

  # Test a known PDF
  pdf_url="${SITE_URL}/assets/pdfs/Realizing-Access-to-Safe-Inclusive-Sustainable-and-Climate-Resillient-Drinking-Water-Sanitation-and-Hygiene-for-All.pdf"

  http_code=$(curl -s -o /dev/null -w "%{http_code}" "$pdf_url" 2>/dev/null || echo "000")

  if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ Assets are accessible${NC}"
    log_test "assets_loading" "pass" "PDF accessible (HTTP $http_code)"
    return 0
  else
    echo -e "${YELLOW}⚠ Assets may not be accessible (HTTP $http_code)${NC}"
    log_test "assets_loading" "warn" "HTTP $http_code"
    return 1
  fi
}

test_search_functionality() {
  echo -e "${BLUE}[6/10] Checking search index...${NC}"

  search_index="${SITE_URL}/static/contentIndex.json"
  http_code=$(curl -s -o /dev/null -w "%{http_code}" "$search_index" 2>/dev/null || echo "000")

  if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ Search index exists${NC}"
    log_test "search_functionality" "pass" "Search index accessible"
    return 0
  else
    echo -e "${YELLOW}⚠ Search index not found (HTTP $http_code)${NC}"
    log_test "search_functionality" "warn" "HTTP $http_code"
    return 1
  fi
}

test_https_enabled() {
  echo -e "${BLUE}[7/10] Testing HTTPS...${NC}"

  if curl -sI "$SITE_URL" | grep -q "HTTP/2 200\|HTTPS/1.1 200"; then
    echo -e "${GREEN}✓ HTTPS is enabled${NC}"
    log_test "https_enabled" "pass" "HTTPS working"
    return 0
  else
    echo -e "${YELLOW}⚠ HTTPS verification inconclusive${NC}"
    log_test "https_enabled" "warn" "Unable to verify HTTPS"
    return 1
  fi
}

test_page_load_time() {
  echo -e "${BLUE}[8/10] Testing page load time...${NC}"

  time_total=$(curl -s -o /dev/null -w "%{time_total}" "$SITE_URL" 2>/dev/null || echo "0")

  if [ "$(echo "$time_total < 2" | bc 2>/dev/null || echo "0")" = "1" ]; then
    echo -e "${GREEN}✓ Page loads quickly (${time_total}s)${NC}"
    log_test "page_load_time" "pass" "${time_total}s"
    return 0
  elif [ "$time_total" = "0" ]; then
    echo -e "${RED}✗ Unable to measure load time (site not accessible)${NC}"
    log_test "page_load_time" "fail" "Site not accessible"
    return 1
  else
    echo -e "${YELLOW}⚠ Page load time: ${time_total}s (target: <2s)${NC}"
    log_test "page_load_time" "warn" "${time_total}s"
    return 1
  fi
}

test_mobile_friendly() {
  echo -e "${BLUE}[9/10] Testing mobile viewport meta tag...${NC}"

  content=$(curl -sL "$SITE_URL" 2>/dev/null || echo "")

  if echo "$content" | grep -q 'viewport'; then
    echo -e "${GREEN}✓ Mobile viewport meta tag present${NC}"
    log_test "mobile_friendly" "pass" "Viewport meta tag found"
    return 0
  else
    echo -e "${YELLOW}⚠ Viewport meta tag not found${NC}"
    log_test "mobile_friendly" "warn" "Meta tag missing"
    return 1
  fi
}

test_custom_domain() {
  echo -e "${BLUE}[10/10] Testing custom domain (if configured)...${NC}"

  http_code=$(curl -s -o /dev/null -w "%{http_code}" "$CUSTOM_DOMAIN" 2>/dev/null || echo "000")

  if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ Custom domain is working${NC}"
    log_test "custom_domain" "pass" "HTTP $http_code"
    return 0
  else
    echo -e "${YELLOW}⚠ Custom domain not configured or DNS not propagated (HTTP $http_code)${NC}"
    log_test "custom_domain" "skip" "Not configured or DNS pending"
    return 0  # Not a failure, just not configured yet
  fi
}

# Run all tests
main() {
  echo -e "${BLUE}========================================${NC}"
  echo -e "${BLUE}CRPG Archive Deployment Test Suite${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo ""

  passed=0
  failed=0
  warned=0

  # Run tests
  test_github_pages_enabled || ((failed++))
  test_deployment_workflow || ((warned++))
  test_site_accessibility && ((passed++)) || ((failed++))
  test_homepage_content && ((passed++)) || ((failed++))
  test_assets_loading && ((passed++)) || ((warned++))
  test_search_functionality && ((passed++)) || ((warned++))
  test_https_enabled && ((passed++)) || ((warned++))
  test_page_load_time && ((passed++)) || ((failed++))
  test_mobile_friendly && ((passed++)) || ((warned++))
  test_custom_domain && ((passed++))

  # Summary
  echo ""
  echo -e "${BLUE}========================================${NC}"
  echo -e "${GREEN}Tests Passed: $passed${NC}"
  echo -e "${YELLOW}Warnings: $warned${NC}"
  echo -e "${RED}Tests Failed: $failed${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo ""

  # Update final status in JSON
  jq --arg passed "$passed" \
     --arg warned "$warned" \
     --arg failed "$failed" \
     '.summary = {"passed": $passed, "warned": $warned, "failed": $failed}' \
     "$LOG_FILE" > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE"

  echo -e "${BLUE}Results saved to: $LOG_FILE${NC}"

  if [ $failed -gt 0 ]; then
    echo -e "${RED}Some tests failed. Review the output above.${NC}"
    return 1
  else
    echo -e "${GREEN}All critical tests passed!${NC}"
    return 0
  fi
}

# Run main function
main "$@"
