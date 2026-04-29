<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Logo -->
      <div class="logo">
        <svg viewBox="0 0 100 100" width="48" height="48">
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea"/>
              <stop offset="100%" style="stop-color:#764ba2"/>
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="24" fill="url(#lg)"/>
          <text x="50" y="68" font-size="52" text-anchor="middle" fill="white" font-weight="bold">L</text>
        </svg>
        <span>link-me</span>
      </div>

      <!-- 首次设置密码 -->
      <template v-if="mode === 'setup'">
        <h2>设置管理员密码</h2>
        <p class="subtitle">首次使用，请为管理后台设置一个密码</p>

        <div class="form-group">
          <label>设置密码</label>
          <div class="input-wrap">
            <input
              v-model="password"
              :type="showPwd ? 'text' : 'password'"
              class="input"
              placeholder="至少 6 位"
              @keyup.enter="handleSetup"
            />
            <button class="eye-btn" @click="showPwd = !showPwd">
              <svg v-if="showPwd" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>确认密码</label>
          <input
            v-model="confirm"
            :type="showPwd ? 'text' : 'password'"
            class="input"
            placeholder="再次输入密码"
            @keyup.enter="handleSetup"
          />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button class="btn-primary" :disabled="loading" @click="handleSetup">
          {{ loading ? '设置中…' : '完成设置' }}
        </button>
      </template>

      <!-- 登录 -->
      <template v-else>
        <h2>管理员登录</h2>
        <p class="subtitle">输入密码以访问管理后台</p>

        <div class="form-group">
          <label>密码</label>
          <div class="input-wrap">
            <input
              ref="pwdInput"
              v-model="password"
              :type="showPwd ? 'text' : 'password'"
              class="input"
              :class="{ shake: shaking }"
              placeholder="输入管理密码"
              @keyup.enter="handleLogin"
            />
            <button class="eye-btn" @click="showPwd = !showPwd">
              <svg v-if="showPwd" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </button>
          </div>
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button class="btn-primary" :disabled="loading" @click="handleLogin">
          {{ loading ? '验证中…' : '进入管理后台' }}
        </button>

        <router-link to="/" class="back-link">← 返回主页</router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { hasPasswordSet, verifyPassword, setPassword, login, isAuthenticated } from '../utils/auth.js'

const router = useRouter()
const mode = ref('login')
const password = ref('')
const confirm = ref('')
const showPwd = ref(false)
const error = ref('')
const loading = ref(false)
const shaking = ref(false)

onMounted(() => {
  if (isAuthenticated()) {
    router.replace('/admin')
    return
  }
  mode.value = hasPasswordSet() ? 'login' : 'setup'
})

async function handleLogin() {
  if (!password.value) { error.value = '请输入密码'; return }
  loading.value = true
  error.value = ''
  const ok = await verifyPassword(password.value)
  loading.value = false
  if (ok) {
    login()
    router.replace('/admin')
  } else {
    error.value = '密码错误，请重试'
    shaking.value = true
    password.value = ''
    setTimeout(() => { shaking.value = false }, 600)
  }
}

async function handleSetup() {
  if (password.value.length < 6) { error.value = '密码至少 6 位'; return }
  if (password.value !== confirm.value) { error.value = '两次密码不一致'; return }
  loading.value = true
  await setPassword(password.value)
  login()
  loading.value = false
  router.replace('/admin')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f2f5 0%, #e8ecf5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 40px 36px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.logo span {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.3px;
}

h2 {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 14px;
  color: #888;
  margin-bottom: 28px;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
}

.input-wrap {
  position: relative;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #1a1a1a;
  background: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrap .input {
  padding-right: 44px;
}

.input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.12);
  background: white;
  outline: none;
}

.eye-btn {
  position: absolute;
  right: 12px;
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

.error-msg {
  font-size: 13px;
  color: #ef4444;
  margin-bottom: 12px;
  padding: 10px 14px;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.btn-primary {
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  margin-top: 4px;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #888;
  transition: color 0.15s;
}

.back-link:hover {
  color: #667eea;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}

.shake {
  animation: shake 0.5s ease;
}
</style>
