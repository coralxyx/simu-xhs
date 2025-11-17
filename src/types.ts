export type PostEventType =
  | 'feed_impression'
  | 'card_click'
  | 'open_detail'
  | 'close_detail'
  | 'like'
  | 'unlike'
  | 'save'
  | 'unsave'

export interface PostStateSnapshot {
  likes: number
  saves: number
  liked: boolean
  saved: boolean
  detailOpen?: boolean
}

export interface PostEvent {
  id: string
  sessionId: string
  postId?: string
  eventType: PostEventType
  timestamp: string
  state?: PostStateSnapshot
}

export interface PostWithState {
  id: string
  title: string
  description: string
  imageAlt: string
  imageUrl: string
  author: string
  timeAgo: string
  likes: number
  saves: number
  liked: boolean
  saved: boolean
}

