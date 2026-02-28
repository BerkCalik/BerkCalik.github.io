const FALLBACK_LANGUAGE_COLOR = '#8b949e'

export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Swift: '#f05138',
  'Objective-C': '#438eff',
  C: '#555555',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Python: '#3572A5',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Dart: '#00B4AB',
}

export const getLanguageColor = (language: string): string => {
  return GITHUB_LANGUAGE_COLORS[language] ?? FALLBACK_LANGUAGE_COLOR
}
