import clsx from 'clsx'
import { Clock3, X } from 'lucide-react'
import type { CommitItem } from '../types/content'
import { formatRelativeDate } from '../utils/format'

interface CommitHistoryPanelProps {
  commits: CommitItem[]
  isOpen: boolean
  onToggle: () => void
}

export const CommitHistoryPanel = ({ commits, isOpen, onToggle }: CommitHistoryPanelProps) => {
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

        <ul className="min-h-0 flex-1 overflow-y-auto">
          {commits.map((commit) => (
            <li key={commit.id} className="border-b border-border-muted px-3 py-2.5">
              <div className="flex items-start gap-2">
                <span
                  className={clsx(
                    'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white',
                    commit.author.avatarBg
                  )}
                >
                  {commit.author.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-fg-default">{commit.message}</p>
                  <p className="mt-0.5 text-[11px] text-fg-muted">{commit.author.name}</p>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-fg-muted">
                    <Clock3 size={11} />
                    <span>{formatRelativeDate(commit.date)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
