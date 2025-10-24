#!/usr/bin/env python3
"""
Web scraper to convert crpg.info website to markdown for Quartz
"""

import requests
from bs4 import BeautifulSoup
import html2text
import os
from urllib.parse import urljoin, urlparse
import time
from pathlib import Path

class CRPGScraper:
    def __init__(self, base_url, output_dir):
        self.base_url = base_url
        self.output_dir = Path(output_dir)
        self.visited_urls = set()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0'
        })
        self.html2text_converter = html2text.HTML2Text()
        self.html2text_converter.ignore_links = False
        self.html2text_converter.ignore_images = False
        self.html2text_converter.body_width = 0

    def fetch_page(self, url):
        """Fetch a page with error handling"""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return response
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None

    def extract_links(self, soup, current_url):
        """Extract all internal links from the page"""
        links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            absolute_url = urljoin(current_url, href)

            # Only include links from the same domain
            if urlparse(absolute_url).netloc == urlparse(self.base_url).netloc:
                # Remove fragments
                absolute_url = absolute_url.split('#')[0]
                if absolute_url not in self.visited_urls:
                    links.append(absolute_url)

        return links

    def save_page(self, url, content, title):
        """Save page content as markdown"""
        # Create file path based on URL
        parsed = urlparse(url)
        path = parsed.path.strip('/')

        if not path or path == '':
            filename = 'index.md'
        else:
            # Replace slashes with dashes for filename
            filename = path.replace('/', '-') + '.md'

        filepath = self.output_dir / filename

        # Ensure directory exists
        filepath.parent.mkdir(parents=True, exist_ok=True)

        # Add frontmatter for Quartz
        frontmatter = f"""---
title: "{title}"
source: "{url}"
---

"""

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(frontmatter + content)

        print(f"Saved: {filepath}")
        return filepath

    def scrape_page(self, url):
        """Scrape a single page and convert to markdown"""
        if url in self.visited_urls:
            return []

        print(f"Scraping: {url}")
        self.visited_urls.add(url)

        response = self.fetch_page(url)
        if not response:
            return []

        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract title
        title = soup.title.string if soup.title else 'Untitled'

        # Convert to markdown
        markdown_content = self.html2text_converter.handle(str(soup))

        # Save the page
        self.save_page(url, markdown_content, title)

        # Extract links for further crawling
        links = self.extract_links(soup, url)

        return links

    def scrape_site(self, max_pages=100):
        """Scrape the entire site starting from base_url"""
        self.output_dir.mkdir(parents=True, exist_ok=True)

        to_visit = [self.base_url]
        pages_scraped = 0

        while to_visit and pages_scraped < max_pages:
            url = to_visit.pop(0)

            new_links = self.scrape_page(url)
            to_visit.extend(new_links)

            pages_scraped += 1

            # Be polite - add delay between requests
            time.sleep(1)

        print(f"\n✓ Scraping complete!")
        print(f"  Pages scraped: {pages_scraped}")
        print(f"  Output directory: {self.output_dir}")

if __name__ == "__main__":
    base_url = "https://crpg.info"
    output_dir = "/home/user/Quartz/quartz/content/crpg"

    scraper = CRPGScraper(base_url, output_dir)
    scraper.scrape_site(max_pages=100)
