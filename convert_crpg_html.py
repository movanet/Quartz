#!/usr/bin/env python3
"""
CRPG HTML to Markdown Converter
Converts crpg.info HTML files to Markdown for Quartz
"""

import os
import re
import json
from pathlib import Path
from bs4 import BeautifulSoup
import html2text
from urllib.parse import urlparse, unquote
from datetime import datetime

# Configuration
SOURCE_DIR = r"D:\Obsidian\crpgweb\crpg.info"
DEST_DIR = r"D:\Obsidian\Apps\crpgwebsite\quartz\content"
REPORT_FILE = r"D:\Obsidian\Apps\crpgwebsite\crpg_conversion_report.json"

# Folders to skip
SKIP_FOLDERS = ['feed', 'wp-admin', 'wp-json', 'wp-includes', 'wp-content', 'cdn-cgi', 'comments']

# Configure html2text
h2t = html2text.HTML2Text()
h2t.ignore_links = False
h2t.ignore_images = False
h2t.ignore_emphasis = False
h2t.body_width = 0  # Don't wrap lines
h2t.skip_internal_links = False
h2t.images_to_alt = False
h2t.unicode_snob = True

class ConversionStats:
    def __init__(self):
        self.processed = []
        self.successful = []
        self.failed = []
        self.skipped = []

    def add_processed(self, path):
        self.processed.append(path)

    def add_successful(self, path, dest):
        self.successful.append({"source": path, "destination": dest})

    def add_failed(self, path, error):
        self.failed.append({"source": path, "error": str(error)})

    def add_skipped(self, path, reason):
        self.skipped.append({"source": path, "reason": reason})

    def to_dict(self):
        return {
            "timestamp": datetime.now().isoformat(),
            "total_processed": len(self.processed),
            "total_successful": len(self.successful),
            "total_failed": len(self.failed),
            "total_skipped": len(self.skipped),
            "processed_files": self.processed,
            "successful_conversions": self.successful,
            "failed_conversions": self.failed,
            "skipped_files": self.skipped
        }

def should_skip_file(file_path):
    """Check if file should be skipped based on path"""
    path_str = str(file_path)

    # Skip if in excluded folders
    for skip_folder in SKIP_FOLDERS:
        if f"/{skip_folder}/" in path_str.replace("\\", "/") or path_str.replace("\\", "/").endswith(f"/{skip_folder}"):
            return True, f"In excluded folder: {skip_folder}"

    # Skip feed index files
    if "/feed/index.html" in path_str.replace("\\", "/"):
        return True, "Feed file"

    # Skip WordPress specific files
    if "xmlrpc" in path_str or "wp-" in os.path.basename(path_str):
        return True, "WordPress system file"

    return False, None

def extract_metadata(soup, file_path):
    """Extract metadata from HTML"""
    metadata = {}

    # Extract title
    title_tag = soup.find('title')
    if title_tag:
        title = title_tag.get_text().strip()
        # Remove site name suffix
        title = re.sub(r'\s*-\s*Center for Regulation Policy and Governance\s*$', '', title)
        metadata['title'] = title
    else:
        # Fallback to h1
        h1 = soup.find('h1')
        if h1:
            metadata['title'] = h1.get_text().strip()
        else:
            metadata['title'] = os.path.basename(file_path).replace('.html', '').replace('-', ' ').title()

    # Extract meta description
    meta_desc = soup.find('meta', attrs={'property': 'og:description'}) or \
                soup.find('meta', attrs={'name': 'description'}) or \
                soup.find('meta', attrs={'name': 'twitter:description'})
    if meta_desc and meta_desc.get('content'):
        desc = meta_desc.get('content').strip()
        # Clean up description
        desc = re.sub(r'&hellip;', '...', desc)
        desc = re.sub(r'\[&hellip;\]', '', desc)
        metadata['description'] = desc[:200]  # Limit length

    # Extract article section/category as tags
    tags = ['crpg']
    section = soup.find('meta', attrs={'property': 'article:section'})
    if section and section.get('content'):
        tags.append(section.get('content').lower())

    # Determine tags based on path
    path_str = str(file_path).lower()
    if 'publication' in path_str:
        tags.append('publications')
    elif 'research' in path_str:
        tags.append('research')
    elif 'event' in path_str:
        tags.append('events')
    elif 'program' in path_str or 'aiira' in path_str or 'ehrdd' in path_str or 'wash' in path_str:
        tags.append('programs')
    elif 'gallery' in path_str:
        tags.append('gallery')
    elif 'about' in path_str or 'profile' in path_str:
        tags.append('about')

    # Check if it's a person page (author)
    if soup.find('meta', attrs={'property': 'article:section', 'content': 'Anggota'}):
        tags.append('people')

    metadata['tags'] = list(set(tags))  # Remove duplicates

    # Extract dates
    published = soup.find('meta', attrs={'property': 'article:published_time'})
    if published and published.get('content'):
        metadata['date'] = published.get('content')

    modified = soup.find('meta', attrs={'property': 'article:modified_time'})
    if modified and modified.get('content'):
        metadata['lastmod'] = modified.get('content')

    return metadata

