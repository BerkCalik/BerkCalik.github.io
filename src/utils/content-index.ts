import type { CommitAuthor, CommitItem, ContentFile, ContentTab, TabKey } from '../types/content'
import { formatBytes, normalizeBaseName, startCase } from './format'
import { parseFrontmatter } from './frontmatter'
import { TAB_DEFINITIONS, isTabKey } from './tabs'

interface RepositoryContentIndex {
  tabs: Record<TabKey, ContentTab>
  commitsByTab: Record<TabKey, CommitItem[]>
}

const REPO_OWNER = 'berkcalik'
const REPO_NAME = 'portfolio'

const markdownModules = import.meta.glob<string>('/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const COMMIT_VERBS = ['refactor', 'chore', 'docs', 'feat', 'fix']
const COMMIT_SUFFIXES = [
  'tighten markdown docs',
  'sync with latest portfolio changes',
  'update metadata and details',
  'polish section presentation',
  'improve readability and structure',
]

const AUTHORS: CommitAuthor[] = [
  { name: 'Berk Calik', avatarBg: 'bg-emerald-600' },
  { name: 'Portfolio Bot', avatarBg: 'bg-cyan-600' },
  { name: 'Design Sync', avatarBg: 'bg-indigo-600' },
]

const hashString = (value: string): number => {
  return value.split('').reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7)
}

const toSlug = (value: string): string => {
  return normalizeBaseName(value)
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/\//g, '-')
    .replace(/^-+|-+$/g, '')
}

const parseDate = (rawDate: unknown, fallbackOffset: number): string => {
  if (typeof rawDate === 'string') {
    const parsed = new Date(rawDate)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString()
    }
  }

  const fallback = new Date('2025-12-31T16:00:00.000Z')
  fallback.setDate(fallback.getDate() - fallbackOffset)
  return fallback.toISOString()
}

const buildCommitMessage = (seedValue: string): string => {
  const hash = hashString(seedValue)
  const verb = COMMIT_VERBS[Math.abs(hash) % COMMIT_VERBS.length]
  const suffix = COMMIT_SUFFIXES[Math.abs(hash + 19) % COMMIT_SUFFIXES.length]
  return `${verb}: ${suffix}`
}

const buildTabs = (): Record<TabKey, ContentTab> => {
  return TAB_DEFINITIONS.reduce(
    (accumulator, tab) => {
      accumulator[tab.key] = {
        key: tab.key,
        label: tab.label,
        files: [],
        defaultFile: null,
      }
      return accumulator
    },
    {} as Record<TabKey, ContentTab>
  )
}

const buildCommitsByTab = (tabs: Record<TabKey, ContentTab>): Record<TabKey, CommitItem[]> => {
  return TAB_DEFINITIONS.reduce(
    (accumulator, tabDef) => {
      const files = tabs[tabDef.key].files
      const commits: CommitItem[] = files
        .map((file, index) => {
          const hash = hashString(`${file.id}-${index}`)
          const author = AUTHORS[Math.abs(hash) % AUTHORS.length]
          const date = new Date(file.updatedAt)
          date.setHours(date.getHours() - index * 4)

          return {
            id: `${file.id}-commit-${index + 1}`,
            fileId: file.id,
            message: file.commitMessage,
            date: date.toISOString(),
            author,
          }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      accumulator[tabDef.key] = commits
      return accumulator
    },
    {} as Record<TabKey, CommitItem[]>
  )
}

const buildContentIndex = (): RepositoryContentIndex => {
  const tabs = buildTabs()

  Object.entries(markdownModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([absolutePath, rawMarkdown], index) => {
      const segments = absolutePath.split('/').filter(Boolean)
      const tabSegment = segments[1]
      const relativePath = segments.slice(2).join('/')

      if (!tabSegment || !relativePath || !isTabKey(tabSegment)) {
        return
      }

      const parsed = parseFrontmatter(rawMarkdown)
      const frontmatter = parsed.data
      const name = relativePath.split('/').pop() ?? relativePath
      const normalizedName = normalizeBaseName(name)
      const isReadme = normalizedName.toLowerCase() === 'readme'
      const slug = toSlug(relativePath)
      const title = frontmatter.title ?? startCase(normalizedName)
      const description = frontmatter.description ?? `Portfolio section: ${title}`
      const updatedAt = parseDate(frontmatter.date, index)
      const fileHash = `${tabSegment}/${relativePath}`

      const file: ContentFile = {
        id: fileHash,
        tab: tabSegment,
        absolutePath,
        relativePath,
        name,
        slug,
        routePath: `/${tabSegment}/${isReadme ? 'readme' : slug}`,
        isReadme,
        title,
        description,
        raw: rawMarkdown,
        body: parsed.content.trim(),
        sizeBytes: new TextEncoder().encode(rawMarkdown).length,
        updatedAt,
        commitMessage: buildCommitMessage(fileHash),
      }

      tabs[tabSegment].files.push(file)
    })

  for (const tab of TAB_DEFINITIONS) {
    tabs[tab.key].files.sort((a, b) => {
      if (a.isReadme !== b.isReadme) {
        return a.isReadme ? -1 : 1
      }

      return a.name.localeCompare(b.name)
    })

    tabs[tab.key].defaultFile =
      tabs[tab.key].files.find((file) => file.isReadme) ?? tabs[tab.key].files[0] ?? null
  }

  return {
    tabs,
    commitsByTab: buildCommitsByTab(tabs),
  }
}

export const REPOSITORY_META = {
  owner: REPO_OWNER,
  name: REPO_NAME,
  fullName: `${REPO_OWNER}/${REPO_NAME}`,
  stars: '128',
  watchers: '34',
  forks: '12',
  branch: 'main',
}

export const CONTENT_INDEX = buildContentIndex()

export const getTabContent = (tab: TabKey): ContentTab => {
  return CONTENT_INDEX.tabs[tab]
}

export const getTabRoute = (tab: TabKey): string => {
  return `/${tab}`
}

export const getFileRoute = (tab: TabKey, file: ContentFile): string => {
  return `/${tab}/${file.isReadme ? 'readme' : file.slug}`
}

export const getFileBySlug = (tab: TabKey, slug?: string): ContentFile | null => {
  const tabContent = getTabContent(tab)

  if (!tabContent.defaultFile) {
    return null
  }

  if (!slug) {
    return tabContent.defaultFile
  }

  const normalizedSlug = decodeURIComponent(slug).toLowerCase()

  if (normalizedSlug === 'readme') {
    return tabContent.files.find((file) => file.isReadme) ?? tabContent.defaultFile
  }

  return tabContent.files.find((file) => file.slug === normalizedSlug) ?? null
}

export const getCommitHistory = (tab: TabKey, prioritizedFileId?: string): CommitItem[] => {
  const commits = CONTENT_INDEX.commitsByTab[tab]

  if (!prioritizedFileId) {
    return commits
  }

  return [...commits].sort((a, b) => {
    const aScore = a.fileId === prioritizedFileId ? 1 : 0
    const bScore = b.fileId === prioritizedFileId ? 1 : 0

    if (aScore !== bScore) {
      return bScore - aScore
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export const getFileSizeLabel = (file: ContentFile): string => {
  return formatBytes(file.sizeBytes)
}
