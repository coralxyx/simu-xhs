import { Heart, Star, MessageCircle, Share2, X } from 'lucide-react'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-0 py-0 md:px-4 md:py-8">
      <div className="relative flex h-full w-full md:max-h-[90vh] md:max-w-4xl md:rounded-3xl flex-col overflow-hidden bg-white shadow-2xl">
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 md:right-4 md:top-4 z-10 rounded-full bg-white/90 p-2.5 md:p-2 text-gray-600 shadow-md hover:bg-white hover:text-gray-900 transition-colors touch-manipulation"
          aria-label="关闭"
        >
          <X size={22} className="md:w-5 md:h-5" />
        </button>

        {/* 内容区域 */}
        <div className="grid h-full grid-cols-1 overflow-hidden md:grid-cols-2">
          {/* 图片区域 */}
          <div className="relative flex h-[60vh] w-full items-center justify-center bg-black md:h-full">
            <img
              src={post.imageUrl}
              alt={post.imageAlt}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* 文字内容区域 */}
          <div className="flex flex-col overflow-hidden md:h-full">
            {/* 可滚动内容 */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-4 p-4 md:p-6">
                {/* 用户头像和姓名 - 顶部 */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <p className="text-sm md:text-sm font-medium text-gray-900">{post.author}</p>
                </div>

                {/* 内容 - 中间 */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">{post.title}</h2>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700 whitespace-pre-wrap">{post.description}</p>
                </div>

                {/* 时间 - 底部 */}
                <div className="pt-2">
                  <p className="text-xs text-gray-400">{post.timeAgo}</p>
                </div>
              </div>
            </div>

            {/* 底部操作栏 - 小红书风格，只在右侧内容区域 */}
            <div className="border-t border-gray-200 bg-white px-3 py-3 md:px-4 md:py-3 flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                {/* 评论输入框 */}
                <div className="flex-1 flex items-center gap-2 md:gap-3 rounded-full bg-gray-100 px-3 py-2.5 md:px-4 md:py-2.5">
                  <div className="h-8 w-8 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <input
                    type="text"
                    placeholder="说点什么..."
                    className="flex-1 bg-transparent text-sm text-gray-600 placeholder:text-gray-400 outline-none"
                    readOnly
                  />
                </div>

                {/* 操作按钮组 */}
                <div className="flex items-center gap-3 md:gap-3">
                  {/* 点赞 */}
                  <button
                    type="button"
                    onClick={() => onToggleLike(post.id)}
                    className="flex flex-col items-center gap-0.5 min-w-[44px] touch-manipulation active:opacity-70"
                    aria-label="点赞"
                  >
                    <Heart
                      size={22}
                      className={clsx(
                        'transition-all',
                        post.liked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600',
                      )}
                    />
                    <span className="text-xs text-gray-600 leading-none">{post.likes}</span>
                  </button>

                  {/* 收藏 */}
                  <button
                    type="button"
                    onClick={() => onToggleSave(post.id)}
                    className="flex flex-col items-center gap-0.5 min-w-[44px] touch-manipulation active:opacity-70"
                    aria-label="收藏"
                  >
                    <Star
                      size={22}
                      className={clsx(
                        'transition-all',
                        post.saved ? 'fill-amber-400 text-amber-400 scale-110' : 'text-gray-600',
                      )}
                    />
                    <span className="text-xs text-gray-600 leading-none">{post.saves}</span>
                  </button>

                  {/* 评论 */}
                  <button
                    type="button"
                    className="flex flex-col items-center gap-0.5 min-w-[44px] touch-manipulation active:opacity-70"
                    aria-label="评论"
                  >
                    <MessageCircle size={22} className="text-gray-600" />
                    <span className="text-xs text-gray-600 leading-none">评论</span>
                  </button>

                  {/* 分享 */}
                  <button
                    type="button"
                    className="flex items-center justify-center min-w-[44px] touch-manipulation active:opacity-70"
                    aria-label="分享"
                  >
                    <Share2 size={22} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