def clean_content(soup):
    """Extract and clean main content from HTML"""
    # Parse HTML with lxml
    soup_copy = BeautifulSoup(str(soup), 'lxml')

    # Remove scripts and styles first
    for element in soup_copy.find_all(['script', 'style']):
        element.decompose()

    # First, extract the main content before removing other elements
    main_content = None

    # Strategy 1: Look for main tag
    main = soup_copy.find('main', id='main') or soup_copy.find('main')
    if main:
        main_content = main

    # Strategy 2: Look for Elementor content directly
    if not main_content:
        elementor = soup_copy.find('div', {'data-elementor-id': True}) or \
                    soup_copy.find('div', {'data-elementor-type': True}) or \
                    soup_copy.find('div', class_=re.compile(r'^elementor elementor-\d+'))
        if elementor:
            main_content = elementor

    # Strategy 3: Look for article tag
    if not main_content:
        main_content = soup_copy.find('article')

    # Strategy 4: Look for content div
    if not main_content:
        main_content = soup_copy.find('div', class_=re.compile(r'entry-content|post-content|page-content', re.I))

    if not main_content:
        return ""

    # Now clean up the extracted content
    # Create a new soup from the main content
    content_soup = BeautifulSoup(str(main_content), 'lxml')

    # Remove unwanted elements from the content
    for elem_id in ['footer-widgets', 'footer-bottom', 'sidr-close', 'mobile-menu-search', 'scroll-top']:
        elem = content_soup.find(id=elem_id)
        if elem:
            elem.decompose()

    # Remove footer and nav tags that might be inside content
    for elem in content_soup.find_all(['footer']):
        # Only remove if it has footer-related classes
        if elem.get('id') == 'footer' or elem.get('class') and any('footer' in str(c).lower() for c in elem.get('class', [])):
            elem.decompose()

    # Convert to string and check if we have enough content
    content_str = str(content_soup.find('body') or content_soup).strip()

    # Remove the body tags that lxml adds
    content_str = re.sub(r'<body>', '', content_str)
    content_str = re.sub(r'</body>', '', content_str)

    if len(content_str) < 100:
        return ""

    return content_str

def fix_image_paths(markdown_content):
    """Update image paths to use /assets/images/"""
    # Replace wp-content/uploads paths with /assets/images/
    markdown_content = re.sub(
        r'\(\.\.\/wp-content\/uploads\/([^)]+)\)',
        r'(/assets/images/\1)',
        markdown_content
    )
    markdown_content = re.sub(
        r'\(wp-content\/uploads\/([^)]+)\)',
        r'(/assets/images/\1)',
        markdown_content
    )

    # Fix absolute URLs to relative
    markdown_content = re.sub(
        r'\(https?://crpg\.info/wp-content/uploads/([^)]+)\)',
        r'(/assets/images/\1)',
        markdown_content
    )

    return markdown_content

