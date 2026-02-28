import { Box, Info, Tag } from 'lucide-react'
import { REPOSITORY_META } from '../utils/content-index'
import { RepositoryContributors } from './repository/RepositoryContributors'
import { RepositoryLanguages } from './repository/RepositoryLanguages'

export const RepositorySidebar = () => {
  return (
    <aside className="mt-4 xl:mt-0">
      <div className="space-y-4 xl:sticky xl:top-4">
        <section className="border-b border-border-default pb-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-fg-default">
            <Info size={14} className="text-fg-muted" />
            About
          </div>
          <p className="text-[13px] leading-5 text-fg-muted">
            Static developer portfolio repository with GitHub-like code navigation and markdown
            documents.
          </p>
          <p className="mt-2 text-[12px] text-fg-muted">
            Repository: <span className="text-fg-default">{REPOSITORY_META.fullName}</span>
          </p>
        </section>

        <RepositoryLanguages />

        <section className="border-b border-border-default pb-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-fg-default">
            <Tag size={14} className="text-fg-muted" />
            Releases
          </div>
          <p className="text-[13px] text-fg-muted">No releases published</p>
        </section>

        <section className="border-b border-border-default pb-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-fg-default">
            <Box size={14} className="text-fg-muted" />
            Packages
          </div>
          <p className="text-[13px] text-fg-muted">No packages published</p>
        </section>

        <RepositoryContributors />
      </div>
    </aside>
  )
}
