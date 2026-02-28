import { useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import clsx from 'clsx'
import { extractPlainText } from '../utils/markdown'

interface MarkdownCodeBlockProps {
  inline?: boolean
  className?: string
  children: ReactNode
}

export const MarkdownCodeBlock = ({
  inline = false,
  className,
  children,
}: MarkdownCodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const codeText = useMemo(() => {
    return extractPlainText(children).replace(/\n$/, '')
  }, [children])

  if (inline) {
    return (
      <code
        className={clsx(className, 'rounded bg-[#161b22] px-1.5 py-0.5 text-[85%] text-[#c9d1d9]')}
      >
        {children}
      </code>
    )
  }

  const match = /language-(\w+)/.exec(className || '')
  const language = match?.[1] || 'text'

  const copyCodeText = async (text: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    const copiedWithFallback = document.execCommand('copy')
    document.body.removeChild(textArea)

    return copiedWithFallback
  }

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!codeText) {
      return
    }

    const didCopy = await copyCodeText(codeText)
    if (didCopy) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="not-prose group relative">
      <div className="absolute right-2 top-2 z-10">
        <button
          type="button"
          onClick={handleCopy}
          onMouseDown={(event) => event.preventDefault()}
          className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 text-[11px] text-[#c9d1d9] opacity-90 transition group-hover:opacity-100 hover:bg-[#30363d]"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : language}
        </button>
      </div>

      <pre className="overflow-x-auto rounded border border-[#30363d] bg-[#161b22] p-4">
        <code className={clsx('hljs block text-[12px] leading-5 text-[#c9d1d9]', className)}>
          {children}
        </code>
      </pre>
    </div>
  )
}
