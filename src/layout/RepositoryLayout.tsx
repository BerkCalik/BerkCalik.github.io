import type { CommitItem, ContentFile, TabKey } from '../types/content'
import { CommitHistoryPanel } from '../components/CommitHistoryPanel'
import { FileTreePanel } from '../components/FileTreePanel'
import { MarkdownViewer } from '../components/MarkdownViewer'
import { RepoContentToolbar } from '../components/RepoContentToolbar'
import { RepositorySidebar } from '../components/RepositorySidebar'
import { RepoTopBar } from '../components/RepoTopBar'

interface RepositoryLayoutProps {
  activeTab: TabKey
  files: ContentFile[]
  selectedFile: ContentFile
  commits: CommitItem[]
  isHistoryOpen: boolean
  isRawView: boolean
  onToggleHistory: () => void
  onToggleRawView: () => void
}

export const RepositoryLayout = ({
  activeTab,
  files,
  selectedFile,
  commits,
  isHistoryOpen,
  isRawView,
  onToggleHistory,
  onToggleRawView,
}: RepositoryLayoutProps) => {
  return (
    <div className="min-h-full bg-canvas-default text-fg-default">
      <RepoTopBar historyOpen={isHistoryOpen} onToggleHistory={onToggleHistory} />

      <main className="mx-auto w-full max-w-[1280px] px-4 py-4">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_296px] xl:items-start xl:gap-8">
          <section className="min-w-0 space-y-4">
            <RepoContentToolbar fileCount={files.length} />

            <FileTreePanel activeTab={activeTab} files={files} selectedFileId={selectedFile.id} />

            <MarkdownViewer
              file={selectedFile}
              isRawView={isRawView}
              onToggleRawView={onToggleRawView}
            />
          </section>

          <RepositorySidebar />
        </div>
      </main>

      <footer className="mx-auto w-full max-w-[1280px] px-4 py-6 text-center text-xs text-fg-muted">
        <p>Static portfolio repository interface built with React + TypeScript + TailwindCSS.</p>
      </footer>

      <CommitHistoryPanel commits={commits} isOpen={isHistoryOpen} onToggle={onToggleHistory} />
    </div>
  )
}
