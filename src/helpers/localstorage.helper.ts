export function getTokenFromLocalStorage(key: string) {
  const data = localStorage.getItem(key)
  const token = data ? JSON.parse(data) : ''

  return token
}

export function setTokenToLocalStorage(key: string, token: string) {
  localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string) {
  localStorage.removeItem(key)
}
