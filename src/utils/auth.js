const TOKEN_KEY = 'linkme-auth'
const HASH_KEY = 'linkme-admin-hash'
const SESSION_HOURS = 8

async function sha256(text) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function isAuthenticated() {
  try {
    const raw = sessionStorage.getItem(TOKEN_KEY)
    if (!raw) return false
    const { token, expires } = JSON.parse(raw)
    return !!(token && Date.now() < expires)
  } catch {
    return false
  }
}

export function hasPasswordSet() {
  return !!localStorage.getItem(HASH_KEY)
}

export async function verifyPassword(password) {
  const stored = localStorage.getItem(HASH_KEY)
  if (!stored) return false
  return (await sha256(password)) === stored
}

export async function setPassword(password) {
  localStorage.setItem(HASH_KEY, await sha256(password))
}

export async function changePassword(oldPassword, newPassword) {
  if (!(await verifyPassword(oldPassword))) return false
  await setPassword(newPassword)
  return true
}

export function login() {
  const token = crypto.randomUUID?.() ?? (Math.random().toString(36).slice(2) + Date.now())
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify({
    token,
    expires: Date.now() + SESSION_HOURS * 3600 * 1000,
  }))
}

export function logout() {
  sessionStorage.removeItem(TOKEN_KEY)
}
