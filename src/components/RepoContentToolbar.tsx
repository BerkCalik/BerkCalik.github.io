import { ChevronDown, Code2, FolderPlus, Search } from 'lucide-react'

interface RepoContentToolbarProps {
  fileCount: number
}

export const RepoContentToolbar = ({ fileCount }: RepoContentToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-border-default bg-canvas-subtle p-2">
      <button
        type="button"
        className="inline-flex h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-default px-2 text-xs text-fg-default transition hover:bg-canvas-inset"
      >
        <Code2 size={12} />
        main
        <ChevronDown size={12} />
      </button>

      <span className="text-xs text-fg-muted">{fileCount} files</span>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-default px-2 text-xs text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default"
        >
          <Search size={12} />
          Go to file
        </button>

        <button
          type="button"
          className="inline-flex h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-default px-2 text-xs text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default"
        >
          <FolderPlus size={12} />
          Add file
          <ChevronDown size={12} />
        </button>

        <button
          type="button"
          className="inline-flex h-7 items-center rounded-md border border-success-emphasis bg-success-emphasis px-2.5 text-xs font-medium text-white transition hover:brightness-110"
        >
          Code
          <ChevronDown size={12} className="ml-1" />
        </button>
      </div>
    </div>
  )
}
