import clsx from 'clsx'
import type { MouseEvent } from 'react'
import type { PostWithState } from '../types'

interface PostCardProps {
  post: PostWithState
  onSelect: (postId: string) => void
  onToggleLike: (postId: string) => void
  onToggleSave?: (postId: string) => void
}

/**
 * @param {PostCardProps} props 卡片属性
 * @returns {JSX.Element} Feed中的单个卡片
 */
export const PostCard = ({ post, onSelect, onToggleLike }: PostCardProps) => {
  const handleCardClick = () => onSelect(post.id)

  const handleLike = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onToggleLike(post.id)
  }

  return (
    <article
      className="flex cursor-pointer flex-col bg-white transition hover:opacity-90"
      onClick={handleCardClick}
    >
      {/* 圆角图片 */}
      <div className="relative w-full overflow-hidden rounded-md bg-gray-100">
        <img
          src={post.imageUrl}
          alt={post.imageAlt}
          className="aspect-[3/4] w-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* 标题 */}
      <h3 className="mt-2 line-clamp-2 text-sm font-medium text-gray-900 leading-5">
        {post.title}
      </h3>
      
      {/* 用户信息、时间和点赞并排显示 */}
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <span className="truncate">{post.author}</span>
        <span>·</span>
        <span className="shrink-0">{post.timeAgo}</span>
        <span className="ml-auto shrink-0">
          <button
            type="button"
            onClick={handleLike}
            className={clsx(
              'flex items-center gap-1 transition-colors',
              post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500',
            )}
          >
            <svg
              className="h-3.5 w-3.5"
              fill={post.liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{post.likes}</span>
          </button>
        </span>
      </div>
    </article>
  )
}