def fix_internal_links(markdown_content, current_path):
    """Convert internal links to relative paths"""
    # Fix relative links (../)
    markdown_content = re.sub(
        r'\(\.\.\/([^)]+?)/index\.html\)',
        r'(/\1)',
        markdown_content
    )
    markdown_content = re.sub(
        r'\(\.\.\/([^)]+?)\.html\)',
        r'(/\1)',
        markdown_content
    )

    # Fix same-level links
    markdown_content = re.sub(
        r'\(([^):/]+?)/index\.html\)',
        r'(/\1)',
        markdown_content
    )

    # Fix absolute crpg.info URLs
    markdown_content = re.sub(
        r'\(https?://crpg\.info/([^)]+?)(?:\.html|/index\.html)?\)',
        r'(/\1)',
        markdown_content
    )

    # Remove trailing slashes from links
    markdown_content = re.sub(r'\(/([^)]+?)/+\)', r'(/\1)', markdown_content)

    return markdown_content

def clean_markdown(markdown_content):
    """Clean up markdown content"""
    # Remove excessive blank lines
    markdown_content = re.sub(r'\n{3,}', '\n\n', markdown_content)

    # Remove HTML comments
    markdown_content = re.sub(r'<!--.*?-->', '', markdown_content, flags=re.DOTALL)

    # Clean up email protection stuff
    markdown_content = re.sub(r'\[email\s+protected\]', '', markdown_content)

    # Remove empty links
    markdown_content = re.sub(r'\[\]\([^)]*\)', '', markdown_content)

    return markdown_content.strip()

def determine_output_path(source_path, source_dir):
    """Determine output path based on source path"""
    rel_path = os.path.relpath(source_path, source_dir)
    path_parts = Path(rel_path).parts

    # Handle root index.html
    if rel_path == "index.html":
        return Path(DEST_DIR) / "index.md"

    # Handle about-us
    if "about-us" in path_parts:
        remaining = Path(*[p for p in path_parts if p != "about-us"])
        return Path(DEST_DIR) / "about-us" / remaining.with_suffix('.md')

    # Handle people/authors (directories that look like person names)
    # These are typically directories with hyphenated names at root level
    if len(path_parts) == 2 and path_parts[1] == "index.html":
        dir_name = path_parts[0]
        # Check if it looks like a person name (has hyphens or underscores)
        if '-' in dir_name or '_' in dir_name:
            # Could be a person, program, or other category
            # We'll put them in people/ for now and can refine later
            if dir_name not in ['about-us', 'publications', 'research', 'events', 'gallery', 'docs', 'program']:
                # Check if it's a known program
                if dir_name in ['aiira', 'ehrdd', 'wash', 'pcb', 'merkuri', 'koneksi', 'swa-mam-catalytic-program']:
                    return Path(DEST_DIR) / "programs" / f"{dir_name}.md"
                else:
                    # Likely a person
                    return Path(DEST_DIR) / "people" / f"{dir_name}.md"

    # Handle publications
    if "publications" in path_parts:
        remaining = Path(*[p for p in path_parts if p != "publications"])
        return Path(DEST_DIR) / "publications" / remaining.with_suffix('.md')

    # Handle research
    if "research" in path_parts:
        remaining = Path(*[p for p in path_parts if p != "research"])
        return Path(DEST_DIR) / "research" / remaining.with_suffix('.md')

    # Handle events
    if "events" in path_parts:
        remaining = Path(*[p for p in path_parts if p != "events"])
        return Path(DEST_DIR) / "events" / remaining.with_suffix('.md')

    # Handle gallery
    if "gallery" in path_parts:
        remaining = Path(*[p for p in path_parts if p != "gallery"])
        return Path(DEST_DIR) / "gallery" / remaining.with_suffix('.md')

    # Handle docs
    if "docs" in path_parts:
        remaining = Path(*[p for p in path_parts if p != "docs"])
        return Path(DEST_DIR) / "docs" / remaining.with_suffix('.md')

    # Handle programs
    if "program" in path_parts:
        remaining = Path(*[p for p in path_parts if p != "program"])
        return Path(DEST_DIR) / "programs" / remaining.with_suffix('.md')

    # Handle profile
    if "profile" in path_parts:
        return Path(DEST_DIR) / "about-us" / "profile.md"

    # Default: maintain structure
    return Path(DEST_DIR) / Path(rel_path).with_suffix('.md')

