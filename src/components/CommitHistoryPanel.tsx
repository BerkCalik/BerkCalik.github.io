import clsx from 'clsx'
import { Clock3, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { GITHUB_REPO_CONFIG, GITHUB_URLS } from '../config/github'

const COMMITS_API_URL = GITHUB_URLS.commitsApi
const COMMIT_BASE_URL = GITHUB_URLS.commitBase

type LoadState = 'loading' | 'success' | 'error'

interface GitHubCommitItem {
  sha: string
  commit: {
    message: string
    author: {
      date: string
      name: string
    }
  }
  author: {
    avatar_url: string
  } | null
}

interface CommitHistoryItem {
  sha: string
  message: string
  date: string
  authorName: string
  authorAvatarUrl: string | null
}

let cachedCommits: CommitHistoryItem[] | null = null

const isCommitPayload = (value: unknown): value is GitHubCommitItem[] => {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every(
    (item) =>
      item &&
      typeof item === 'object' &&
      typeof (item as GitHubCommitItem).sha === 'string' &&
      typeof (item as GitHubCommitItem).commit?.message === 'string' &&
      typeof (item as GitHubCommitItem).commit?.author?.date === 'string' &&
      typeof (item as GitHubCommitItem).commit?.author?.name === 'string'
  )
}

const normalizeCommits = (payload: GitHubCommitItem[]): CommitHistoryItem[] => {
  return payload.slice(0, GITHUB_REPO_CONFIG.commitsPerPage).map((item) => ({
    sha: item.sha,
    message: item.commit.message.split('\n')[0].trim(),
    date: item.commit.author.date,
    authorName: item.commit.author.name,
    authorAvatarUrl: item.author?.avatar_url ?? null,
  }))
}

const formatRelativeTime = (isoDate: string): string => {
  const now = Date.now()
  const target = new Date(isoDate).getTime()

  if (!Number.isFinite(target)) {
    return 'recently'
  }

  const diff = target - now

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 365 * day

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'always' })

  if (Math.abs(diff) < hour) {
    return formatter.format(Math.round(diff / minute), 'minute')
  }

  if (Math.abs(diff) < day) {
    return formatter.format(Math.round(diff / hour), 'hour')
  }

  if (Math.abs(diff) < month) {
    return formatter.format(Math.round(diff / day), 'day')
  }

  if (Math.abs(diff) < year) {
    return formatter.format(Math.round(diff / month), 'month')
  }

  return formatter.format(Math.round(diff / year), 'year')
}

const buildInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface CommitHistoryPanelProps {
  isOpen: boolean
  onToggle: () => void
}

export const CommitHistoryPanel = ({ isOpen, onToggle }: CommitHistoryPanelProps) => {
  const [state, setState] = useState<LoadState>(cachedCommits ? 'success' : 'loading')
  const [commits, setCommits] = useState<CommitHistoryItem[]>(cachedCommits ?? [])

  useEffect(() => {
    if (cachedCommits) {
      return
    }

    const controller = new AbortController()

    const fetchCommits = async () => {
      setState('loading')

      try {
        const response = await fetch(COMMITS_API_URL, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch commits')
        }

        const payload: unknown = await response.json()

        if (!isCommitPayload(payload)) {
          throw new Error('Invalid commits response')
        }

        const normalized = normalizeCommits(payload)
        cachedCommits = normalized
        setCommits(normalized)
        setState('success')
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setState('error')
      }
    }

    void fetchCommits()

    return () => {
      controller.abort()
    }
  }, [])

  const renderedCommits = useMemo(
    () => commits.slice(0, GITHUB_REPO_CONFIG.commitsPerPage),
    [commits]
  )

  return (
    <div
      className={clsx('fixed inset-0 z-50', isOpen ? 'pointer-events-auto' : 'pointer-events-none')}
    >
      <button
        type="button"
        onClick={onToggle}
        className={clsx(
          'absolute inset-0 bg-black/45 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        aria-label="Close commit history"
      />

      <aside
        className={clsx(
          'absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border-default bg-canvas-default shadow-2xl transition-transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-border-default px-3 py-2">
          <p className="text-sm font-medium text-fg-default">Commit history</p>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border-default text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default"
            aria-label="Close history panel"
          >
            <X size={14} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {state === 'loading' ? (
            <p className="px-3 py-3 text-[13px] text-fg-muted">Loading commits...</p>
          ) : null}

          {state === 'error' ? (
            <p className="px-3 py-3 text-[13px] text-fg-muted">Unable to load commits</p>
          ) : null}

          {state === 'success' ? (
            renderedCommits.length > 0 ? (
              <ul>
                {renderedCommits.map((commit) => (
                  <li key={commit.sha} className="border-b border-border-muted px-3 py-2.5">
                    <div className="flex items-start gap-2">
                      {commit.authorAvatarUrl ? (
                        <img
                          src={commit.authorAvatarUrl}
                          alt={commit.authorName}
                          className="mt-0.5 h-6 w-6 shrink-0 rounded-full"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-canvas-inset text-[10px] font-semibold text-fg-muted">
                          {buildInitials(commit.authorName)}
                        </span>
                      )}

                      <div className="min-w-0 flex-1">
                        <a
                          href={`${COMMIT_BASE_URL}/${commit.sha}`}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate text-[13px] text-fg-default hover:underline"
                          title={commit.message}
                        >
                          {commit.message}
                        </a>
                        <p className="mt-0.5 text-[11px] text-fg-muted">{commit.authorName}</p>
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-fg-muted">
                          <Clock3 size={11} />
                          <span>{formatRelativeTime(commit.date)}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-3 text-[13px] text-fg-muted">Unable to load commits</p>
            )
          ) : null}
        </div>
      </aside>
    </div>
  )
}
