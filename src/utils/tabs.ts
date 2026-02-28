import type { TabKey } from '../types/content'

export interface TabDefinition {
  key: TabKey
  label: string
  description: string
}

export const TAB_DEFINITIONS: TabDefinition[] = [
  { key: 'code', label: 'Code', description: 'Source snapshots and patterns' },
  { key: 'about', label: 'About', description: 'Developer profile' },
  { key: 'projects', label: 'Projects', description: 'Selected build case studies' },
  { key: 'skills', label: 'Skills', description: 'Capabilities and tooling' },
  { key: 'contact', label: 'Contact', description: 'Ways to connect' },
]

const TAB_KEYS = new Set<TabKey>(TAB_DEFINITIONS.map((tab) => tab.key))

export const isTabKey = (value: string): value is TabKey => {
  return TAB_KEYS.has(value as TabKey)
}

export const getTabLabel = (tab: TabKey): string => {
  return TAB_DEFINITIONS.find((item) => item.key === tab)?.label ?? tab
}
