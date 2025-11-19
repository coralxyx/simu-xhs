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
 * 事件类型映射到中文
 */
const eventTypeMap: Record<string, string> = {
  card_click: '点击',
  open_detail: '打开详情',
  close_detail: '关闭详情',
  like: '点赞',
  unlike: '取消点赞',
  save: '收藏',
  unsave: '取消收藏',
}

/**
 * @returns {JSX.Element} Admin页面
 */
export const AdminPage = () => {
  const { events, sessionId, clearEvents } = useEventLoggerContext()

  const csvText = useMemo(() => buildCsv(events), [events])
  const jsonText = useMemo(() => JSON.stringify(events, null, 2), [events])

  // 计算统计数据
  const stats = useMemo(() => {
    const clickCount = events.filter((e) => e.eventType === 'card_click').length
    const likeCount = events.filter((e) => e.eventType === 'like').length
    const saveCount = events.filter((e) => e.eventType === 'save').length
    const totalOperations = events.length
    return { clickCount, likeCount, saveCount, totalOperations }
  }, [events])

  // 提取点击顺序
  const clickSequence = useMemo(() => {
    return events
      .filter((e) => e.eventType === 'card_click' && e.postId)
      .map((e) => e.postId!)
  }, [events])

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/20">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Researcher</p>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">交互事件追踪面板</h1>
          <p className="text-sm text-gray-500 mt-1">Session ID: <span className="font-mono text-gray-700">{sessionId}</span></p>
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

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-br from-blue-50/50 to-white p-5 shadow-sm border border-blue-100/50">
          <div className="text-4xl font-bold text-blue-500">{stats.clickCount}</div>
          <div className="mt-1 text-sm font-medium text-blue-400">点击次数</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-pink-50/50 to-white p-5 shadow-sm border border-pink-100/50">
          <div className="text-4xl font-bold text-pink-500">{stats.likeCount}</div>
          <div className="mt-1 text-sm font-medium text-pink-400">点赞次数</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-amber-50/50 to-white p-5 shadow-sm border border-amber-100/50">
          <div className="text-4xl font-bold text-amber-500">{stats.saveCount}</div>
          <div className="mt-1 text-sm font-medium text-amber-400">收藏次数</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-purple-50/50 to-white p-5 shadow-sm border border-purple-100/50">
          <div className="text-4xl font-bold text-purple-500">{stats.totalOperations}</div>
          <div className="mt-1 text-sm font-medium text-purple-400">总操作数</div>
        </div>
      </div>

      {/* 点击顺序 */}
      {clickSequence.length > 0 && (
        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm border border-gray-200">
          <h2 className="mb-4 text-base font-semibold text-gray-900">点击顺序</h2>
          <div className="flex flex-wrap gap-3">
            {clickSequence.map((postId, index) => (
              <div
                key={`${postId}-${index}`}
                className="rounded-lg bg-gradient-to-r from-blue-50/70 to-indigo-50/70 px-4 py-2 text-sm font-medium text-blue-500 shadow-sm border border-blue-100/50 hover:from-blue-100/70 hover:to-indigo-100/70 transition-all"
              >
                {index + 1}. 帖子#{postId}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 详细操作记录 */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm border border-gray-200">
        <h2 className="mb-4 text-base font-semibold text-gray-900">详细操作记录</h2>
        <EventLogTable events={events} eventTypeMap={eventTypeMap} />
      </div>
    </div>
  )
}

