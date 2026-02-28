import clsx from 'clsx'
import {
  Bell,
  BookOpen,
  ChevronDown,
  CircleDot,
  Eye,
  GitFork,
  History,
  Search,
  Star,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { REPOSITORY_META, getTabRoute } from '../utils/content-index'
import { TAB_DEFINITIONS } from '../utils/tabs'

interface RepoTopBarProps {
  historyOpen: boolean
  onToggleHistory: () => void
}

const TAB_CLASS = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'animate-underline inline-flex h-11 items-center border-b-2 border-transparent px-2 text-sm text-fg-muted transition-colors hover:text-fg-default',
    isActive && 'animate-underline-active border-orange-500 text-fg-default'
  )

export const RepoTopBar = ({ historyOpen, onToggleHistory }: RepoTopBarProps) => {
  return (
    <header className="border-b border-border-default bg-canvas-default">
      <div className="border-b border-border-default bg-canvas-inset">
        <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center gap-3 px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-canvas-subtle text-fg-default">
            <BookOpen size={15} />
          </div>

          <div className="hidden h-8 min-w-0 flex-1 items-center gap-2 rounded-md border border-border-default bg-canvas-subtle px-2.5 md:flex">
            <Search size={13} className="text-fg-muted" />
            <span className="truncate text-xs text-fg-muted">Search or jump to...</span>
          </div>

          <div className="ml-auto flex items-center gap-2 text-fg-muted">
            <Bell size={15} />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-2 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <CircleDot size={14} className="text-fg-muted" />
          <span className="truncate text-fg-accent">{REPOSITORY_META.owner}</span>
          <span className="text-fg-muted">/</span>
          <span className="truncate font-semibold text-fg-accent">{REPOSITORY_META.name}</span>
          <span className="rounded-full border border-border-default px-2 py-0.5 text-[11px] text-fg-muted">
            Public
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleHistory}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-subtle px-2 text-xs text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default"
          >
            <History size={12} />
            {historyOpen ? 'Hide' : 'History'}
          </button>

          <button
            type="button"
            className="hidden h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-subtle px-2 text-xs text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default sm:inline-flex"
          >
            <Eye size={12} />
            Watch
            <span className="ml-1 rounded-full bg-canvas-default px-1.5 py-0.5 text-[10px]">
              {REPOSITORY_META.watchers}
            </span>
          </button>

          <button
            type="button"
            className="hidden h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-subtle px-2 text-xs text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default sm:inline-flex"
          >
            <GitFork size={12} />
            Fork
            <span className="ml-1 rounded-full bg-canvas-default px-1.5 py-0.5 text-[10px]">
              {REPOSITORY_META.forks}
            </span>
          </button>

          <button
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-subtle px-2 text-xs text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default"
          >
            <Star size={12} />
            Star
            <span className="ml-1 rounded-full bg-canvas-default px-1.5 py-0.5 text-[10px]">
              {REPOSITORY_META.stars}
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4">
        <nav className="flex items-center gap-4 overflow-x-auto">
          {TAB_DEFINITIONS.map((tab) => (
            <NavLink key={tab.key} to={getTabRoute(tab.key)} className={TAB_CLASS}>
              {tab.label}
            </NavLink>
          ))}

          <button
            type="button"
            className="inline-flex h-11 items-center gap-1 border-b-2 border-transparent px-2 text-sm text-fg-muted"
          >
            <span>More</span>
            <ChevronDown size={12} />
          </button>
        </nav>
      </div>
    </header>
  )
}
