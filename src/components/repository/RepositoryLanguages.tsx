import { CircleDot } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { GitHubLanguagesResponse } from '../../types/repository-languages'
import { calculateLanguagePercentages } from '../../utils/repository-languages'

const LANGUAGES_API_URL =
  'https://api.github.com/repos/BerkCalik/Heartstone-Mobile/languages'

let cachedLanguages: GitHubLanguagesResponse | null = null

type LoadState = 'loading' | 'success' | 'error'

const isLanguageResponse = (value: unknown): value is GitHubLanguagesResponse => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return Object.values(value).every((entry) => typeof entry === 'number')
}

export const RepositoryLanguages = () => {
  const [state, setState] = useState<LoadState>(cachedLanguages ? 'success' : 'loading')
  const [data, setData] = useState<GitHubLanguagesResponse>(cachedLanguages ?? {})

  useEffect(() => {
    if (cachedLanguages) {
      return
    }

    const controller = new AbortController()

    const fetchLanguages = async () => {
      setState('loading')

      try {
        const response = await fetch(LANGUAGES_API_URL, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch languages')
        }

        const payload: unknown = await response.json()

        if (!isLanguageResponse(payload)) {
          throw new Error('Invalid language response')
        }

        cachedLanguages = payload
        setData(payload)
        setState('success')
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setState('error')
      }
    }

    void fetchLanguages()

    return () => {
      controller.abort()
    }
  }, [])

  const languageItems = useMemo(() => calculateLanguagePercentages(data), [data])
  const progressSegments = useMemo(
    () =>
      languageItems.filter(
        (language) =>
          Number.isFinite(language.percentage) &&
          typeof language.percentage === 'number' &&
          language.percentage > 0
      ),
    [languageItems]
  )

  useEffect(() => {
    if (state === 'success') {
      console.log(
        'Repository languages:',
        progressSegments.map((language) => ({
          name: language.name,
          bytes: language.bytes,
          percentage: language.percentage,
        }))
      )
    }
  }, [progressSegments, state])

  return (
    <section className="border-b border-border-default pb-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-fg-default">
        <CircleDot size={14} className="text-fg-muted" />
        Languages
      </div>

      {state === 'loading' ? (
        <>
          <div className="h-2 overflow-hidden rounded-full bg-canvas-inset">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-border-default" />
          </div>
          <p className="mt-2 text-[12px] text-fg-muted">Loading languages...</p>
        </>
      ) : null}

      {state === 'error' ? (
        <p className="text-[13px] text-fg-muted">Unable to load languages</p>
      ) : null}

      {state === 'success' ? (
        progressSegments.length > 0 ? (
          <>
            <div className="flex h-2 w-full overflow-hidden rounded-full">
              {progressSegments.map((language) => (
                <div
                  key={language.name}
                  className="h-full shrink-0"
                  style={{ width: `${language.percentage}%`, backgroundColor: language.color }}
                />
              ))}
            </div>

            <ul className="mt-2 space-y-1">
              {progressSegments.map((language) => (
                <li key={language.name} className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1.5 text-fg-default">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: language.color }}
                    />
                    {language.name}
                  </span>
                  <span className="text-fg-muted">{language.percentage.toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-[13px] text-fg-muted">Unable to load languages</p>
        )
      ) : null}
    </section>
  )
}
