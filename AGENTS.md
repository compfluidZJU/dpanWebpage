# MC²Rheol Lab Website - Agent Guide

## Project Overview

This is a static website for **MC²Rheol Lab** (Multiscale Complex Colorful Rheology Laboratory) at Zhejiang University, led by Prof. Dingyi Pan. The website showcases the lab's research focus on complex fluid dynamics using mesoscale simulation methods including coarse-grained molecular dynamics, dissipative particle dynamics, and lattice Boltzmann modeling.

**Website URL**: https://www.dingyiwang-lab.com (production)

## Technology Stack

- **Type**: Static HTML/CSS/JavaScript website (no build process)
- **HTML**: HTML5 with semantic markup
- **CSS**: Vanilla CSS3 with modular component-based architecture
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **Server Requirements**: Any static file server (Apache, Nginx, GitHub Pages, Netlify, etc.)

### External Dependencies (CDN)

All dependencies are loaded from CDNs, no local package management:

| Resource | Purpose | URL |
|----------|---------|-----|
| Google Fonts | Typography (Cousine, Lora, Poppins) | fonts.googleapis.com |
| Font Awesome 6.0.0 | Icons | use.fontawesome.com |
| Tippy.js 6 | Tooltips | unpkg.com/@popperjs/core@2 + tippy.js@6 |
| Mark.js | Text highlighting for search | cdnjs.cloudflare.com |

## Project Structure

```
/
├── index.html                    # Research/Landing page (from JSON data)
├── BingSiteAuth.xml             # Bing search verification
│
├── css/                         # Modular CSS components (36 files)
│   ├── all.css                  # Global box-sizing reset
│   ├── anchor.css               # Anchor link styles
│   ├── background.css           # Background image handling
│   ├── banner.css               # Banner images
│   ├── button.css               # Button styles
│   ├── card.css                 # Card components
│   ├── carousel.css             # Image carousel
│   ├── citation.css             # Publication citations
│   ├── code.css                 # Code blocks
│   ├── feature.css              # Feature sections
│   ├── figure.css               # Figure/image containers
│   ├── footer.css               # Footer styles
│   ├── form.css                 # Form elements
│   ├── gallery.css              # Photo gallery
│   ├── header.css               # Site header & navigation
│   ├── heading.css              # Typography headings
│   ├── highlight.css            # Text highlighting
│   ├── icon.css                 # Icon styles
│   ├── image.css                # Image handling
│   ├── input.css                # Input fields
│   ├── link.css                 # Link styles
│   ├── list.css                 # List styles
│   ├── paragraph.css            # Paragraph typography
│   ├── portrait.css             # Team member portraits
│   ├── post-*.css               # Post/article styles
│   ├── quote.css                # Blockquotes
│   ├── role.css                 # Role badges
│   ├── rule.css                 # Horizontal rules
│   ├── search-*.css             # Search UI components
│   ├── section.css              # Content sections
│   ├── table.css                # Tables
│   ├── tags.css                 # Tag components
│   ├── tooltip.css              # Tooltip styling
│   ├── two-col.css              # Two-column layouts
│   └── util.css                 # Utility classes
│
├── js/                          # JavaScript modules
│   ├── anchors.js               # Anchor link generation
│   ├── carousel.js              # Image carousel (Join page)
│   ├── content-loader.js        # 🆕 内容加载器（从 JSON 渲染内容）
│   ├── fetch-tags.js            # Tag fetching utility
│   ├── search.js                # Client-side search/filter
│   ├── site-search.js           # Site-wide search init
│   ├── tooltips.js              # Tippy.js initialization
│   ├── true-hide.js             # Visibility toggle utility
│   └── util.js                  # Utility functions (debounce, normalize)
│
├── p_team/                      # Team listing page (from JSON data)
│   └── index.html
│
├── p_members/                   # Individual member profiles (dynamic)
│   └── index.html              # 通用成员详情页，通过 ?id=xxx 参数显示不同成员
│
├── _data/                       # 🆕 内容数据文件夹
│   ├── members.json             # 成员和校友数据（包含详细信息）
│   ├── publications.json        # 论文列表数据
│   └── photos.json              # 照片列表数据
│
├── p_publications/              # Publications list (from JSON data)
│   └── index.html
│
├── p_photos/                    # Lab photos gallery (from JSON data)
│   └── index.html              # 动态照片画廊，从 _data/photos.json 加载
│
├── p_join-us/                   # Recruitment/Join page
│   └── index.html              # Position information with carousel
│
├── p_contact/                   # Contact information
│   └── index.html              # Address, email, map
│
├── images/                      # Image assets
│   ├── background.jpg          # Header/footer background
│   ├── hangzhou.jpg            # Contact page banner
│   ├── research_1.png          # Research diagram
│   ├── research_2.png          # Research diagram
│   ├── join_us_photos/         # Carousel images (5 photos)
│   ├── lab_photos/             # Lab activity photos (13 photos)
│   └── members/                # Member portraits (11 photos)
│
├── favicons/                    # Site icons
│   ├── logo.png                # Main logo (also used as favicon)
│   └── site.webmanifest        # PWA manifest
│
└── pdfs/                        # PDF documents
    └── download.pdf            # Sample PDF
```

