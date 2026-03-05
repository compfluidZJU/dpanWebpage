# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for MC²Rheol Lab (Multiscale Complex Colorful Rheology Laboratory) at Zhejiang University. Pure HTML/CSS/JS with no build step required. Hosted on Netlify with auto-deployment from GitHub.

## Development Commands

```bash
# Local development server
python -m http.server 8000
# OR
npx serve .

# Then visit http://localhost:8000
```

VS Code users: Live Server extension is configured for port 10087 in `.vscode/settings.json`.

## Architecture

### Content System (JSON-Driven)

The site uses a custom `ContentLoader` system (`js/content-loader.js`) that renders content from JSON files at runtime:

- **`_data/members.json`** - Current members (`current_members` array) and alumni (`alumni` array)
- **`_data/publications.json`** - Papers grouped by year
- **`_data/photos.json`** - Lab photo gallery

HTML elements use `data-content` attributes to trigger rendering:
```html
<div data-content="members" data-filter="current"></div>
<div data-content="alumni"></div>
<div data-content="publications"></div>
<div data-content="photos"></div>
<div data-content="member-detail" data-member-id="dingyi"></div>
```

### Member Detail Pages

Member profiles are dynamically rendered at `/p_members/?id={member_id}` using a single HTML file that reads the `id` URL parameter. Do not create individual HTML files for each member.

### Author Markup Conventions (Publications)

In `publications.json`, use HTML tags for author formatting:
- `<strong>D. Pan</strong>` - PI name (bold)
- `<u>Student Name</u>` - Student authors (underlined)
- `<sup>#</sup>` - Co-first author
- `*` - Corresponding author

## Content Maintenance

### Adding a New Member

1. Add member object to `_data/members.json` `current_members` array:
```json
{
  "id": "unique_id",
  "name": "English Name",
  "name_cn": "中文名",
  "role": "PhD Student",
  "role_icon": "graduation-cap",
  "position": "PhD Student",
  "email": "email@zju.edu.cn",
  "image": "/images/members/unique_id.jpg",
  "bio": "Description with <b>bold</b> and <br> line breaks allowed"
}
```

2. Add photo to `images/members/unique_id.jpg`

3. Member page automatically available at `/p_members/?id=unique_id`

### Adding Publications

1. Find the appropriate year in `_data/publications.json` or create new year group
2. Add paper object to that year's `items` array
3. Use author markup conventions above

### Adding Photos

1. Add photo entry to `_data/photos.json` `photos` array
2. Place image file in `images/lab_photos/`

## Deployment

Netlify auto-deploys on every push to GitHub main branch. No manual build step required.

```bash
git add .
git commit -m "update description"
git push
```

## CDN Dependencies

- Google Fonts (Cousine, Lora, Poppins)
- Font Awesome 6
- Tippy.js (tooltips)
- Mark.js (search highlighting)
- Popper.js
