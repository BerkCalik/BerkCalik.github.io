export type TabKey = 'code' | 'about' | 'projects' | 'skills' | 'contact'

export interface FrontmatterData {
  title?: string
  description?: string
  date?: string
}

export interface ContentFile {
  id: string
  tab: TabKey
  absolutePath: string
  relativePath: string
  name: string
  slug: string
  routePath: string
  isReadme: boolean
  title: string
  description: string
  raw: string
  body: string
  sizeBytes: number
  updatedAt: string
  commitMessage: string
}

export interface ContentTab {
  key: TabKey
  label: string
  files: ContentFile[]
  defaultFile: ContentFile | null
}

export interface CommitAuthor {
  name: string
  avatarBg: string
}

export interface CommitItem {
  id: string
  fileId: string
  message: string
  date: string
  author: CommitAuthor
}
