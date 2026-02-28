import { Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { GITHUB_REPO_CONFIG, GITHUB_URLS } from '../../config/github'

type LoadState = 'loading' | 'success' | 'error'

interface GitHubContributor {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

let cachedContributors: GitHubContributor[] | null = null

const isContributorsPayload = (value: unknown): value is GitHubContributor[] => {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every(
    (item) =>
      item &&
      typeof item === 'object' &&
      typeof (item as GitHubContributor).id === 'number' &&
      typeof (item as GitHubContributor).login === 'string' &&
      typeof (item as GitHubContributor).avatar_url === 'string' &&
      typeof (item as GitHubContributor).html_url === 'string'
  )
}

export const RepositoryContributors = () => {
  const [state, setState] = useState<LoadState>(cachedContributors ? 'success' : 'loading')
  const [contributors, setContributors] = useState<GitHubContributor[]>(cachedContributors ?? [])

  useEffect(() => {
    if (cachedContributors) {
      return
    }

    const controller = new AbortController()

    const fetchContributors = async () => {
      setState('loading')

      try {
        const response = await fetch(GITHUB_URLS.contributorsApi, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch contributors')
        }

        const payload: unknown = await response.json()

        if (!isContributorsPayload(payload)) {
          throw new Error('Invalid contributors response')
        }

        const normalized = payload.slice(0, GITHUB_REPO_CONFIG.contributorsLimit)
        cachedContributors = normalized
        setContributors(normalized)
        setState('success')
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setState('error')
      }
    }

    void fetchContributors()

    return () => {
      controller.abort()
    }
  }, [])

  const visibleContributors = useMemo(
    () => contributors.slice(0, GITHUB_REPO_CONFIG.contributorsLimit),
    [contributors]
  )

  return (
    <section className="border-b border-border-default pb-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-fg-default">
        <Users size={14} className="text-fg-muted" />
        Contributors{' '}
        {state === 'success' && visibleContributors.length > 0 ? visibleContributors.length : ''}
      </div>

      {state === 'loading' ? (
        <p className="text-[13px] text-fg-muted">Loading contributors...</p>
      ) : null}

      {state === 'error' ? (
        <p className="text-[13px] text-fg-muted">Unable to load contributors</p>
      ) : null}

      {state === 'success' ? (
        visibleContributors.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {visibleContributors.map((contributor) => (
              <a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noreferrer"
                title={contributor.login}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="h-7 w-7 rounded-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-fg-muted">No contributors yet</p>
        )
      ) : null}
    </section>
  )
}