## 🆕 新的内容维护方式（推荐）

为了简化内容维护，我们引入了 **JSON 数据文件 + JavaScript 动态加载** 的方式。现在：

- **成员信息** 保存在 `_data/members.json`
- **论文列表** 保存在 `_data/publications.json`
- **页面** 使用 `data-content` 属性自动从 JSON 渲染内容

### 添加新成员

1. 打开 `_data/members.json`
2. 在 `current_members` 数组中添加新成员对象：

```json
{
  "id": "newmember",
  "name": "New Member Name",
  "name_cn": "中文名",
  "role": "PhD Student",
  "role_icon": "graduation-cap",
  "position": "PhD Student",
  "email": "email@zju.edu.cn",
  "image": "/images/members/newmember.jpg",
  "bio": "个人简介，支持 <b>粗体</b> 和 <br> 换行"
}
```

3. 添加成员照片到 `images/members/newmember.jpg`

成员详情页会自动生成，访问地址：`/p_members/?id=newmember`

### 添加校友

在 `_data/members.json` 的 `alumni` 数组中添加：

```json
{
  "name": "Alumni Name",
  "name_cn": "中文名",
  "degree": "master",
  "period": "2022.9-2025.6",
  "next_position": "Next position description"
}
```

### 添加新论文

1. 打开 `_data/publications.json`
2. 找到对应的年份（如 `2025`）
3. 在该年份的 `items` 数组中添加：

```json
{
  "title": "Paper Title",
  "doi": "https://doi.org/10.xxxx/xxxxx",
  "authors": "<u>Student Name</u>, <strong>D. Pan*</strong>, Other Authors",
  "journal": "Journal Name",
  "details": "Volume, Page, (Year)."
}
```

**作者标记说明：**
- `<strong>D. Pan</strong>` - PI 名字（粗体）
- `<u>Student Name</u>` - 学生作者（下划线）
- `<sup>#</sup>` - 共同第一作者
- `*` - 通讯作者

4. 如果是新的年份，添加新的年份分组：

```json
{
  "year": 2026,
  "items": [
    // 论文列表...
  ]
}
```

### 添加照片

1. 打开 `_data/photos.json`
2. 在 `photos` 数组中添加：

```json
{
  "src": "/images/lab_photos/filename.jpg",
  "alt": "照片描述",
  "caption": "可选的标题"
}
```

3. 添加照片文件到 `images/lab_photos/filename.jpg`

## 传统维护方式（旧页面）

旧的页面（`index.html`, `p_team/index.html`, `p_publications/index.html`）仍然使用硬编码 HTML。

如果你想继续使用传统方式：

### 添加团队成员（传统方式）

1. 创建 `p_members/firstname.html` 从现有模板复制
2. 添加照片到 `images/members/firstname.jpg`
3. 在 `p_team/index.html` 中添加 portrait 链接
4. 更新 role tooltip 和 description

### 添加论文（传统方式）

