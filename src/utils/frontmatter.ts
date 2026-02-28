import type { FrontmatterData } from '../types/content'

interface FrontmatterParseResult {
  data: FrontmatterData
  content: string
}

const FRONTMATTER_SEPARATOR = '---'

const normalizeKey = (value: string): keyof FrontmatterData | null => {
  const key = value.trim().toLowerCase()

  if (key === 'title' || key === 'description' || key === 'date') {
    return key
  }

  return null
}

export const parseFrontmatter = (raw: string): FrontmatterParseResult => {
  if (!raw.startsWith(`${FRONTMATTER_SEPARATOR}\n`)) {
    return {
      data: {},
      content: raw.trim(),
    }
  }

  const closingMarkerIndex = raw.indexOf(
    `\n${FRONTMATTER_SEPARATOR}\n`,
    FRONTMATTER_SEPARATOR.length + 1
  )

  if (closingMarkerIndex === -1) {
    return {
      data: {},
      content: raw.trim(),
    }
  }

  const frontmatterBlock = raw
    .slice(FRONTMATTER_SEPARATOR.length + 1, closingMarkerIndex)
    .split('\n')
    .filter(Boolean)

  const data: FrontmatterData = {}

  for (const line of frontmatterBlock) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = normalizeKey(line.slice(0, separatorIndex))
    if (!key) {
      continue
    }

    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')

    if (value) {
      data[key] = value
    }
  }

  return {
    data,
    content: raw.slice(closingMarkerIndex + `\n${FRONTMATTER_SEPARATOR}\n`.length).trim(),
  }
}
