import type { ReactNode } from 'react'
import GithubSlugger from 'github-slugger'
import { Eye, FileText } from 'lucide-react'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import type { ContentFile } from '../types/content'
import { MarkdownCodeBlock } from './MarkdownCodeBlock'
import { extractPlainText } from '../utils/markdown'
import 'highlight.js/styles/github-dark.css'

interface MarkdownViewerProps {
  file: ContentFile
  isRawView: boolean
  onToggleRawView: () => void
}

interface MarkdownCodeProps {
  inline?: boolean
  className?: string
  children?: ReactNode
}

const createHeadingRenderer = (
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  slugger: GithubSlugger
): Components['h1'] => {
  return ({ children, ...props }) => {
    const title = extractPlainText(children)
    const slug = slugger.slug(title)
    const HeadingTag = tag

    return (
      <HeadingTag {...props} id={slug} className="group scroll-mt-24">
        {children}
        <a href={`#${slug}`} className="markdown-heading-anchor" aria-label={`Anchor for ${title}`}>
          #
        </a>
      </HeadingTag>
    )
  }
}

export const MarkdownViewer = ({ file, isRawView, onToggleRawView }: MarkdownViewerProps) => {
  const slugger = new GithubSlugger()

  const components: Components = {
    h1: createHeadingRenderer('h1', slugger),
    h2: createHeadingRenderer('h2', slugger),
    h3: createHeadingRenderer('h3', slugger),
    h4: createHeadingRenderer('h4', slugger),
    h5: createHeadingRenderer('h5', slugger),
    h6: createHeadingRenderer('h6', slugger),
    code: (props) => {
      const { className, children, inline } = props as MarkdownCodeProps
      return (
        <MarkdownCodeBlock inline={inline} className={className}>
          {children}
        </MarkdownCodeBlock>
      )
    },
  }

  return (
    <section className="overflow-hidden rounded-md border border-border-default bg-canvas-subtle">
      <div className="flex items-center justify-between gap-2 border-b border-border-default px-3 py-2">
        <div className="flex items-center gap-2 text-sm text-fg-default">
          <FileText size={14} className="text-fg-muted" />
          <span className="text-[13px] font-medium">{file.name}</span>
        </div>

        <button
          type="button"
          onClick={onToggleRawView}
          className="inline-flex h-7 items-center gap-1 rounded-md border border-border-default bg-canvas-default px-2 text-xs text-fg-muted transition hover:bg-canvas-inset hover:text-fg-default"
        >
          <Eye size={12} />
          {isRawView ? 'Rendered' : 'Raw'}
        </button>
      </div>

      <div className="markdown-fade p-4">
        {isRawView ? (
          <pre className="overflow-x-auto rounded-md border border-border-default bg-canvas-inset p-3 text-xs text-fg-default">
            <code>{file.raw}</code>
          </pre>
        ) : (
          <article key={file.id} className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={components}
            >
              {file.body}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </section>
  )
}