1. 打开 `p_publications/index.html`
2. 找到适当的年份部分（`<h3 id="YYYY">`）
3. 复制现有的 citation 代码块
4. 更新：title 链接、authors、journal details
5. 如果新年份，添加新的 `<h3>` section

## Page Structure Convention

每个 HTML 页面遵循一致的结构：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Page Name | MC2Rheol Lab</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- Open Graph / Twitter meta tags -->
  <!-- RSS feed link -->
  <!-- Favicon links -->
  <!-- Google Fonts -->
  <!-- Font Awesome (async load) -->
  
  <!-- Site-wide CSS (36 files) -->
  <link href="/css/xxx.css" rel="stylesheet" />
  
  <!-- Third-party scripts (defer) -->
  <script src="..." defer></script>
  
  <!-- Site-wide scripts (defer) -->
  <script src="/js/xxx.js" defer></script>
</head>
<body>
  <header class="background" style="--background: url('/images/background.jpg')" data-dark="true">
    <!-- Logo with lab name and subtitle -->
    <!-- Navigation: Research, Team, Publications, Photos, Join, Contact -->
  </header>
  
  <main>
    <section class="background">
      <!-- 传统方式：直接写 HTML 内容 -->
      
      <!-- 🆕 新方式：使用 data-content 从 JSON 加载 -->
      <div data-content="members" data-filter="current"></div>
    </section>
  </main>
  
  <footer class="background" style="--background: url('/images/background.jpg')" data-dark="true">
    <!-- Social links (Email, Google Scholar) -->
    <!-- Copyright -->
  </footer>
</body>
</html>
```

## Key Components

### 1. Navigation Header
- 所有页面使用相同结构
- Logo 包含实验室名称 "MC²Rheol Lab" 和副标题 "Multiscale | Complex | Colorful"
- 6 个导航链接：Research, Team, Publications, Photos, Join, Contact
- 深色背景，使用 `data-dark="true"` 属性
- 响应式：移动端 (<700px) 垂直布局

### 2. Member Portraits (`portrait.css`)
```html
<a href="/p_members/name.html" class="portrait" style="--width: 150px">
  <div class="role" data-tooltip="Role"><i class="fas fa-icon"></i></div>
  <span class="portrait_image">
    <img src="/images/members/name.jpg" 
         onerror="this.src = '/images/placeholder.svg'; this.onerror = null;"
         loading="lazy" alt="Name">
  </span>
  <span class="portrait_name">Full Name</span>
  <span class="portrait_description">Position</span>
</a>
```

### 3. Publication Citations (`citation.css`)
```html
<div class="citation" data-style="rich">
  <div class="citation_text">
    <div class="citation_title"><a href="DOI_URL">Title</a></div>
    <div class="citation_authors truncate">Authors</div>
    <div class="citation_details"><strong>Journal</strong>, volume, page, (year).</div>
  </div>
