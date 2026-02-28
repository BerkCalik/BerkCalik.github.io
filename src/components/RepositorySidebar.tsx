import { Box, Info, Tag, Users } from 'lucide-react'
import { CONTENT_INDEX, REPOSITORY_META } from '../utils/content-index'
import { RepositoryLanguages } from './repository/RepositoryLanguages'

const buildContributorInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const ALL_COMMITS = Object.values(CONTENT_INDEX.commitsByTab).flat()

export const RepositorySidebar = () => {
  const contributors = Array.from(
    new Map(ALL_COMMITS.map((commit) => [commit.author.name, commit.author])).values()
  ).slice(0, 6)

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

        <section className="border-b border-border-default pb-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-fg-default">
            <Users size={14} className="text-fg-muted" />
            Contributors {contributors.length > 0 ? contributors.length : ''}
          </div>

          {contributors.length === 0 ? (
            <p className="text-[13px] text-fg-muted">No contributors yet</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {contributors.map((author) => (
                <span
                  key={author.name}
                  title={author.name}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                >
                  <span
                    className={`${author.avatarBg} inline-flex h-7 w-7 items-center justify-center rounded-full`}
                  >
                    {buildContributorInitials(author.name)}
                  </span>
                </span>
              ))}
            </div>
          )}
        </section>
      </div>
    </aside>
  )
}
