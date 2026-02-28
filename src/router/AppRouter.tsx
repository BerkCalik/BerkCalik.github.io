import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RepositoryPage } from '../pages/RepositoryPage'

const resolveBasename = () => {
  const base = import.meta.env.BASE_URL ?? '/'
  if (base === '/') {
    return undefined
  }

  return base.endsWith('/') ? base.slice(0, -1) : base
}

export const AppRouter = () => {
  return (
    <BrowserRouter basename={resolveBasename()}>
      <Routes>
        <Route path="/" element={<Navigate to="/code" replace />} />
        <Route path="/:tab" element={<RepositoryPage />} />
        <Route path="/:tab/:fileSlug" element={<RepositoryPage />} />
        <Route path="*" element={<Navigate to="/code" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
