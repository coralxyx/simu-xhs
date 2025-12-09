import type { PostEvent } from '../types'

interface EventLogTableProps {
  events: PostEvent[]
  eventTypeMap?: Record<string, string>
}

/**
 * 格式化时间戳
 */
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

/**
 * @param {EventLogTableProps} props 属性
 * @returns {JSX.Element} 事件列表表格
 */
export const EventLogTable = ({ events, eventTypeMap = {} }: EventLogTableProps) => {
  if (!events.length) {
    return (
      <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-gray-500">
        当前暂无事件，请先在主页进行交互。
      </p>
    )
  }

  // 获取事件类型的颜色
  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'card_click':
        return 'text-blue-500 bg-blue-50/50 border-blue-100'
      case 'like':
        return 'text-pink-500 bg-pink-50/50 border-pink-100'
      case 'unlike':
        return 'text-gray-400 bg-gray-50/50 border-gray-100'
      case 'save':
        return 'text-amber-500 bg-amber-50/50 border-amber-100'
      case 'unsave':
        return 'text-gray-400 bg-gray-50/50 border-gray-100'
      case 'open_detail':
        return 'text-indigo-500 bg-indigo-50/50 border-indigo-100'
      case 'close_detail':
        return 'text-gray-400 bg-gray-50/50 border-gray-100'
      default:
        return 'text-gray-500 bg-gray-50/50 border-gray-100'
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-left text-xs font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">顺序</th>
              <th className="px-4 py-3">行为类型</th>
              <th className="px-4 py-3">图片ID</th>
              <th className="px-4 py-3">时间戳</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {events.map((event, index) => {
              const eventTypeText = eventTypeMap[event.eventType] || event.eventType
              const colorClass = getEventTypeColor(event.eventType)
              
              return (
                <tr key={event.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${colorClass}`}>
                      {eventTypeText}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                    {event.state?.imageId ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatTimestamp(event.timestamp)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

