export interface BasePost {
  id: string
  title: string
  description: string
  imageAlt: string
  imageUrl: string
  author: string
  timeAgo: string
}

export const postImages: string[] = [
  '/Group 243.png',
  '/Group 244.png',
  '/Group 245.png',
  '/Group 246.png',
  '/Group 247.png',
  '/Group 248.png',
  '/Group 249.png',
  '/Group 250.png',
  '/Group 251.png',
  '/Group 252.png',
  '/Group 253.png',
  '/Group 254.png',
  '/Group 255.png',
  '/Group 256.png',
  '/Group 257.png',
  '/Group 258.png',
]

const COMMON_TITLE = 'Worth Trying At Least Once'
const COMMON_DESCRIPTION =
  "Didn't expect much at first, but it turned out to be surprisingly enjoyable.\n\nNot something I’d hype blindly, but definitely worth a try if you come across it"
const COMMON_ALT = 'food'
const COMMON_TIME = '2小时之前'

const COMMON_AUTHOR = '路人甲'

export const basePosts: BasePost[] = postImages.map((imageUrl, index) => ({
  id: `post-${index + 1}`,
  title: COMMON_TITLE,
  description: COMMON_DESCRIPTION,
  imageAlt: COMMON_ALT,
  imageUrl,
  author: COMMON_AUTHOR,
  timeAgo: COMMON_TIME,
}))