def convert_html_to_markdown(html_file, stats):
    """Convert a single HTML file to Markdown"""
    try:
        stats.add_processed(str(html_file))

        # Check if should skip
        should_skip, reason = should_skip_file(html_file)
        if should_skip:
            stats.add_skipped(str(html_file), reason)
            return False

        # Read HTML file
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            html_content = f.read()

        # Parse HTML
        soup = BeautifulSoup(html_content, 'lxml')

        # Extract metadata
        metadata = extract_metadata(soup, html_file)

        # Extract and clean content
        content_html = clean_content(soup)

        if not content_html:
            stats.add_skipped(str(html_file), "No content found")
            return False

        # Convert to markdown
        markdown_content = h2t.handle(content_html)

        # Fix paths
        markdown_content = fix_image_paths(markdown_content)
        markdown_content = fix_internal_links(markdown_content, html_file)
        markdown_content = clean_markdown(markdown_content)

        # Create frontmatter
        frontmatter = "---\n"
        frontmatter += f"title: \"{metadata.get('title', 'Untitled')}\"\n"
        if 'description' in metadata:
            frontmatter += f"description: \"{metadata['description']}\"\n"
        if 'date' in metadata:
            frontmatter += f"date: {metadata['date']}\n"
        if 'lastmod' in metadata:
            frontmatter += f"lastmod: {metadata['lastmod']}\n"
        if metadata.get('tags'):
            frontmatter += f"tags: {json.dumps(metadata['tags'])}\n"
        frontmatter += "---\n\n"

        # Combine frontmatter and content
        final_content = frontmatter + markdown_content

        # Determine output path
        output_path = determine_output_path(html_file, SOURCE_DIR)

        # Create output directory
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Write markdown file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

        stats.add_successful(str(html_file), str(output_path))
        return True

    except Exception as e:
        stats.add_failed(str(html_file), str(e))
        print(f"Error converting {html_file}: {e}")
        return False

def main():
    """Main conversion process"""
    print("Starting CRPG HTML to Markdown conversion...")
    print(f"Source: {SOURCE_DIR}")
    print(f"Destination: {DEST_DIR}")
    print()

    stats = ConversionStats()

    # Find all HTML files
    source_path = Path(SOURCE_DIR)
    html_files = list(source_path.rglob("*.html"))

    print(f"Found {len(html_files)} HTML files")
    print()

    # Convert each file
    for i, html_file in enumerate(html_files, 1):
        if i % 10 == 0:
            print(f"Progress: {i}/{len(html_files)} files processed...")
        convert_html_to_markdown(html_file, stats)

    # Save report
    report = stats.to_dict()
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    # Print summary
    print()
    print("=" * 60)
    print("CONVERSION COMPLETE")
    print("=" * 60)
    print(f"Total files found: {len(html_files)}")
    print(f"Successfully converted: {report['total_successful']}")
    print(f"Failed: {report['total_failed']}")
    print(f"Skipped: {report['total_skipped']}")
    print()
    print(f"Report saved to: {REPORT_FILE}")
    print("=" * 60)

    # Show sample successful conversions
    if report['successful_conversions']:
        print()
        print("Sample conversions (first 5):")
        for conv in report['successful_conversions'][:5]:
            print(f"  {conv['source']}")
            print(f"    -> {conv['destination']}")
            print()

if __name__ == "__main__":
    main()
