import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const DEFAULT_DATA = {
  username: 'tosky',
  nickname: 'Tosky',
  avatar: '',
  bio: '分享我的全部链接 🔗',
  theme: {
    id: 'purple',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    card: 'rgba(255,255,255,0.15)',
    cardHover: 'rgba(255,255,255,0.25)',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.8)',
    btnBg: 'rgba(255,255,255,0.2)',
    btnHover: 'rgba(255,255,255,0.35)',
  },
  socials: [
    { id: 1, type: 'wechat', label: '微信', value: 'tosky123', icon: 'wechat' },
    { id: 2, type: 'weibo', label: '微博', value: 'https://weibo.com/tosky', icon: 'weibo' },
    { id: 3, type: 'bilibili', label: 'B站', value: 'https://space.bilibili.com/tosky', icon: 'bilibili' },
  ],
  links: [
    {
      id: 1,
      title: '我的博客',
      url: 'https://blog.example.com',
      icon: '📝',
      desc: '分享技术文章与生活感悟',
      highlight: false,
      visible: true,
    },
    {
      id: 2,
      title: '抖音主页',
      url: 'https://douyin.com/@tosky',
      icon: '🎵',
      desc: '每天分享有趣视频',
      highlight: true,
      visible: true,
    },
    {
      id: 3,
      title: '淘宝店铺',
      url: 'https://shop.taobao.com/tosky',
      icon: '🛍️',
      desc: '精选好物推荐',
      highlight: false,
      visible: true,
    },
    {
      id: 4,
      title: '小红书',
      url: 'https://xiaohongshu.com/tosky',
      icon: '📱',
      desc: '生活方式分享',
      highlight: false,
      visible: true,
    },
  ],
}

const THEMES = [
  {
    id: 'purple',
    name: '紫色梦幻',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    card: 'rgba(255,255,255,0.15)',
    cardHover: 'rgba(255,255,255,0.25)',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.8)',
    btnBg: 'rgba(255,255,255,0.2)',
    btnHover: 'rgba(255,255,255,0.35)',
  },
  {
    id: 'ocean',
    name: '海洋蓝调',
    bg: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
    card: 'rgba(255,255,255,0.15)',
    cardHover: 'rgba(255,255,255,0.25)',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.85)',
    btnBg: 'rgba(255,255,255,0.2)',
    btnHover: 'rgba(255,255,255,0.35)',
  },
  {
    id: 'sunset',
    name: '夕阳橙红',
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    card: 'rgba(255,255,255,0.15)',
    cardHover: 'rgba(255,255,255,0.25)',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.85)',
    btnBg: 'rgba(255,255,255,0.2)',
    btnHover: 'rgba(255,255,255,0.35)',
  },
  {
    id: 'forest',
    name: '森林绿意',
    bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    card: 'rgba(255,255,255,0.15)',
    cardHover: 'rgba(255,255,255,0.25)',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.85)',
    btnBg: 'rgba(255,255,255,0.2)',
    btnHover: 'rgba(255,255,255,0.35)',
  },
  {
    id: 'dark',
    name: '暗夜极简',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    card: 'rgba(255,255,255,0.08)',
    cardHover: 'rgba(255,255,255,0.15)',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.6)',
    btnBg: 'rgba(255,255,255,0.1)',
    btnHover: 'rgba(255,255,255,0.2)',
  },
  {
    id: 'light',
    name: '清新白色',
    bg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    card: 'rgba(255,255,255,0.7)',
    cardHover: 'rgba(255,255,255,0.9)',
    text: '#2d3748',
    subText: '#718096',
    btnBg: 'rgba(255,255,255,0.6)',
    btnHover: 'rgba(255,255,255,0.85)',
  },
]

export { THEMES }

export const useProfileStore = defineStore('profile', () => {
  const data = ref(loadFromStorage())

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem('linkme-profile')
      return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_DATA))
    } catch {
      return JSON.parse(JSON.stringify(DEFAULT_DATA))
    }
  }

  function save() {
    localStorage.setItem('linkme-profile', JSON.stringify(data.value))
  }

  function updateProfile(fields) {
    Object.assign(data.value, fields)
    save()
  }

  function setTheme(theme) {
    data.value.theme = { ...theme }
    save()
  }

  function addLink(link) {
    const id = Date.now()
    data.value.links.push({ id, visible: true, highlight: false, icon: '🔗', desc: '', ...link })
    save()
  }

  function updateLink(id, fields) {
    const idx = data.value.links.findIndex(l => l.id === id)
    if (idx !== -1) {
      Object.assign(data.value.links[idx], fields)
      save()
    }
  }

  function deleteLink(id) {
    data.value.links = data.value.links.filter(l => l.id !== id)
    save()
  }

  function reorderLinks(newLinks) {
    data.value.links = newLinks
    save()
  }

  function addSocial(social) {
    const id = Date.now()
    data.value.socials.push({ id, ...social })
    save()
  }

  function updateSocial(id, fields) {
    const idx = data.value.socials.findIndex(s => s.id === id)
    if (idx !== -1) {
      Object.assign(data.value.socials[idx], fields)
      save()
    }
  }

  function deleteSocial(id) {
    data.value.socials = data.value.socials.filter(s => s.id !== id)
    save()
  }

  function resetToDefault() {
    data.value = JSON.parse(JSON.stringify(DEFAULT_DATA))
    save()
  }

  const visibleLinks = computed(() => data.value.links.filter(l => l.visible))

  return {
    data,
    visibleLinks,
    updateProfile,
    setTheme,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks,
    addSocial,
    updateSocial,
    deleteSocial,
    resetToDefault,
  }
})
