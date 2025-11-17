import type { PostEvent } from '../types'

interface EventLogTableProps {
  events: PostEvent[]
}

/**
 * @param {EventLogTableProps} props 属性
 * @returns {JSX.Element} 事件列表表格
 */
export const EventLogTable = ({ events }: EventLogTableProps) => {
  if (!events.length) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-8 text-center text-gray-500">
        当前暂无事件，请先在主页进行交互。
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">时间</th>
              <th className="px-4 py-3">事件</th>
              <th className="px-4 py-3">Post ID</th>
              <th className="px-4 py-3">Likes</th>
              <th className="px-4 py-3">Saves</th>
              <th className="px-4 py-3">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {events.map((event, index) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {new Date(event.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-semibold text-brand-primary">{event.eventType}</td>
                <td className="px-4 py-3 text-gray-600">{event.postId ?? '—'}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{event.state?.likes ?? '—'}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{event.state?.saves ?? '—'}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {event.state
                    ? JSON.stringify({
                        liked: event.state.liked,
                        saved: event.state.saved,
                        detailOpen: event.state.detailOpen,
                      })
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

