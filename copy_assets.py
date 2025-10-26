#!/usr/bin/env python3
"""
Copy WordPress assets to Quartz content directory.
Preserves folder structure and file formats - NO conversion.
"""

import os
import shutil
import json
from pathlib import Path
from collections import defaultdict
import time

# Configuration
SOURCE_DIR = r"D:\Obsidian\crpgweb\crpg.info\wp-content\uploads"
DEST_DIR = r"D:\Obsidian\Apps\crpgwebsite\quartz\content\assets"
INVENTORY_FILE = r"D:\Obsidian\Apps\crpgwebsite\asset_inventory.json"

# File type categories
FILE_CATEGORIES = {
    'images': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'],
    'pdfs': ['.pdf'],
    'documents': ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.rtf'],
    'archives': ['.zip', '.rar', '.7z', '.tar', '.gz'],
    'videos': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'],
    'audio': ['.mp3', '.wav', '.ogg', '.m4a'],
}

def get_file_category(file_path):
    """Determine file category based on extension."""
    ext = file_path.suffix.lower()
    for category, extensions in FILE_CATEGORIES.items():
        if ext in extensions:
            return category
    return 'other'

def get_file_size_mb(file_path):
    """Get file size in MB."""
    try:
        return os.path.getsize(file_path) / (1024 * 1024)
    except:
        return 0

def copy_assets():
    """Copy all assets from source to destination."""
    print("=" * 80)
    print("CRPG.INFO ASSET COPIER")
    print("=" * 80)
    print(f"\nSource: {SOURCE_DIR}")
    print(f"Destination: {DEST_DIR}")
    print("\nStarting asset copy process...\n")

    # Check if source exists
    if not os.path.exists(SOURCE_DIR):
        print(f"ERROR: Source directory not found: {SOURCE_DIR}")
        return

    # Create destination directory
    os.makedirs(DEST_DIR, exist_ok=True)

    # Statistics tracking
    stats = {
        'total_files': 0,
        'total_size_mb': 0,
        'by_type': defaultdict(int),
        'by_year': defaultdict(int),
        'by_folder': defaultdict(int),
        'copied_files': [],
        'errors': []
    }

    # Walk through source directory
    source_path = Path(SOURCE_DIR)
    total_files_found = sum(1 for _ in source_path.rglob('*') if _.is_file())
    print(f"Found {total_files_found} files to process\n")

    files_processed = 0
    for root, dirs, files in os.walk(SOURCE_DIR):
        for file in files:
            files_processed += 1
            source_file = Path(root) / file

            # Calculate relative path from source
            rel_path = source_file.relative_to(source_path)
            dest_file = Path(DEST_DIR) / rel_path

            # Create destination directory
            dest_file.parent.mkdir(parents=True, exist_ok=True)

            try:
                # Copy file
                shutil.copy2(source_file, dest_file)

                # Update statistics
                stats['total_files'] += 1
                file_size = get_file_size_mb(source_file)
                stats['total_size_mb'] += file_size

                # Category
                category = get_file_category(source_file)
                stats['by_type'][category] += 1

                # Year/folder tracking
                parts = rel_path.parts
                if parts:
                    first_folder = parts[0]
                    stats['by_folder'][first_folder] += 1

                    # Extract year if folder name is a year
                    if first_folder.isdigit() and len(first_folder) == 4:
                        stats['by_year'][first_folder] += 1

                # Track copied file
                stats['copied_files'].append({
                    'source': str(rel_path),
                    'size_mb': round(file_size, 3),
                    'category': category
                })

                # Progress indicator
                if files_processed % 100 == 0:
                    print(f"Processed {files_processed}/{total_files_found} files...")

            except Exception as e:
                error_msg = f"Error copying {source_file}: {str(e)}"
                print(f"ERROR: {error_msg}")
                stats['errors'].append(error_msg)

    # Convert defaultdict to regular dict for JSON serialization
    stats['by_type'] = dict(stats['by_type'])
    stats['by_year'] = dict(sorted(stats['by_year'].items()))
    stats['by_folder'] = dict(sorted(stats['by_folder'].items()))
    stats['total_size_mb'] = round(stats['total_size_mb'], 2)

    # Save inventory
    print(f"\nSaving inventory to {INVENTORY_FILE}...")
    with open(INVENTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)

    # Print summary
    print("\n" + "=" * 80)
    print("ASSET COPY COMPLETE")
    print("=" * 80)
    print(f"\nTotal files copied: {stats['total_files']}")
    print(f"Total size: {stats['total_size_mb']} MB")
    print(f"Errors encountered: {len(stats['errors'])}")

    print("\n--- Files by Type ---")
    for file_type, count in sorted(stats['by_type'].items(), key=lambda x: x[1], reverse=True):
        print(f"  {file_type}: {count}")

    print("\n--- Files by Year ---")
    for year, count in stats['by_year'].items():
        print(f"  {year}: {count}")

    print("\n--- Files by Folder ---")
    for folder, count in sorted(stats['by_folder'].items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  {folder}: {count}")

    if stats['errors']:
        print("\n--- Errors ---")
        for error in stats['errors'][:10]:
            print(f"  {error}")
        if len(stats['errors']) > 10:
            print(f"  ... and {len(stats['errors']) - 10} more errors")

    print("\n" + "=" * 80)
    print(f"Assets copied to: {DEST_DIR}")
    print(f"Inventory saved to: {INVENTORY_FILE}")
    print("=" * 80)

if __name__ == "__main__":
    start_time = time.time()
    copy_assets()
    elapsed = time.time() - start_time
    print(f"\nTotal time: {elapsed:.2f} seconds")
