<template>
  <div class="page" :style="{ background: store.data.theme.bg }">
    <!-- 背景装饰 -->
    <div class="bg-circles">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
    </div>

    <div class="container">
      <!-- 管理入口 -->
      <router-link to="/admin" class="admin-btn" :style="{ color: store.data.theme.subText }">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.34.07-.68.07-1.08s-.03-.73-.07-1.08l2.33-1.82c.21-.16.27-.45.13-.69l-2.21-3.82c-.14-.24-.42-.32-.66-.24l-2.75 1.1c-.57-.44-1.18-.81-1.86-1.08l-.41-2.93A.538.538 0 0014 3h-4c-.27 0-.5.2-.54.47l-.41 2.93c-.68.27-1.29.64-1.86 1.08l-2.75-1.1a.5.5 0 00-.66.24L1.57 10.44c-.14.24-.08.53.13.69l2.33 1.82c-.04.35-.07.69-.07 1.05s.03.73.07 1.08l-2.33 1.82c-.21.16-.27.45-.13.69l2.21 3.82c.14.24.42.32.66.24l2.75-1.1c.57.44 1.18.81 1.86 1.08l.41 2.93c.04.27.27.47.54.47h4c.27 0 .5-.2.54-.47l.41-2.93c.68-.27 1.29-.64 1.86-1.08l2.75 1.1c.24.08.52 0 .66-.24l2.21-3.82c.14-.24.08-.53-.13-.69l-2.33-1.82z"/>
        </svg>
        管理
      </router-link>

      <!-- 头像 -->
      <div class="avatar-wrap">
        <img
          v-if="store.data.avatar"
          :src="store.data.avatar"
          class="avatar"
          alt="avatar"
        />
        <div v-else class="avatar-placeholder" :style="{ background: 'rgba(255,255,255,0.3)' }">
          <span>{{ store.data.nickname.charAt(0).toUpperCase() }}</span>
        </div>
      </div>

      <!-- 昵称 -->
      <h1 class="nickname" :style="{ color: store.data.theme.text }">
        {{ store.data.nickname }}
      </h1>

      <!-- 用户名 -->
      <p class="username" :style="{ color: store.data.theme.subText }">
        @{{ store.data.username }}
      </p>

      <!-- 简介 -->
      <p v-if="store.data.bio" class="bio" :style="{ color: store.data.theme.subText }">
        {{ store.data.bio }}
      </p>

      <!-- 社交图标 -->
      <SocialIcons
        v-if="store.data.socials.length"
        :socials="store.data.socials"
        :text-color="store.data.theme.text"
      />

      <!-- 链接列表 -->
      <TransitionGroup name="link-list" tag="div" class="links">
        <a
          v-for="link in store.visibleLinks"
          :key="link.id"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="link-card"
          :class="{ highlight: link.highlight }"
          :style="getLinkStyle(link)"
          @click.prevent="handleLinkClick(link)"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <div class="link-info">
            <span class="link-title">{{ link.title }}</span>
            <span v-if="link.desc" class="link-desc" :style="{ color: link.highlight ? 'rgba(255,255,255,0.8)' : store.data.theme.subText }">
              {{ link.desc }}
            </span>
          </div>
          <span class="link-arrow">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </span>
        </a>
      </TransitionGroup>

      <!-- 品牌水印 -->
      <div class="brand" :style="{ color: store.data.theme.subText }">
        <span>Powered by</span>
        <strong>link-me</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '../stores/profile.js'
import SocialIcons from '../components/SocialIcons.vue'

const store = useProfileStore()

function getLinkStyle(link) {
  if (link.highlight) {
    return {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.2) 100%)',
      border: '1px solid rgba(255,255,255,0.5)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      color: store.data.theme.text,
    }
  }
  return {
    background: store.data.theme.btnBg,
    border: '1px solid rgba(255,255,255,0.2)',
    color: store.data.theme.text,
  }
}

function handleLinkClick(link) {
  window.open(link.url, '_blank', 'noopener')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 40px;
}

.bg-circles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.c1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -80px;
}

.c2 {
  width: 300px;
  height: 300px;
  bottom: -60px;
  left: -60px;
}

.container {
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  padding: 50px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.admin-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  transition: background 0.2s;
  z-index: 10;
}

.admin-btn:hover {
  background: rgba(0, 0, 0, 0.35);
}

.avatar-wrap {
  margin-bottom: 16px;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.avatar-placeholder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: white;
  border: 3px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.nickname {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.username {
  font-size: 14px;
  margin-bottom: 10px;
}

.bio {
  font-size: 14px;
  text-align: center;
  line-height: 1.6;
  max-width: 320px;
  margin-bottom: 4px;
}

.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  backdrop-filter: blur(8px);
}

.link-card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  background: v-bind('store.data.theme.btnHover') !important;
}

.link-card.highlight {
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
  50% { box-shadow: 0 8px 30px rgba(0,0,0,0.25); }
}

.link-icon {
  font-size: 24px;
  flex-shrink: 0;
  line-height: 1;
}

.link-info {
  flex: 1;
  min-width: 0;
}

.link-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-desc {
  display: block;
  font-size: 12px;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-arrow {
  flex-shrink: 0;
  opacity: 0.6;
  display: flex;
  align-items: center;
}

.brand {
  margin-top: 36px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.7;
}

.brand strong {
  font-weight: 700;
  letter-spacing: 0.5px;
}

.link-list-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.link-list-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.link-list-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.link-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
