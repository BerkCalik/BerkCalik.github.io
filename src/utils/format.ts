export const formatBytes = (value: number): string => {
  if (value < 1024) {
    return `${value} B`
  }

  const kibibytes = value / 1024
  if (kibibytes < 1024) {
    return `${kibibytes.toFixed(1)} KB`
  }

  return `${(kibibytes / 1024).toFixed(1)} MB`
}

export const formatRelativeDate = (isoDate: string): string => {
  const now = Date.now()
  const target = new Date(isoDate).getTime()
  const diffMs = now - target

  const hour = 60 * 60 * 1000
  const day = 24 * hour

  if (diffMs < hour) {
    return 'just now'
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour)
    return `${hours}h ago`
  }

  if (diffMs < day * 30) {
    const days = Math.floor(diffMs / day)
    return `${days}d ago`
  }

  if (diffMs < day * 365) {
    const months = Math.floor(diffMs / (day * 30))
    return `${months}mo ago`
  }

  const years = Math.floor(diffMs / (day * 365))
  return `${years}y ago`
}

export const startCase = (value: string): string => {
  return value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export const normalizeBaseName = (value: string): string => {
  return value.replace(/\.md$/i, '')
}
