import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostCard } from '../components/PostCard'
import { PostDetailModal } from '../components/PostDetailModal'
import { useEventLoggerContext } from '../context/EventLoggerContext'
import { basePosts, postImages } from '../data/posts'
import type { PostStateSnapshot, PostWithState } from '../types'

const INITIAL_LIKE_COUNT = 0
const INITIAL_SAVE_COUNT = 0

const shuffleArray = <T,>(items: T[]): T[] => {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const buildInitialPosts = (): PostWithState[] => {
  const randomizedImages = shuffleArray(postImages)
  return basePosts.map((post, index) => ({
    ...post,
    imageUrl: randomizedImages[index % randomizedImages.length],
    likes: INITIAL_LIKE_COUNT,
    saves: INITIAL_SAVE_COUNT,
    liked: false,
    saved: false,
  }))
}

/**
 * @param {PostWithState} post 单个贴文状态
 * @returns {PostStateSnapshot} 摘要信息
 */
const toSnapshot = (post: PostWithState): PostStateSnapshot => ({
  likes: post.likes,
  saves: post.saves,
  liked: post.liked,
  saved: post.saved,
})

/**
 * @returns {JSX.Element} Feed页面
 */
export const FeedPage = () => {
  const [posts, setPosts] = useState<PostWithState[]>(() => buildInitialPosts())
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const { logEvent } = useEventLoggerContext()

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === activePostId) ?? null,
    [activePostId, posts],
  )

  const updatePost = (
    postId: string,
    updater: (post: PostWithState) => PostWithState,
    eventType: 'like' | 'unlike' | 'save' | 'unsave',
  ) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        const updated = updater(post)
        logEvent({
          postId,
          eventType,
          state: { ...toSnapshot(updated), detailOpen: postId === activePostId },
        })
        return updated
      }),
    )
  }

  const handleSelectPost = (postId: string) => {
    const post = posts.find((item) => item.id === postId)
    if (!post) return
    logEvent({
      postId,
      eventType: 'card_click',
      state: { ...toSnapshot(post), detailOpen: false },
    })
    setActivePostId(postId)
    logEvent({
      postId,
      eventType: 'open_detail',
      state: { ...toSnapshot(post), detailOpen: true },
    })
  }

  const handleCloseDetail = () => {
    if (activePostId) {
      const post = posts.find((item) => item.id === activePostId)
      if (post) {
        logEvent({
          postId: activePostId,
          eventType: 'close_detail',
          state: { ...toSnapshot(post), detailOpen: false },
        })
      }
    }
    setActivePostId(null)
  }

  const handleToggleLike = (postId: string) => {
    const post = posts.find((item) => item.id === postId)
    if (!post) return
    updatePost(
      postId,
      (current) => {
        const liked = !current.liked
        return {
          ...current,
          liked,
          likes: liked ? current.likes + 1 : Math.max(0, current.likes - 1),
        }
      },
      post.liked ? 'unlike' : 'like',
    )
  }

  const handleToggleSave = (postId: string) => {
    const post = posts.find((item) => item.id === postId)
    if (!post) return
    updatePost(
      postId,
      (current) => {
        const saved = !current.saved
        return {
          ...current,
          saved,
          saves: saved ? current.saves + 1 : Math.max(0, current.saves - 1),
        }
      },
      post.saved ? 'unsave' : 'save',
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-3 py-4 sm:gap-6 sm:px-4 sm:py-6 md:py-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
            小红书模拟平台
          </p>
          <p className="text-sm text-gray-500">请在一分钟随意操作（除了查看数据面板），一分钟后点击查看研究面板导出csv发给研究人员
          </p>
        </div>
        <Link
          to="/admin"
          className="self-start rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          查看研究面板
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onSelect={handleSelectPost}
            onToggleLike={handleToggleLike}
            onToggleSave={handleToggleSave}
          />
        ))}
      </section>

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={handleCloseDetail}
          onToggleLike={handleToggleLike}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  )
}

