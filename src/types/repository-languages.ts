export type GitHubLanguagesResponse = Record<string, number>

export interface RepositoryLanguageItem {
  name: string
  bytes: number
  percentage: number
  color: string
}
