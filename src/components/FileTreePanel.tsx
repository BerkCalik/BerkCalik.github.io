import clsx from 'clsx'
import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ContentFile, TabKey } from '../types/content'
import { formatRelativeDate } from '../utils/format'
import { getFileRoute } from '../utils/content-index'

interface FileTreePanelProps {
  activeTab: TabKey
  files: ContentFile[]
  selectedFileId: string
}

export const FileTreePanel = ({ activeTab, files, selectedFileId }: FileTreePanelProps) => {
  return (
    <section className="overflow-hidden rounded-md border border-border-default bg-canvas-subtle">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_96px] border-b border-border-default bg-canvas-default px-3 py-2 text-xs text-fg-muted">
        <span>Name</span>
        <span className="hidden sm:block">Last commit</span>
        <span className="text-right">Updated</span>
      </div>

      <ul>
        {files.map((file) => {
          const isActive = file.id === selectedFileId

          return (
            <li key={file.id} className="border-b border-border-muted last:border-b-0">
              <Link
                to={getFileRoute(activeTab, file)}
                className={clsx(
                  'grid min-h-10 grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_96px] items-center gap-3 px-3 py-2 text-sm transition-colors',
                  isActive ? 'bg-accent-muted/30' : 'hover:bg-canvas-inset/60'
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <FileText size={15} className="shrink-0 text-fg-muted" />
                  <span className="truncate text-[13px] font-medium text-fg-accent">
                    {file.name}
                  </span>
                </div>

                <span className="hidden truncate text-[12px] text-fg-muted sm:block">
                  {file.commitMessage}
                </span>

                <span className="text-right text-[12px] text-fg-muted">
                  {formatRelativeDate(file.updatedAt)}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