</div>
```

**作者标记约定：**
- `<strong>D. Pan</strong>` - PI 名字（粗体）
- `<u>Student Name</u>` - 学生作者（下划线）
- `*` 后缀 - 通讯作者

### 4. Search Functionality
论文页面包含客户端搜索功能：
- 搜索框过滤 `.citation` 元素
- 支持关键词、引号短语和 `tag: xxx` 语法
- URL 参数 `?search=` 支持分享搜索
- 使用 Mark.js 高亮匹配内容

### 5. Carousel (Join page only)
- 5 图片轮播 (`carousel.js`)
- 图片来源 `/images/join_us_photos/`
- 自动播放，支持上一张/下一张/播放控制

### 6. Photo Gallery (Photos page)
- 自定义 masonry 网格布局
- 使用 `dw-*` 类名
- 悬停缩放效果

## CSS Architecture

### Naming Conventions
- **Files**: lowercase with hyphens (e.g., `search-box.css`)
- **Classes**: lowercase with underscores (e.g., `citation_authors`)
- **Data attributes**: `data-*` for behavior (e.g., `data-tooltip`, `data-dark`)
- **CSS Variables**: `--variable-name` for theming (e.g., `--width`, `--background`)

### Responsive Breakpoints
- `max-width: 700px`: Mobile navigation collapse
- `max-width: 1000px`: Header layout change
- `max-width: 500px`: Citation layout stack
- `max-width: 430px`: Gallery cluster vertical

### Key Utility Classes
- `.center`: Text align center
- `.truncate`: Text truncation with ellipsis
- `[data-hide="true"]`: Hidden elements (search filter)
- `.background`: Section with background image support

## JavaScript Modules

### content-loader.js (🆕 新增)
- `ContentLoader.loadData(type)`: 从 JSON 文件加载数据
- `ContentLoader.renderMemberPortrait(member)`: 渲染成员卡片
- `ContentLoader.renderMemberDetail(member)`: 渲染成员详情页
- `ContentLoader.renderAlumniList(alumni)`: 渲染校友列表
- `ContentLoader.renderPaper(paper)`: 渲染单篇论文
- `ContentLoader.renderPublications(data)`: 渲染完整论文列表
- `ContentLoader.renderPhotos(data)`: 渲染照片画廊
- `ContentLoader.getMemberIdFromUrl()`: 从 URL 参数获取成员 ID
- 自动初始化所有带 `data-content` 属性的元素

### search.js
- `onSearchInput(target)`: 处理搜索输入（带防抖）
- `onSearchClear()`: 清除搜索
- `searchComponents(query)`: 主搜索/过滤逻辑
- 支持 URL 参数持久化

### tooltips.js
- 自动初始化 Tippy.js 在 `[data-tooltip]` 元素上
- 为无障碍访问添加 aria-labels
- 延迟：200ms 显示，0ms 隐藏

### util.js
- `normalizeString(string)`: 规范化字符串用于比较
- `debounce(func, delay, key)`: 防抖函数执行

### carousel.js
- ES6 Class 轮播组件
- 需要至少 5 张图片
- 支持上一张/下一张/播放控制

## Deployment

### No Build Step Required
纯静态网站 - 直接部署文件：

```bash
# Python 3
python -m http.server 8000

# Node.js (npx serve)
npx serve .

# 或部署到任何静态托管：
# - GitHub Pages
# - Netlify
# - Vercel
# - Apache/Nginx
```

### 部署流程

1. 本地测试：
   ```bash
   python -m http.server 8000
   # 访问 http://localhost:8000 预览
   ```

2. 提交到 GitHub，Netlify 自动部署：
   ```bash
   git add .
   git commit -m "更新内容"
   git push
   ```

### File Path Requirements
- 使用以 `/` 开头的绝对路径
- 必须从域名根目录提供，或配置适当的 base URL
- 所有页面从根目录引用 `/css/` 和 `/js/`

## SEO & Meta Tags

每个页面包含：
- `<title>Page | MC2Rheol Lab</title>`
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Twitter Card tags
- Viewport meta tag
- RSS feed link
- Favicon links (PNG format)

## Accessibility
- Tooltips 有 aria-labels
- 图片有 alt 文本和懒加载
- 语义化 HTML5 元素 (`header`, `main`, `section`, `footer`)
- 颜色对比度：深色 header/footer 配白色文字

## Maintenance Notes

### Known Issues / TODOs
1. `p_team/index.html` 有 `noindex` meta 标签（故意对搜索引擎隐藏）
2. `site.webmanifest` 引用了不存在的 `android.png`
3. `images/placeholder.svg` 被引用但可能不存在

### When Modifying
- 保持所有页面的 header/footer 一致
- 添加论文后测试搜索功能
- 确保图片优化（新图片建议使用 WebP）
- 验证所有链接使用根相对路径 (`/path` 而不是 `../path`)

### 🆕 新系统注意事项
- 修改 `_data/*.json` 后，页面会自动反映更改
- JSON 语法错误会导致内容无法加载（建议使用 JSON 校验工具）
- 如果内容不显示，检查浏览器控制台是否有错误

## Contact

**Lab PI**: Prof. Dingyi Pan (dpan@zju.edu.cn)
**Institution**: Zhejiang University, School of Aeronautics and Astronautics
**Location**: Hangzhou, China (near West Lake)
