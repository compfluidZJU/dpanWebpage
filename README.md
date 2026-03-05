# MC²Rheol Lab Website

浙江大学潘定一教授实验室网站

## 快速开始

### 本地预览

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

然后访问 http://localhost:8000

## 内容维护指南

### 🆕 新方式：编辑 JSON 文件（推荐）

为了简化内容更新，网站现在支持从 JSON 数据文件自动渲染内容。

#### 文件位置

- **成员和校友数据**: `_data/members.json`
- **论文数据**: `_data/publications.json`
- **照片数据**: `_data/photos.json`

#### 添加新成员

打开 `_data/members.json`，在 `current_members` 数组中添加：

```json
{
  "id": "member_id",
  "name": "English Name",
  "name_cn": "中文名",
  "role": "PhD Student",
  "role_icon": "graduation-cap",
  "position": "PhD Student",
  "email": "email@zju.edu.cn",
  "image": "/images/members/member_id.jpg",
  "bio": "个人简介，支持 <b>粗体</b> 和 <br> 换行"
}
```

然后添加照片到 `images/members/member_id.jpg`。

成员详情页会自动生成，访问地址：`/p_members/?id=member_id`

#### 添加校友

在 `_data/members.json` 的 `alumni` 数组中添加：

```json
{
  "name": "Name",
  "name_cn": "中文名",
  "degree": "master",
  "period": "2022.9-2025.6",
  "next_position": "Next position"
}
```

#### 添加论文

打开 `_data/publications.json`，找到对应年份的 `items` 数组，添加：

```json
{
  "title": "Paper Title",
  "doi": "https://doi.org/10.xxxx/xxxxx",
  "authors": "Author Name, <strong>D. Pan*</strong>",
  "journal": "Journal Name",
  "details": "Volume, Page, (Year)."
}
```

**作者标记：**
- `<strong>D. Pan</strong>` - PI 名字（粗体显示）
- `<u>Student Name</u>` - 学生作者（下划线）
- `<sup>#</sup>` - 共同第一作者标记
- `*` - 通讯作者

如果是新的年份，添加新的年份分组：

```json
{
  "year": 2026,
  "items": [
    // 论文列表...
  ]
}
```

#### 添加照片

打开 `_data/photos.json`，在 `photos` 数组中添加：

```json
{
  "src": "/images/lab_photos/filename.jpg",
  "alt": "照片描述",
  "caption": "可选的标题"
}
```

然后添加照片文件到 `images/lab_photos/filename.jpg`。

### 旧方式：直接编辑 HTML

如果需要，你仍然可以直接编辑 HTML 文件（`index.html`, `p_team/index.html`, `p_publications/index.html` 等）。

## 部署

网站托管在 Netlify 上，与 GitHub 仓库自动同步：

1. 提交更改到 GitHub
2. Netlify 自动重新部署
3. 等待约 1-2 分钟，网站更新

```bash
git add .
git commit -m "更新内容"
git push
```

## 项目结构

```
.
├── _data/                  # 内容数据文件（JSON 格式）
│   ├── members.json        # 成员和校友信息
│   ├── publications.json   # 论文列表
│   └── photos.json         # 照片列表
├── css/                    # 样式文件
├── js/                     # JavaScript 文件
│   └── content-loader.js   # 内容加载器
├── p_team/                 # 团队页面
├── p_members/              # 成员详情页（动态）
│   └── index.html          # 通用成员详情页，通过 ?id=xxx 参数显示不同成员
├── p_publications/         # 论文页面
├── p_photos/               # 照片页面（动态）
├── p_join-us/              # 加入我们
├── p_contact/              # 联系我们
└── images/                 # 图片资源
    ├── members/            # 成员照片
    └── lab_photos/         # 实验室照片
```

## 技术说明

- **类型**: 纯静态网站（无需构建步骤）
- **技术栈**: HTML + CSS + JavaScript
- **托管**: GitHub + Netlify
- **CDN 依赖**: Google Fonts, Font Awesome, Tippy.js, Mark.js

## 注意事项

1. JSON 文件必须格式正确（可以使用 [JSONLint](https://jsonlint.com/) 校验）
2. 图片路径使用绝对路径（如 `/images/members/name.jpg`）
3. 修改后建议先在本地预览，确认无误再提交
4. 成员详情页使用 URL 参数形式访问，如 `/p_members/?id=dingyi`

## 联系

如有问题，请联系：dpan@zju.edu.cn
