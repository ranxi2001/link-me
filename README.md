# link-me

> 一个简洁的个人链接聚合主页，类似 Linktree / vlink.cc，纯静态、免费部署。

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vuedotjs)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages%20%7C%20Vercel-black?style=flat-square)

---

## 预览

| 主页 | 管理后台 |
|------|----------|
| 头像 · 昵称 · 简介 · 社交图标 · 链接卡片 | 资料编辑 · 链接管理 · 主题切换 · 安全设置 |

---

## 功能特性

**主页（公开）**
- 圆形头像、昵称、个人简介
- 社交平台图标栏，微信号弹窗复制，其他平台新标签打开
- 链接卡片列表，支持精选高亮动画
- 6 套渐变主题，实时响应

**管理后台（密码保护）**
- 个人资料编辑（头像上传、用户名、简介）
- 链接增删改、显示/隐藏、上下排序、设置精选
- 社交账号管理，图标可视化选择器，支持搜索
- 6 套预设主题一键切换，实时手机预览
- 数据统计看板（演示）

**安全**
- 密码以 SHA-256 哈希存储，明文不落盘
- 首次访问 `/admin` 自动引导设置密码
- `sessionStorage` 会话，关闭浏览器自动失效（8 小时有效）
- Vue Router 导航守卫保护后台路由
- 修改密码后自动踢出重新登录

**图标库**
- 集成 [simple-icons](https://simpleicons.org/)（3300+ 品牌图标）
- 支持：微信、QQ、微博、B站、抖音、小红书、知乎、快手、豆瓣、网易云音乐、GitHub、X、Instagram、YouTube、Telegram、Discord、Spotify、Steam 等 50+ 平台

---

## 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/link-me.git
cd link-me

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 http://localhost:5173

- `/#/` — 公开主页
- `/#/admin` — 管理后台（首次访问会引导设置密码）

### 构建

```bash
npm run build
# 产物在 dist/ 目录
```

---

## 部署

### Vercel（推荐，一键）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/link-me)

### GitHub Pages

```bash
# 构建
npm run build

# 将 dist/ 内容推送到 gh-pages 分支
# 或使用 GitHub Actions 自动部署
```

> 由于使用 Hash 路由（`/#/`），无需配置服务器重定向，可直接部署到任意静态托管平台。

### Nginx

```nginx
server {
    listen 80;
    root /var/www/link-me/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 项目结构

```
link-me/
├── src/
│   ├── views/
│   │   ├── Profile.vue        # 公开主页
│   │   ├── Admin.vue          # 管理后台
│   │   └── Login.vue          # 登录页
│   ├── components/
│   │   └── SocialIcons.vue    # 社交图标组件
│   ├── stores/
│   │   └── profile.js         # Pinia 状态（含主题配置）
│   ├── utils/
│   │   ├── auth.js            # 鉴权工具（SHA-256、session）
│   │   └── socialIcons.js     # simple-icons 图标注册表
│   ├── router/
│   │   └── index.js           # 路由 + 导航守卫
│   └── assets/
│       └── global.css
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## 技术栈

| 技术 | 用途 |
|------|------|
| [Vue 3](https://vuejs.org/) | 前端框架（Composition API） |
| [Vite 5](https://vitejs.dev/) | 构建工具 |
| [Pinia](https://pinia.vuejs.org/) | 状态管理 |
| [Vue Router 4](https://router.vuejs.org/) | 路由 + 导航守卫 |
| [simple-icons](https://simpleicons.org/) | 品牌图标库 |
| Web Crypto API | 密码 SHA-256 哈希 |
| localStorage / sessionStorage | 数据持久化 |

---

## 数据存储说明

所有数据存储在浏览器本地：

| 键名 | 存储位置 | 内容 |
|------|----------|------|
| `linkme-profile` | `localStorage` | 主页配置（链接、主题、资料） |
| `linkme-admin-hash` | `localStorage` | 管理员密码 SHA-256 哈希 |
| `linkme-auth` | `sessionStorage` | 登录会话 token + 过期时间 |

> 纯静态部署，无需数据库和后端服务。数据存在用户浏览器中，清除浏览器数据会重置所有内容。

---

## 自定义主题

内置 6 套主题，在管理后台「主题外观」直接切换：

- 紫色梦幻 · 海洋蓝调 · 夕阳橙红 · 森林绿意 · 暗夜极简 · 清新白色

如需自定义，修改 `src/stores/profile.js` 中的 `THEMES` 数组，添加渐变色即可：

```js
{
  id: 'custom',
  name: '我的主题',
  bg: 'linear-gradient(135deg, #your-color-1, #your-color-2)',
  card: 'rgba(255,255,255,0.15)',
  cardHover: 'rgba(255,255,255,0.25)',
  text: '#ffffff',
  subText: 'rgba(255,255,255,0.8)',
  btnBg: 'rgba(255,255,255,0.2)',
  btnHover: 'rgba(255,255,255,0.35)',
}
```

---

## 安全说明

本项目为**纯静态客户端应用**，管理员密码以 SHA-256 哈希存在 `localStorage` 中。这意味着：

- ✅ 密码明文不可被读取
- ✅ 可防止普通用户随意修改主页
- ⚠️ 本机物理访问者理论上可绕过（适合个人部署场景）
- 如需更高安全级别，可自行接入后端 API 替换 `src/utils/auth.js`

---

## License

[MIT](./LICENSE) © 2024
