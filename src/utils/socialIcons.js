import {
  siAlipay, siBaidu, siBilibili, siDouban, siKuaishou,
  siNeteasecloudmusic, siQq, siSinaweibo, siTiktok,
  siWechat, siXiaohongshu, siZhihu,
  siDiscord, siFacebook, siGithub, siInstagram,
  siLine, siPinterest, siReddit, siTelegram,
  siTwitch, siX, siYoutube,
  siBehance, siDevdotto, siDribbble, siFigma,
  siHashnode, siMedium, siNotion, siSubstack,
  siKofi, siPatreon, siPaypal,
  siEtsy, siShopify,
  siNetflix, siPlaystation, siSpotify, siSteam,
  siWordpress, siZoom, siApple, siAppstore, siGoogleplay,
} from 'simple-icons'

const FALLBACK_PATH = 'M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z'
const EMAIL_PATH = 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
const PHONE_PATH = 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'
const LINKEDIN_PATH = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

function svgPath(siIcon) {
  return siIcon ? siIcon.path : FALLBACK_PATH
}

// icon path map keyed by platform type
const ICON_PATHS = {
  // 国内平台
  wechat: svgPath(siWechat),
  qq: svgPath(siQq),
  weibo: svgPath(siSinaweibo),
  bilibili: svgPath(siBilibili),
  douyin: svgPath(siTiktok),
  xiaohongshu: svgPath(siXiaohongshu),
  zhihu: svgPath(siZhihu),
  kuaishou: svgPath(siKuaishou),
  douban: svgPath(siDouban),
  neteasemusic: svgPath(siNeteasecloudmusic),
  alipay: svgPath(siAlipay),
  baidu: svgPath(siBaidu),
  // 国际社交
  x: svgPath(siX),
  instagram: svgPath(siInstagram),
  facebook: svgPath(siFacebook),
  youtube: svgPath(siYoutube),
  pinterest: svgPath(siPinterest),
  reddit: svgPath(siReddit),
  tiktok: svgPath(siTiktok),
  // 通讯
  telegram: svgPath(siTelegram),
  discord: svgPath(siDiscord),
  line: svgPath(siLine),
  // 技术/创作
  github: svgPath(siGithub),
  devto: svgPath(siDevdotto),
  medium: svgPath(siMedium),
  hashnode: svgPath(siHashnode),
  substack: svgPath(siSubstack),
  dribbble: svgPath(siDribbble),
  behance: svgPath(siBehance),
  figma: svgPath(siFigma),
  notion: svgPath(siNotion),
  wordpress: svgPath(siWordpress),
  // 娱乐
  spotify: svgPath(siSpotify),
  steam: svgPath(siSteam),
  netflix: svgPath(siNetflix),
  playstation: svgPath(siPlaystation),
  twitch: svgPath(siTwitch),
  // 支付/商业
  paypal: svgPath(siPaypal),
  kofi: svgPath(siKofi),
  patreon: svgPath(siPatreon),
  shopify: svgPath(siShopify),
  etsy: svgPath(siEtsy),
  // 其他工具
  apple: svgPath(siApple),
  googleplay: svgPath(siGoogleplay),
  appstore: svgPath(siAppstore),
  zoom: svgPath(siZoom),
  linkedin: LINKEDIN_PATH,
  // 通用
  email: EMAIL_PATH,
  phone: PHONE_PATH,
  link: FALLBACK_PATH,
}

export function getIconPath(type) {
  return ICON_PATHS[type] || FALLBACK_PATH
}

export function renderIcon(type, size = 20) {
  const path = getIconPath(type)
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="${size}" height="${size}"><path d="${path}"/></svg>`
}

// 平台分组配置（用于 Admin 选择器）
export const SOCIAL_PLATFORM_GROUPS = [
  {
    group: '国内平台',
    platforms: [
      { type: 'wechat', label: '微信' },
      { type: 'qq', label: 'QQ' },
      { type: 'weibo', label: '微博' },
      { type: 'bilibili', label: 'B站' },
      { type: 'douyin', label: '抖音' },
      { type: 'xiaohongshu', label: '小红书' },
      { type: 'zhihu', label: '知乎' },
      { type: 'kuaishou', label: '快手' },
      { type: 'douban', label: '豆瓣' },
      { type: 'neteasemusic', label: '网易云音乐' },
      { type: 'alipay', label: '支付宝' },
      { type: 'baidu', label: '百度' },
    ],
  },
  {
    group: '国际社交',
    platforms: [
      { type: 'x', label: 'X（推特）' },
      { type: 'instagram', label: 'Instagram' },
      { type: 'facebook', label: 'Facebook' },
      { type: 'youtube', label: 'YouTube' },
      { type: 'tiktok', label: 'TikTok' },
      { type: 'pinterest', label: 'Pinterest' },
      { type: 'reddit', label: 'Reddit' },
      { type: 'linkedin', label: 'LinkedIn' },
    ],
  },
  {
    group: '通讯',
    platforms: [
      { type: 'telegram', label: 'Telegram' },
      { type: 'discord', label: 'Discord' },
      { type: 'line', label: 'LINE' },
    ],
  },
  {
    group: '技术 / 创作',
    platforms: [
      { type: 'github', label: 'GitHub' },
      { type: 'medium', label: 'Medium' },
      { type: 'substack', label: 'Substack' },
      { type: 'devto', label: 'dev.to' },
      { type: 'hashnode', label: 'Hashnode' },
      { type: 'dribbble', label: 'Dribbble' },
      { type: 'behance', label: 'Behance' },
      { type: 'figma', label: 'Figma' },
      { type: 'notion', label: 'Notion' },
      { type: 'wordpress', label: 'WordPress' },
    ],
  },
  {
    group: '娱乐',
    platforms: [
      { type: 'spotify', label: 'Spotify' },
      { type: 'steam', label: 'Steam' },
      { type: 'netflix', label: 'Netflix' },
      { type: 'twitch', label: 'Twitch' },
      { type: 'playstation', label: 'PlayStation' },
    ],
  },
  {
    group: '支付 / 商业',
    platforms: [
      { type: 'paypal', label: 'PayPal' },
      { type: 'kofi', label: 'Ko-fi' },
      { type: 'patreon', label: 'Patreon' },
      { type: 'shopify', label: 'Shopify' },
      { type: 'etsy', label: 'Etsy' },
    ],
  },
  {
    group: '其他',
    platforms: [
      { type: 'email', label: '邮箱' },
      { type: 'phone', label: '电话' },
      { type: 'zoom', label: 'Zoom' },
      { type: 'apple', label: 'App Store' },
      { type: 'googleplay', label: 'Google Play' },
      { type: 'link', label: '其他链接' },
    ],
  },
]

// 扁平化所有平台（用于查找 label）
export const ALL_PLATFORMS = SOCIAL_PLATFORM_GROUPS.flatMap(g => g.platforms)
