/**
 * Content Loader - 从 JSON 数据文件动态加载和渲染内容
 * 
 * 使用方法:
 * 1. 在 HTML 中添加 data-content 属性的元素
 *    <div data-content="members" data-filter="current"></div>
 *    <div data-content="alumni"></div>
 *    <div data-content="publications"></div>
 *    <div data-content="member-detail" data-member-id="dingyi"></div>
 *    <div data-content="photos"></div>
 * 
 * 2. 引入此脚本：<script src="/js/content-loader.js" defer></script>
 */

// 内容渲染器配置
const ContentLoader = {
    // 数据文件路径
    dataPaths: {
        members: '/_data/members.json',
        publications: '/_data/publications.json',
        photos: '/_data/photos.json'
    },
    
    // 缓存数据
    cache: {},
    
    /**
     * 加载 JSON 数据
     */
    async loadData(type) {
        if (this.cache[type]) {
            return this.cache[type];
        }
        
        try {
            const response = await fetch(this.dataPaths[type]);
            if (!response.ok) {
                console.warn(`Failed to load ${type} data:`, response.status);
                return null;
            }
            const data = await response.json();
            this.cache[type] = data;
            return data;
        } catch (error) {
            console.warn(`Error loading ${type} data:`, error);
            return null;
        }
    },
    
    /**
     * 从 URL 参数获取成员 ID
     */
    getMemberIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    },
    
    /**
     * 渲染成员列表
     */
    renderMemberPortrait(member) {
        const imageFallback = "this.src = '/images/placeholder.svg'; this.onerror = null;";
        const nameCnDisplay = member.name_cn ? `<span class="portrait_name_cn">${member.name_cn}</span>` : '';
        return `
            <a href="/p_members/?id=${member.id}" class="portrait" style="--width: 150px">
                <div class="role" data-tooltip="${member.role}">
                    <i class="fas fa-${member.role_icon}"></i>
                </div>
                <span class="portrait_image">
                    <img src="${member.image}" 
                         onerror="${imageFallback}"
                         loading="lazy" 
                         alt="${member.name}">
                </span>
                <span class="portrait_name">${member.name}</span>
                ${nameCnDisplay}
                <span class="portrait_description">${member.position}</span>
            </a>
        `;
    },
    
    /**
     * 渲染校友列表
     */
    renderAlumniList(alumni) {
        const items = alumni.map(person => {
            const nameDisplay = person.name_cn ? 
                `${person.name_cn} (${person.name})` : person.name;
            return `
                <li>
                    <strong>${nameDisplay}</strong> (${person.degree}), ${person.period}
                    <br>Next station: ${person.next_position}
                </li>
            `;
        }).join('');
        return `<ul>${items}</ul>`;
    },
    
    /**
     * 渲染成员详情页
     */
    renderMemberDetail(member) {
        if (!member) {
            return '<p class="center">Member not found. <a href="/p_team/">Back to team</a></p>';
        }
        
        const googleScholarLink = member.google_scholar ? `
            <a class="link" href="${member.google_scholar}" data-tooltip="Google Scholar" data-icon="true" data-text="true" data-style="">
                <i class="fab fa-google fa-lg"></i><span>Google Scholar</span>
            </a>
        ` : '';
        
        const nameCnDisplay = member.name_cn ? `<h2 class="center" style="font-size: 1.5em; margin-top: -0.5em; color: var(--text-color-light, #666);">${member.name_cn}</h2>` : '';
        
        return `
            <h1>${member.name}</h1>
            ${nameCnDisplay}
            <figure class="figure">
                <a class="figure_image_member">
                    <img src="${member.image}" alt="${member.name}" loading="lazy" />
                </a>
            </figure>
            <p class="center">
                <div class="role">
                    <i class="fas fa-${member.role_icon}"></i>
                    <span class="role_text">${member.role}</span>
                    <span class="role_description">${member.position}</span>
                </div>
            </p>
            <p class="center">
                <a class="link" href="mailto:${member.email}" data-tooltip="Email" data-icon="true" data-text="true" data-style="">
                    <i class="fas fa-envelope fa-lg"></i><span>Email</span>
                </a>
                ${googleScholarLink}
            </p>
            <p>${member.bio}</p>
        `;
    },
    
    /**
     * 渲染单篇论文
     */
    renderPaper(paper) {
        return `
            <div class="citation" data-style="rich">
                <div class="citation_text">
                    <div class="citation_title">
                        <a href="${paper.doi}" target="_blank" rel="noopener">${paper.title}</a>
                    </div>
                    <div class="citation_authors truncate" tabindex="0">${paper.authors}</div>
                    <div class="citation_details">
                        <strong>${paper.journal}</strong>, ${paper.details}
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * 渲染论文列表（按年份分组）
     */
    renderPublications(data) {
        const sections = data.papers.map(yearGroup => {
            const yearId = yearGroup.year;
            const yearLabel = yearGroup.label || yearId;
            const papersHtml = yearGroup.items.map(paper => this.renderPaper(paper)).join('');
            return `
                <h3 id="${yearId}">${yearLabel}</h3>
                ${papersHtml}
            `;
        }).join('');
        
        return `
            <p>${data.legend}</p>
            <h2 id="published">Published</h2>
            ${sections}
        `;
    },
    
    /**
     * 渲染照片画廊
     */
    renderPhotos(data) {
        // 将照片分成每组 3 个用于网格布局
        const groups = [];
        for (let i = 0; i < data.photos.length; i += 3) {
            groups.push(data.photos.slice(i, i + 3));
        }
        
        const galleryHtml = groups.map(group => {
            const photosHtml = group.map(photo => `
                <div class="dw-cluster__segment dw-cluster__segment--col dw-cluster__segment--half">
                    <div class="dw-panel dw-cluster__segment dw-panel--pulse">
                        <img src="${photo.src}" class="dw-panel__content" alt="${photo.alt}" loading="lazy" />
                    </div>
                </div>
            `).join('');
            
            return `
                <div class="dw-panel dw-cluster dw-cluster--vertical dw-lg">
                    ${photosHtml}
                </div>
            `;
        }).join('');
        
        return `
            <h1 id="lab-photos"><i class="fas fa-${data.icon}"></i>${data.title}</h1>
            <div class="dw">
                ${galleryHtml}
            </div>
        `;
    },
    
    /**
     * 初始化所有带 data-content 属性的元素
     */
    async init() {
        const containers = document.querySelectorAll('[data-content]');
        
        for (const container of containers) {
            const contentType = container.dataset.content;
            const filter = container.dataset.filter;
            const memberId = container.dataset.memberId || this.getMemberIdFromUrl();
            
            switch (contentType) {
                case 'members':
                    const membersData = await this.loadData('members');
                    if (membersData) {
                        if (filter === 'current') {
                            const membersHtml = membersData.current_members
                                .map(m => this.renderMemberPortrait(m))
                                .join('');
                            container.innerHTML = membersHtml;
                        }
                    }
                    break;
                    
                case 'alumni':
                    const alumniData = await this.loadData('members');
                    if (alumniData && alumniData.alumni) {
                        container.innerHTML = this.renderAlumniList(alumniData.alumni);
                    }
                    break;
                    
                case 'member-detail':
                    const detailData = await this.loadData('members');
                    if (detailData && detailData.current_members) {
                        const member = detailData.current_members.find(m => m.id === memberId);
                        container.innerHTML = this.renderMemberDetail(member);
                        // 更新页面标题
                        if (member) {
                            document.title = `${member.name} | MC2Rheol Lab`;
                        }
                    }
                    break;
                    
                case 'publications':
                    const pubData = await this.loadData('publications');
                    if (pubData) {
                        container.innerHTML = this.renderPublications(pubData);
                        // 触发搜索初始化（如果存在）
                        if (typeof searchFromUrl === 'function') {
                            setTimeout(searchFromUrl, 100);
                        }
                    }
                    break;
                    
                case 'photos':
                    const photosData = await this.loadData('photos');
                    if (photosData) {
                        container.innerHTML = this.renderPhotos(photosData);
                    }
                    break;
            }
        }
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    ContentLoader.init();
});
