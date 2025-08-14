
import os
import json
import re
from datetime import datetime

# CONFIG
IMG_DIR = 'assets/img'
OUTPUT_JSON = 'assets/js/portfolio.json'

# Get all image files
image_files = sorted(
    [f for f in os.listdir(IMG_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))],
    key=lambda f: os.path.getmtime(os.path.join(IMG_DIR, f)),
    reverse=True  # latest first
)

# Build JSON data
portfolio_data = []
for img in image_files:
    base = os.path.splitext(img)[0]
    # Smart title cleaner
    title = re.sub(r'^(project[-_])?', '', base, flags=re.IGNORECASE).replace('-', ' ').replace('_', ' ').title()
    # Smart category (default is Design)
    category = 'Illustration' if 'illustration' in img.lower() else 'Web' if 'web' in img.lower() else 'Design'

    portfolio_data.append({
        "title": title,
        "category": category,
        "image": img,
        "description": ""
    })

# Ensure output directory exists
os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)

# Write JSON file
with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(portfolio_data, f, indent=2, ensure_ascii=False)

print(f"✅ Enhanced portfolio.json generated with {len(portfolio_data)} entries.")
