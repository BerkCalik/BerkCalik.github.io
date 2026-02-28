export const GITHUB_REPO_CONFIG = {
  owner: 'BerkCalik',
  repo: 'RealTimeCaptionsTranslateMacOS',
  commitsPerPage: 5,
  contributorsLimit: 6,
} as const

const repoPath = `${GITHUB_REPO_CONFIG.owner}/${GITHUB_REPO_CONFIG.repo}`

export const GITHUB_URLS = {
  repo: `https://github.com/${repoPath}`,
  commitBase: `https://github.com/${repoPath}/commit`,
  languagesApi: `https://api.github.com/repos/${repoPath}/languages`,
  commitsApi: `https://api.github.com/repos/${repoPath}/commits?per_page=${GITHUB_REPO_CONFIG.commitsPerPage}`,
  contributorsApi: `https://api.github.com/repos/${repoPath}/contributors?per_page=${GITHUB_REPO_CONFIG.contributorsLimit}`,
} as const
