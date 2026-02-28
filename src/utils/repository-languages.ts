import type { GitHubLanguagesResponse, RepositoryLanguageItem } from '../types/repository-languages'
import { getLanguageColor } from './language-colors'

const roundOneDecimal = (value: number): number => {
  return Math.round(value * 10) / 10
}

export const calculateLanguagePercentages = (
  data: GitHubLanguagesResponse
): RepositoryLanguageItem[] => {
  const entries = Object.entries(data)
    .filter(([, bytes]) => Number.isFinite(bytes) && bytes > 0)
    .sort(([, a], [, b]) => b - a)

  const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0)

  if (!Number.isFinite(totalBytes) || totalBytes <= 0) {
    return []
  }

  const base = entries
    .map(([name, bytes]) => {
      const rawPercentage = (bytes / totalBytes) * 100
      const percentage = roundOneDecimal(rawPercentage)

      if (!Number.isFinite(percentage) || percentage <= 0) {
        return null
      }

      return {
        name,
        bytes,
        percentage,
        color: getLanguageColor(name),
      }
    })
    .filter((item): item is RepositoryLanguageItem => item !== null)

  const roundedTotal = roundOneDecimal(base.reduce((sum, item) => sum + item.percentage, 0))
  const delta = roundOneDecimal(100 - roundedTotal)

  if (base.length > 0 && delta !== 0) {
    base[0] = {
      ...base[0],
      percentage: roundOneDecimal(base[0].percentage + delta),
    }
  }

  return base
}
