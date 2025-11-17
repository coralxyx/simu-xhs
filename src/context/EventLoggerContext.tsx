import { createContext, useContext, type ReactNode } from 'react'
import { useEventLogger, type LogEventPayload } from '../hooks/useEventLogger'
import type { PostEvent } from '../types'

interface EventLoggerContextValue {
  events: PostEvent[]
  sessionId: string
  logEvent: (payload: LogEventPayload) => void
  clearEvents: () => void
}

const EventLoggerContext = createContext<EventLoggerContextValue | null>(null)

interface ProviderProps {
  children: ReactNode
}

/**
 * @param {ProviderProps} props 组件属性
 * @returns {JSX.Element} 提供事件日志上下文的Provider
 */
export const EventLoggerProvider = ({ children }: ProviderProps) => {
  const value = useEventLogger()
  return (
    <EventLoggerContext.Provider value={value}>{children}</EventLoggerContext.Provider>
  )
}

/**
 * @returns {EventLoggerContextValue} 事件日志上下文
 */
export const useEventLoggerContext = () => {
  const ctx = useContext(EventLoggerContext)
  if (!ctx) {
    throw new Error('useEventLoggerContext must be used within EventLoggerProvider')
  }
  return ctx
}

