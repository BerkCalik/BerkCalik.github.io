import { isValidElement, type ReactNode } from 'react'

export const extractPlainText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map((item) => extractPlainText(item)).join('')
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractPlainText(node.props.children)
  }

  return ''
}
