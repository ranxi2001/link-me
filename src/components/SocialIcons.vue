<template>
  <div class="socials">
    <button
      v-for="s in socials"
      :key="s.id"
      class="social-btn"
      :title="s.label"
      :style="{ color: textColor }"
      @click="handleSocial(s)"
    >
      <span class="social-icon" v-html="renderIcon(s.type)"></span>
    </button>
  </div>

  <!-- 微信弹窗 -->
  <Teleport to="body">
    <div v-if="wechatModal" class="modal-overlay" @click.self="wechatModal = false">
      <div class="modal-box">
        <div class="modal-title">微信号</div>
        <div class="modal-wechat">{{ wechatValue }}</div>
        <button class="modal-copy" @click="copyWechat">复制微信号</button>
        <button class="modal-close" @click="wechatModal = false">关闭</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { renderIcon } from '../utils/socialIcons.js'

const props = defineProps({
  socials: { type: Array, default: () => [] },
  textColor: { type: String, default: '#ffffff' },
})

const wechatModal = ref(false)
const wechatValue = ref('')

function handleSocial(s) {
  if (s.type === 'wechat') {
    wechatValue.value = s.value
    wechatModal.value = true
  } else {
    window.open(s.value, '_blank', 'noopener')
  }
}

function copyWechat() {
  navigator.clipboard.writeText(wechatValue.value).then(() => {
    alert('微信号已复制到剪贴板')
  })
}
</script>

<style scoped>
.socials {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 12px 0;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.social-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-box {
  background: white;
  border-radius: 16px;
  padding: 28px 32px;
  text-align: center;
  min-width: 240px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
}

.modal-wechat {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.modal-copy {
  display: block;
  width: 100%;
  padding: 10px;
  background: #07c160;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  transition: opacity 0.2s;
}

.modal-copy:hover {
  opacity: 0.85;
}

.modal-close {
  display: block;
  width: 100%;
  padding: 10px;
  background: #f5f5f5;
  color: #666;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s;
}

.modal-close:hover {
  background: #eee;
}
</style>
