import clsx from 'clsx'
import type { PostWithState } from '../types'

interface PostDetailModalProps {
  post: PostWithState
  onClose: () => void
  onToggleLike: (postId: string) => void
  onToggleSave: (postId: string) => void
}

/**
 * @param {PostDetailModalProps} props 属性配置
 * @returns {JSX.Element | null} 贴文详情模态框
 */
export const PostDetailModal = ({
  post,
  onClose,
  onToggleLike,
  onToggleSave,
}: PostDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-gray-600 shadow hover:bg-white"
        >
          关闭
        </button>
        <div className="grid max-h-[85vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
          <div className="h-80 w-full bg-gray-100 md:h-full">
            <img
              src={post.imageUrl}
              alt={post.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div>
              <p className="text-xs font-semibold uppercase text-brand-primary">灵感详情</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">{post.title}</h2>
              <p className="mt-2 text-base text-gray-600">{post.description}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">互动数据</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-900">
                <span className="text-lg font-semibold">
                  ♥ {post.likes} <span className="text-sm font-normal text-gray-500">Likes</span>
                </span>
                <span className="text-lg font-semibold">
                  ★ {post.saves}{' '}
                  <span className="text-sm font-normal text-gray-500">Saves</span>
                </span>
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-3 md:flex-row">
              <button
                type="button"
                onClick={() => onToggleLike(post.id)}
                className={clsx(
                  'flex-1 rounded-2xl px-4 py-3 text-base font-semibold transition',
                  post.liked
                    ? 'bg-brand-primary text-white shadow-lg'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-100',
                )}
              >
                {post.liked ? '取消喜欢' : '喜欢'}
              </button>
              <button
                type="button"
                onClick={() => onToggleSave(post.id)}
                className={clsx(
                  'flex-1 rounded-2xl px-4 py-3 text-base font-semibold transition',
                  post.saved
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-100',
                )}
              >
                {post.saved ? '取消收藏' : '收藏'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

