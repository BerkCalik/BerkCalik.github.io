import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RepositoryLayout } from '../layout/RepositoryLayout'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { TabKey } from '../types/content'
import { getFileBySlug, getTabContent, getTabRoute } from '../utils/content-index'
import { isTabKey } from '../utils/tabs'

export const RepositoryPage = () => {
  const { tab: tabParam, fileSlug } = useParams()
  const navigate = useNavigate()

  const invalidTab = tabParam !== undefined && !isTabKey(tabParam)
  const activeTab = (isTabKey(tabParam ?? '') ? tabParam : 'code') as TabKey

  const tabContent = useMemo(() => getTabContent(activeTab), [activeTab])
  const selectedFile = useMemo(() => getFileBySlug(activeTab, fileSlug), [activeTab, fileSlug])

  const [isHistoryOpen, setHistoryOpen] = useState(false)
  const [isRawView, setRawView] = useState(false)

  useEffect(() => {
    if (invalidTab) {
      navigate(getTabRoute('code'), { replace: true })
    }
  }, [invalidTab, navigate])

  useEffect(() => {
    if (!selectedFile && !invalidTab) {
      navigate(getTabRoute(activeTab), { replace: true })
    }
  }, [activeTab, invalidTab, navigate, selectedFile])

  useDocumentMeta(
    selectedFile?.title ?? 'Portfolio',
    selectedFile?.description ?? 'Developer portfolio'
  )

  if (!selectedFile) {
    return null
  }

  return (
    <RepositoryLayout
      activeTab={activeTab}
      files={tabContent.files}
      selectedFile={selectedFile}
      isHistoryOpen={isHistoryOpen}
      isRawView={isRawView}
      onToggleHistory={() => setHistoryOpen((previous) => !previous)}
      onToggleRawView={() => setRawView((previous) => !previous)}
    />
  )
}
