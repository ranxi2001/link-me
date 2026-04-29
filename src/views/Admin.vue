<template>
  <div class="admin-layout">
    <!-- 左侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <svg viewBox="0 0 100 100" width="32" height="32">
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea"/>
              <stop offset="100%" style="stop-color:#764ba2"/>
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="20" fill="url(#lg)"/>
          <text x="50" y="68" font-size="52" text-anchor="middle" fill="white" font-weight="bold">V</text>
        </svg>
        <span class="logo-text">link-me 管理</span>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="nav-item"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="nav-icon" v-html="tab.icon"></span>
          <span>{{ tab.label }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/" class="view-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          查看主页
        </router-link>
        <button class="logout-btn" @click="handleLogout">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          退出登录
        </button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 个人资料 -->
      <section v-show="activeTab === 'profile'" class="panel">
        <div class="panel-header">
          <h2>个人资料</h2>
          <p>设置你的个人信息，展示在主页顶部</p>
        </div>

        <div class="form-group">
          <label>头像</label>
          <div class="avatar-editor">
            <div class="avatar-preview">
              <img v-if="form.avatar" :src="form.avatar" alt="avatar"/>
              <div v-else class="avatar-ph">{{ form.nickname.charAt(0).toUpperCase() }}</div>
            </div>
            <div class="avatar-actions">
              <button class="btn-outline" @click="triggerAvatarUpload">上传图片</button>
              <button v-if="form.avatar" class="btn-danger-outline" @click="form.avatar = ''">移除头像</button>
              <input ref="avatarInput" type="file" accept="image/*" style="display:none" @change="handleAvatarChange"/>
            </div>
            <p class="form-hint">支持 JPG、PNG、GIF，建议正方形图片</p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>用户名 <span class="required">*</span></label>
            <div class="input-prefix-wrap">
              <span class="input-prefix">link-me/</span>
              <input v-model="form.username" placeholder="your-username" class="input-with-prefix"/>
            </div>
          </div>
          <div class="form-group">
            <label>昵称 <span class="required">*</span></label>
            <input v-model="form.nickname" placeholder="你的昵称" class="input"/>
          </div>
        </div>

        <div class="form-group">
          <label>个人简介</label>
          <textarea v-model="form.bio" placeholder="介绍一下自己..." class="textarea" rows="3"></textarea>
          <p class="form-hint">{{ form.bio.length }}/100</p>
        </div>

        <div class="form-actions">
          <button class="btn-primary" @click="saveProfile">保存资料</button>
        </div>
      </section>

      <!-- 链接管理 -->
      <section v-show="activeTab === 'links'" class="panel">
        <div class="panel-header">
          <h2>链接管理</h2>
          <p>添加、编辑和排序你的链接</p>
        </div>

        <button class="btn-primary add-link-btn" @click="openAddLink">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          添加链接
        </button>

        <div class="link-list">
          <div
            v-for="(link, idx) in store.data.links"
            :key="link.id"
            class="link-item"
            :class="{ disabled: !link.visible }"
          >
            <div class="link-drag-handle" title="拖动排序">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <span class="link-item-icon">{{ link.icon }}</span>
            <div class="link-item-info">
              <span class="link-item-title">{{ link.title }}</span>
              <span class="link-item-url">{{ link.url }}</span>
            </div>
            <div class="link-item-badges">
              <span v-if="link.highlight" class="badge badge-highlight">精选</span>
            </div>
            <div class="link-item-actions">
              <button class="icon-btn" :title="link.visible ? '隐藏' : '显示'" @click="toggleVisible(link)">
                <svg v-if="link.visible" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              </button>
              <button class="icon-btn" title="上移" :disabled="idx === 0" @click="moveLink(idx, -1)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                </svg>
              </button>
              <button class="icon-btn" title="下移" :disabled="idx === store.data.links.length - 1" @click="moveLink(idx, 1)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </button>
              <button class="icon-btn" title="编辑" @click="openEditLink(link)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button class="icon-btn icon-btn-danger" title="删除" @click="confirmDeleteLink(link)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="store.data.links.length === 0" class="empty-state">
            <p>暂无链接，点击上方按钮添加</p>
          </div>
        </div>
      </section>

      <!-- 社交账号 -->
      <section v-show="activeTab === 'socials'" class="panel">
        <div class="panel-header">
          <h2>社交账号</h2>
          <p>展示在头像下方的社交平台图标</p>
        </div>

        <button class="btn-primary add-link-btn" @click="openAddSocial">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          添加社交账号
        </button>

        <div class="link-list">
          <div v-for="social in store.data.socials" :key="social.id" class="link-item">
            <span class="link-item-icon" v-html="renderIcon(social.type)"></span>
            <div class="link-item-info">
              <span class="link-item-title">{{ social.label }}</span>
              <span class="link-item-url">{{ social.value }}</span>
            </div>
            <div class="link-item-actions">
              <button class="icon-btn" title="编辑" @click="openEditSocial(social)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button class="icon-btn icon-btn-danger" title="删除" @click="confirmDeleteSocial(social)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="store.data.socials.length === 0" class="empty-state">
            <p>暂无社交账号</p>
          </div>
        </div>
      </section>

      <!-- 主题设置 -->
      <section v-show="activeTab === 'theme'" class="panel">
        <div class="panel-header">
          <h2>主题外观</h2>
          <p>选择你喜欢的背景主题风格</p>
        </div>

        <div class="theme-grid">
          <div
            v-for="t in themes"
            :key="t.id"
            class="theme-card"
            :class="{ active: store.data.theme.id === t.id }"
            :style="{ background: t.bg }"
            @click="applyTheme(t)"
          >
            <div class="theme-preview-inner">
              <div class="tp-avatar"></div>
              <div class="tp-bar"></div>
              <div class="tp-bar tp-bar-short"></div>
              <div class="tp-btn"></div>
              <div class="tp-btn"></div>
            </div>
            <div class="theme-name">{{ t.name }}</div>
            <div v-if="store.data.theme.id === t.id" class="theme-check">
              <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- 数据统计 -->
      <section v-show="activeTab === 'stats'" class="panel">
        <div class="panel-header">
          <h2>数据统计</h2>
          <p>查看主页访问和链接点击情况</p>
        </div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👁️</div>
            <div class="stat-value">{{ Math.floor(Math.random() * 9000) + 1000 }}</div>
            <div class="stat-label">今日浏览</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔗</div>
            <div class="stat-value">{{ store.data.links.length }}</div>
            <div class="stat-label">链接总数</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👆</div>
            <div class="stat-value">{{ Math.floor(Math.random() * 500) + 100 }}</div>
            <div class="stat-label">今日点击</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-value">{{ Math.floor(Math.random() * 50000) + 5000 }}</div>
            <div class="stat-label">累计访问</div>
          </div>
        </div>
        <div class="stats-note">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          数据为演示数据，实际统计需接入后端服务
        </div>
      </section>

      <!-- 安全设置 -->
      <section v-show="activeTab === 'security'" class="panel">
        <div class="panel-header">
          <h2>安全设置</h2>
          <p>修改管理员密码，密码以 SHA-256 哈希存储在本地</p>
        </div>

        <div class="security-card">
          <div class="security-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </div>
          <div>
            <div class="security-title">修改密码</div>
            <div class="security-desc">建议使用 8 位以上包含字母和数字的组合</div>
          </div>
        </div>

        <div class="form-group">
          <label>当前密码</label>
          <div class="input-wrap">
            <input v-model="pwdForm.old" :type="pwdForm.showOld ? 'text' : 'password'" class="input" placeholder="输入当前密码"/>
            <button class="eye-btn" @click="pwdForm.showOld = !pwdForm.showOld">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>新密码</label>
            <input v-model="pwdForm.new" :type="pwdForm.showNew ? 'text' : 'password'" class="input" placeholder="至少 6 位"/>
          </div>
          <div class="form-group">
            <label>确认新密码</label>
            <input v-model="pwdForm.confirm" :type="pwdForm.showNew ? 'text' : 'password'" class="input" placeholder="再次输入新密码"/>
          </div>
        </div>

        <div class="form-actions" style="justify-content: space-between; align-items: center;">
          <label class="checkbox-label" style="margin-bottom:0">
            <input type="checkbox" v-model="pwdForm.showNew"/>
            <span class="checkbox-text">显示新密码</span>
          </label>
          <button class="btn-primary" @click="handleChangePwd">修改密码</button>
        </div>

        <div class="security-divider"></div>

        <div class="security-card danger-zone">
          <div class="security-icon danger-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
          </div>
          <div style="flex:1">
            <div class="security-title">退出登录</div>
            <div class="security-desc">会话将在关闭浏览器后自动失效，或点此立即退出</div>
          </div>
          <button class="btn-danger" @click="handleLogout">立即退出</button>
        </div>
      </section>
    </main>

    <!-- 右侧手机预览 -->
    <div class="preview-panel">
      <div class="preview-title">实时预览</div>
      <div class="phone-frame">
        <div class="phone-screen" :style="{ background: store.data.theme.bg }">
          <div class="ph-avatar">
            <img v-if="store.data.avatar" :src="store.data.avatar" alt="avatar"/>
            <span v-else>{{ store.data.nickname.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="ph-name" :style="{ color: store.data.theme.text }">{{ store.data.nickname }}</div>
          <div class="ph-bio" :style="{ color: store.data.theme.subText }">{{ store.data.bio }}</div>
          <div class="ph-links">
            <div
              v-for="link in store.visibleLinks.slice(0, 4)"
              :key="link.id"
              class="ph-link"
              :style="{ background: store.data.theme.btnBg, color: store.data.theme.text, border: '1px solid rgba(255,255,255,0.2)' }"
            >
              <span class="ph-link-icon">{{ link.icon }}</span>
              <span class="ph-link-title">{{ link.title }}</span>
            </div>
          </div>
        </div>
        <div class="phone-notch"></div>
      </div>
    </div>

    <!-- 链接编辑弹窗 -->
    <Teleport to="body">
      <div v-if="linkModal.show" class="modal-overlay" @click.self="linkModal.show = false">
        <div class="modal-panel">
          <div class="modal-head">
            <h3>{{ linkModal.isEdit ? '编辑链接' : '添加链接' }}</h3>
            <button class="modal-close-btn" @click="linkModal.show = false">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div class="form-group">
            <label>图标（Emoji）</label>
            <div class="emoji-row">
              <input v-model="linkModal.form.icon" class="input emoji-input" maxlength="4"/>
              <div class="emoji-presets">
                <button v-for="e in emojis" :key="e" class="emoji-btn" @click="linkModal.form.icon = e">{{ e }}</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>标题 <span class="required">*</span></label>
            <input v-model="linkModal.form.title" placeholder="链接标题" class="input"/>
          </div>

          <div class="form-group">
            <label>URL <span class="required">*</span></label>
            <input v-model="linkModal.form.url" placeholder="https://..." class="input"/>
          </div>

          <div class="form-group">
            <label>描述（可选）</label>
            <input v-model="linkModal.form.desc" placeholder="简短描述" class="input"/>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="linkModal.form.highlight"/>
              <span class="checkbox-text">设为精选（高亮显示）</span>
            </label>
          </div>

          <div class="modal-actions">
            <button class="btn-outline" @click="linkModal.show = false">取消</button>
            <button class="btn-primary" @click="saveLink">保存</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 社交账号编辑弹窗 -->
    <Teleport to="body">
      <div v-if="socialModal.show" class="modal-overlay" @click.self="socialModal.show = false">
        <div class="modal-panel">
          <div class="modal-head">
            <h3>{{ socialModal.isEdit ? '编辑社交账号' : '添加社交账号' }}</h3>
            <button class="modal-close-btn" @click="socialModal.show = false">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div class="form-group">
            <label>平台类型</label>
            <div class="platform-picker">
              <div class="platform-search">
                <input v-model="platformSearch" class="input" placeholder="搜索平台…" @input="platformSearch = $event.target.value"/>
              </div>
              <div class="platform-grid">
                <template v-if="platformSearch">
                  <button
                    v-for="p in filteredPlatforms"
                    :key="p.type"
                    class="platform-btn"
                    :class="{ active: socialModal.form.type === p.type }"
                    :title="p.label"
                    @click="selectPlatform(p)"
                  >
                    <span v-html="renderIcon(p.type, 18)"></span>
                    <span class="platform-label">{{ p.label }}</span>
                  </button>
                </template>
                <template v-else>
                  <div v-for="g in SOCIAL_PLATFORM_GROUPS" :key="g.group" class="platform-group">
                    <div class="platform-group-title">{{ g.group }}</div>
                    <div class="platform-group-items">
                      <button
                        v-for="p in g.platforms"
                        :key="p.type"
                        class="platform-btn"
                        :class="{ active: socialModal.form.type === p.type }"
                        :title="p.label"
                        @click="selectPlatform(p)"
                      >
                        <span v-html="renderIcon(p.type, 18)"></span>
                        <span class="platform-label">{{ p.label }}</span>
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>显示名称</label>
            <input v-model="socialModal.form.label" class="input" placeholder="如：微信"/>
          </div>

          <div class="form-group">
            <label>{{ socialModal.form.type === 'wechat' ? '微信号' : '链接地址' }}</label>
            <input v-model="socialModal.form.value" class="input" :placeholder="socialModal.form.type === 'wechat' ? '你的微信号' : 'https://...'"/>
          </div>

          <div class="modal-actions">
            <button class="btn-outline" @click="socialModal.show = false">取消</button>
            <button class="btn-primary" @click="saveSocial">保存</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast 提示 -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="toast.show" class="toast" :class="toast.type">{{ toast.msg }}</div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useProfileStore } from '../stores/profile.js'
import { THEMES } from '../stores/profile.js'
import { renderIcon, SOCIAL_PLATFORM_GROUPS, ALL_PLATFORMS } from '../utils/socialIcons.js'

const store = useProfileStore()
const themes = THEMES
const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: '个人资料', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' },
  { id: 'links', label: '链接管理', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/></svg>' },
  { id: 'socials', label: '社交账号', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>' },
  { id: 'theme', label: '主题外观', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>' },
  { id: 'stats', label: '数据统计', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>' },
  { id: 'security', label: '安全设置', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>' },
]

// 个人资料表单
const form = reactive({
  username: store.data.username,
  nickname: store.data.nickname,
  avatar: store.data.avatar,
  bio: store.data.bio,
})

const avatarInput = ref(null)

function triggerAvatarUpload() {
  avatarInput.value?.click()
}

function handleAvatarChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    form.avatar = ev.target.result
  }
  reader.readAsDataURL(file)
}

function saveProfile() {
  if (!form.username.trim() || !form.nickname.trim()) {
    showToast('用户名和昵称不能为空', 'error')
    return
  }
  store.updateProfile({ ...form })
  showToast('资料已保存')
}

// 链接管理
const emojis = ['🔗', '📝', '🎵', '🎬', '🛍️', '📱', '🌐', '💼', '📸', '🎮', '📚', '🎯', '💡', '🌟']

const linkModal = reactive({
  show: false,
  isEdit: false,
  editId: null,
  form: { title: '', url: '', icon: '🔗', desc: '', highlight: false },
})

function openAddLink() {
  linkModal.isEdit = false
  linkModal.editId = null
  Object.assign(linkModal.form, { title: '', url: '', icon: '🔗', desc: '', highlight: false })
  linkModal.show = true
}

function openEditLink(link) {
  linkModal.isEdit = true
  linkModal.editId = link.id
  Object.assign(linkModal.form, { ...link })
  linkModal.show = true
}

function saveLink() {
  if (!linkModal.form.title.trim() || !linkModal.form.url.trim()) {
    showToast('标题和链接不能为空', 'error')
    return
  }
  if (linkModal.isEdit) {
    store.updateLink(linkModal.editId, { ...linkModal.form })
  } else {
    store.addLink({ ...linkModal.form })
  }
  linkModal.show = false
  showToast(linkModal.isEdit ? '链接已更新' : '链接已添加')
}

function toggleVisible(link) {
  store.updateLink(link.id, { visible: !link.visible })
}

function moveLink(idx, dir) {
  const links = [...store.data.links]
  const newIdx = idx + dir
  if (newIdx < 0 || newIdx >= links.length) return
  ;[links[idx], links[newIdx]] = [links[newIdx], links[idx]]
  store.reorderLinks(links)
}

function confirmDeleteLink(link) {
  if (confirm(`确认删除链接「${link.title}」？`)) {
    store.deleteLink(link.id)
    showToast('链接已删除')
  }
}

// 社交账号
const socialModal = reactive({
  show: false,
  isEdit: false,
  editId: null,
  form: { type: 'wechat', label: '微信', value: '' },
})

function openAddSocial() {
  socialModal.isEdit = false
  socialModal.editId = null
  Object.assign(socialModal.form, { type: 'wechat', label: '微信', value: '' })
  socialModal.show = true
}

function openEditSocial(social) {
  socialModal.isEdit = true
  socialModal.editId = social.id
  Object.assign(socialModal.form, { ...social })
  socialModal.show = true
}

const platformSearch = ref('')

const filteredPlatforms = computed(() => {
  const q = platformSearch.value.toLowerCase()
  return ALL_PLATFORMS.filter(p => p.label.toLowerCase().includes(q) || p.type.includes(q))
})

function selectPlatform(p) {
  socialModal.form.type = p.type
  socialModal.form.label = p.label
}

function onSocialTypeChange() {
  const found = ALL_PLATFORMS.find(s => s.type === socialModal.form.type)
  if (found) socialModal.form.label = found.label
}

function saveSocial() {
  if (!socialModal.form.value.trim()) {
    showToast('请填写账号或链接', 'error')
    return
  }
  if (socialModal.isEdit) {
    store.updateSocial(socialModal.editId, { ...socialModal.form })
  } else {
    store.addSocial({ ...socialModal.form })
  }
  socialModal.show = false
  showToast(socialModal.isEdit ? '社交账号已更新' : '社交账号已添加')
}

function confirmDeleteSocial(social) {
  if (confirm(`确认删除「${social.label}」？`)) {
    store.deleteSocial(social.id)
    showToast('已删除')
  }
}

// 主题
function applyTheme(t) {
  store.setTheme(t)
  showToast(`主题已切换为「${t.name}」`)
}

// Toast
const toast = reactive({ show: false, msg: '', type: 'success' })
let toastTimer = null

function showToast(msg, type = 'success') {
  clearTimeout(toastTimer)
  toast.msg = msg
  toast.type = type
  toast.show = true
  toastTimer = setTimeout(() => { toast.show = false }, 2500)
}

// 安全设置
import { logout, changePassword } from '../utils/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const pwdForm = reactive({
  old: '', new: '', confirm: '',
  showOld: false, showNew: false,
})

function handleLogout() {
  logout()
  router.push('/login')
}

async function handleChangePwd() {
  if (!pwdForm.old) { showToast('请输入当前密码', 'error'); return }
  if (pwdForm.new.length < 6) { showToast('新密码至少 6 位', 'error'); return }
  if (pwdForm.new !== pwdForm.confirm) { showToast('两次密码不一致', 'error'); return }
  const ok = await changePassword(pwdForm.old, pwdForm.new)
  if (ok) {
    showToast('密码已修改，请重新登录')
    Object.assign(pwdForm, { old: '', new: '', confirm: '' })
    setTimeout(() => { logout(); router.push('/login') }, 1500)
  } else {
    showToast('当前密码错误', 'error')
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
}

/* 侧边栏 */
.sidebar {
  width: 220px;
  background: white;
  border-right: 1px solid #e8eaed;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px 16px;
  border-bottom: 1px solid #f0f2f5;
}

.logo-text {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  color: #555;
  background: transparent;
  transition: all 0.15s ease;
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background: #f5f5f7;
  color: #1a1a1a;
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea20, #764ba220);
  color: #667eea;
  font-weight: 600;
}

.nav-item.active .nav-icon {
  color: #667eea;
}

.nav-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #f0f2f5;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  color: #667eea;
  background: #667eea15;
  transition: background 0.15s;
}

.view-btn:hover {
  background: #667eea25;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  color: #ef4444;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 6px;
  transition: background 0.15s;
}

.logout-btn:hover {
  background: #fef2f2;
}

/* 安全设置 */
.security-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8faff;
  border: 1px solid #e8edf8;
  border-radius: 12px;
  margin-bottom: 20px;
}

.security-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea20, #764ba220);
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.security-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.security-desc {
  font-size: 12px;
  color: #888;
}

.security-divider {
  height: 1px;
  background: #f0f2f5;
  margin: 24px 0;
}

.danger-zone {
  background: #fff8f8;
  border-color: #fecaca;
}

.danger-icon {
  background: #fef2f2;
  color: #ef4444;
}

.btn-danger {
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s;
  flex-shrink: 0;
}

.btn-danger:hover {
  opacity: 0.85;
}

.input-wrap {
  position: relative;
}

.input-wrap .input {
  padding-right: 42px;
}

.eye-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.15s;
}

