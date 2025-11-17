import { Download } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useEventLoggerContext } from '../context/EventLoggerContext'
import { EventLogTable } from '../components/EventLogTable'

/**
 * @returns {string} CSV字符串
 */
const buildCsv = (events: ReturnType<typeof useEventLoggerContext>['events']): string => {
  const header = ['id', 'sessionId', 'postId', 'eventType', 'timestamp', 'likes', 'saves', 'liked', 'saved', 'detailOpen']
  const rows = events.map((event) => [
    event.id,
    event.sessionId,
    event.postId ?? '',
    event.eventType,
    event.timestamp,
    event.state?.likes ?? '',
    event.state?.saves ?? '',
    event.state?.liked ?? '',
    event.state?.saved ?? '',
    event.state?.detailOpen ?? '',
  ])
  return [header, ...rows].map((columns) =>
    columns
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(','),
  ).join('\n')
}

/**
 * @param {string} filename 文件名
 * @param {string} content 文本内容
 * @param {string} type MIME类型
 */
const downloadText = (filename: string, content: string, type: string) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

/**
 * @returns {JSX.Element} Admin页面
 */
export const AdminPage = () => {
  const { events, sessionId, clearEvents } = useEventLoggerContext()

  const csvText = useMemo(() => buildCsv(events), [events])
  const jsonText = useMemo(() => JSON.stringify(events, null, 2), [events])

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Researcher</p>
          <h1 className="text-3xl font-bold text-gray-900">交互事件追踪面板</h1>
          <p className="text-sm text-gray-500">Session ID: {sessionId}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            返回Feed
          </Link>
          <button
            type="button"
            onClick={() => downloadText(`xhs-events-${sessionId}.json`, jsonText, 'application/json')}
            className="flex items-center gap-1 rounded-2xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-800"
          >
            <Download size={16} />
            JSON
          </button>
          <button
            type="button"
            onClick={() => downloadText(`xhs-events-${sessionId}.csv`, csvText, 'text/csv')}
            className="flex items-center gap-1 rounded-2xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-primary/90"
          >
            <Download size={16} />
            CSV
          </button>
          <button
            type="button"
            onClick={clearEvents}
            className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            清空日志
          </button>
        </div>
      </header>
      <EventLogTable events={events} />
    </div>
  )
}

