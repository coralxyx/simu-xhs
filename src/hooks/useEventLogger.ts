import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PostEvent, PostEventType, PostStateSnapshot } from '../types'

const STORAGE_KEY = 'xhs-event-log'
const SESSION_KEY = 'xhs-session-id'

export interface LogEventPayload {
  postId?: string
  eventType: PostEventType
  state?: PostStateSnapshot
  timestamp?: string
}

/**
 * @returns {string} 一个可用于区分浏览器会话的随机ID
 */
const ensureSessionId = (): string => {
  if (typeof window === 'undefined') {
    return 'server-session'
  }
  const existing = window.localStorage.getItem(SESSION_KEY)
  if (existing) {
    return existing
  }
  const newId = crypto.randomUUID()
  window.localStorage.setItem(SESSION_KEY, newId)
  return newId
}

/**
 * @returns {PostEvent[]} 从localStorage恢复的事件列表
 */
const loadPersistedEvents = (): PostEvent[] => {
  if (typeof window === 'undefined') {
    return []
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }
  try {
    const parsed = JSON.parse(raw) as PostEvent[]
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('无法解析事件日志', error)
    return []
  }
}

/**
 * @param {PostEvent[]} events 要保存的事件列
 */
const persistEvents = (events: PostEvent[]): void => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

/**
 * @returns {{ events: PostEvent[]; logEvent: (payload: LogEventPayload) => void; clearEvents: () => void; sessionId: string }}
 */
export const useEventLogger = () => {
  const [events, setEvents] = useState<PostEvent[]>(() => loadPersistedEvents())
  const sessionId = useMemo(() => ensureSessionId(), [])

  useEffect(() => {
    persistEvents(events)
  }, [events])

  const logEvent = useCallback(
    (payload: LogEventPayload) => {
      setEvents((prev) => {
        const nextEvent: PostEvent = {
          id: crypto.randomUUID(),
          sessionId,
          timestamp: payload.timestamp ?? new Date().toISOString(),
          postId: payload.postId,
          eventType: payload.eventType,
          state: payload.state,
        }
        return [...prev, nextEvent]
      })
    },
    [sessionId],
  )

  const clearEvents = useCallback(() => {
    setEvents([])
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return { events, logEvent, clearEvents, sessionId }
}