.eye-btn:hover {
  color: #555;
}

/* 主内容 */
.main-content {
  flex: 1;
  margin-left: 220px;
  margin-right: 320px;
  padding: 32px;
  min-height: 100vh;
}

.panel {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.panel-header {
  margin-bottom: 24px;
}

.panel-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.panel-header p {
  font-size: 14px;
  color: #888;
}

/* 表单 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.required {
  color: #e53e3e;
}

.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1a1a1a;
  background: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1a1a1a;
  background: #fafafa;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  line-height: 1.6;
}

.textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.form-hint {
  font-size: 12px;
  color: #aaa;
  margin-top: 4px;
}

.input-prefix-wrap {
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-prefix-wrap:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.input-prefix {
  padding: 10px 12px;
  font-size: 13px;
  color: #888;
  background: #f5f5f7;
  border-right: 1px solid #e2e8f0;
  white-space: nowrap;
}

.input-with-prefix {
  flex: 1;
  padding: 10px 14px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #1a1a1a;
  outline: none;
}

/* 头像编辑 */
.avatar-editor {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-ph {
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 按钮 */
.btn-primary {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s, transform 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-outline {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #555;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}

.btn-outline:hover {
  border-color: #667eea;
  color: #667eea;
}

.btn-danger-outline {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #fca5a5;
  color: #ef4444;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}

.btn-danger-outline:hover {
  background: #fef2f2;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

/* 链接列表 */
.add-link-btn {
  margin-bottom: 16px;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #fafafa;
  border: 1px solid #e8eaed;
  border-radius: 12px;
  transition: all 0.15s;
}

.link-item:hover {
  border-color: #d0d5e0;
  background: white;
}

.link-item.disabled {
  opacity: 0.5;
}

.link-drag-handle {
  color: #ccc;
  cursor: grab;
  flex-shrink: 0;
}

.link-item-icon {
  font-size: 22px;
  flex-shrink: 0;
  line-height: 1;
  display: flex;
  align-items: center;
}

.link-item-info {
  flex: 1;
  min-width: 0;
}

.link-item-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.link-item-url {
  display: block;
  font-size: 12px;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.link-item-badges {
  display: flex;
  gap: 6px;
}

.badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 500;
}

.badge-highlight {
  background: linear-gradient(135deg, #667eea20, #764ba220);
  color: #667eea;
}

.link-item-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  background: transparent;
  transition: all 0.15s;
}

.icon-btn:hover:not(:disabled) {
  background: #f0f2f5;
  color: #444;
}

.icon-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.icon-btn-danger:hover:not(:disabled) {
  background: #fef2f2;
  color: #ef4444;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #aaa;
  font-size: 14px;
  background: #fafafa;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
}

/* 主题选择 */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.theme-card {
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 3px solid transparent;
}

.theme-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.theme-card.active {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.theme-preview-inner {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.tp-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
}

.tp-bar {
  height: 6px;
  width: 80%;
  border-radius: 3px;
  background: rgba(255,255,255,0.35);
}

.tp-bar-short {
  width: 55%;
}

.tp-btn {
  height: 20px;
  width: 90%;
  border-radius: 6px;
  background: rgba(255,255,255,0.25);
}

.theme-name {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: rgba(0,0,0,0.2);
}

.theme-check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 统计 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fafafa;
  border: 1px solid #e8eaed;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
}

.stat-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #888;
}

.stats-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #aaa;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 12px 16px;
}

/* 右侧预览面板 */
.preview-panel {
  width: 300px;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
  border-left: 1px solid #e8eaed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px;
  overflow-y: auto;
}

.preview-title {
  font-size: 13px;
  font-weight: 600;
  color: #888;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.phone-frame {
  width: 220px;
  height: 420px;
  border-radius: 32px;
  border: 8px solid #1a1a1a;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.phone-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 16px;
  background: #1a1a1a;
  border-radius: 8px;
  z-index: 10;
}

.phone-screen {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 36px 12px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.ph-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  border: 2px solid rgba(255,255,255,0.5);
}

.ph-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ph-name {
  font-size: 13px;
  font-weight: 700;
}

.ph-bio {
  font-size: 10px;
  text-align: center;
  line-height: 1.4;
}

.ph-links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}

.ph-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  backdrop-filter: blur(4px);
}

.ph-link-icon {
  font-size: 14px;
}

.ph-link-title {
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 20px;
}

.modal-panel {
  background: white;
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.modal-head h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  transition: all 0.15s;
}

.modal-close-btn:hover {
  background: #eee;
  color: #333;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
}

.emoji-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.emoji-input {
  width: 80px;
  text-align: center;
  font-size: 20px;
}

.emoji-presets {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.emoji-btn {
  width: 36px;
  height: 36px;
  font-size: 18px;
  border-radius: 8px;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  cursor: pointer;
  border: 1px solid transparent;
}

.emoji-btn:hover {
  background: #ebebef;
  border-color: #d0d5e0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-text {
  font-size: 14px;
  color: #444;
  font-weight: 400;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  white-space: nowrap;
}

.toast.success {
  background: #1a1a1a;
  color: white;
}

.toast.error {
  background: #ef4444;
  color: white;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(16px);
}

/* 响应式 */
@media (max-width: 1100px) {
  .preview-panel {
    display: none;
  }
  .main-content {
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 64px;
  }
  .logo-text,
  .nav-item span:last-child,
  .sidebar-footer .view-btn span {
    display: none;
  }
  .sidebar-logo {
    justify-content: center;
    padding: 16px 0;
  }
  .nav-item {
    justify-content: center;
    padding: 12px;
  }
  .view-btn {
    justify-content: center;
    padding: 10px 0;
  }
  .main-content {
    margin-left: 64px;
    padding: 20px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .theme-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 平台选择器 */
.platform-picker {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #fafafa;
}

.platform-search {
  padding: 10px;
  border-bottom: 1px solid #e2e8f0;
  background: white;
}

.platform-search .input {
  border-radius: 8px;
  font-size: 13px;
  padding: 8px 12px;
}

.platform-grid {
  max-height: 260px;
  overflow-y: auto;
  padding: 8px;
}

.platform-group {
  margin-bottom: 4px;
}

.platform-group-title {
  font-size: 11px;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 6px 4px 4px;
}

.platform-group-items {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.platform-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  background: white;
  border: 1px solid #e8eaed;
  font-size: 12px;
  color: #444;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.platform-btn:hover {
  border-color: #667eea;
  color: #667eea;
  background: #667eea0a;
}

.platform-btn.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea15, #764ba215);
  color: #667eea;
  font-weight: 600;
}

.platform-label {
  font-size: 12px;
}
</style>
