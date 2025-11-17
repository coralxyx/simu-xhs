import clsx from 'clsx'
import type { MouseEvent } from 'react'
import type { PostWithState } from '../types'

interface PostCardProps {
  post: PostWithState
  onSelect: (postId: string) => void
  onToggleLike: (postId: string) => void
  onToggleSave: (postId: string) => void
}

/**
 * @param {PostCardProps} props 卡片属性
 * @returns {JSX.Element} Feed中的单个卡片
 */
export const PostCard = ({ post, onSelect, onToggleLike, onToggleSave }: PostCardProps) => {
  const handleCardClick = () => onSelect(post.id)

  const handleLike = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onToggleLike(post.id)
  }

  const handleSave = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onToggleSave(post.id)
  }

  return (
    <article
      className="flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-rose-100 via-white to-rose-200">
        <img
          src={post.imageUrl}
          alt={post.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-2 text-sm text-gray-600">
          <button
            type="button"
            onClick={handleLike}
            className={clsx(
              'flex items-center gap-1.5 font-medium transition',
              post.liked ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary',
            )}
          >
            <span aria-hidden="true">♥</span>
            <span>Likes {post.likes}</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={clsx(
              'flex items-center gap-1.5 font-medium transition',
              post.saved ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary',
            )}
          >
            <span aria-hidden="true">★</span>
            <span>Saves {post.saves}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

