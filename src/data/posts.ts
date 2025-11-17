export interface BasePost {
  id: string
  title: string
  description: string
  imageAlt: string
  imageUrl: string
}

export const basePosts: BasePost[] = [
  {
    id: 'post-1',
    title: '秋日咖啡探店',
    description: '隐于胡同的精品咖啡店，温柔手冲太惊喜。',
    imageAlt: '秋日咖啡店',
    imageUrl: 'https://picsum.photos/seed/xhs1/400/500',
  },
  {
    id: 'post-2',
    title: '治愈系家居角落',
    description: '复古木质与暖色灯光，打造可躺可拍的家。',
    imageAlt: '家居布置',
    imageUrl: 'https://picsum.photos/seed/xhs2/400/500',
  },
  {
    id: 'post-3',
    title: '城市徒步路线',
    description: '3小时轻松路线，穿梭老城与河边秋景。',
    imageAlt: '城市徒步',
    imageUrl: 'https://picsum.photos/seed/xhs3/400/500',
  },
  {
    id: 'post-4',
    title: '早餐麦片灵感',
    description: '5种搭配，10分钟搞定高颜值能量早餐。',
    imageAlt: '早餐灵感',
    imageUrl: 'https://picsum.photos/seed/xhs4/400/500',
  },
  {
    id: 'post-5',
    title: '轻量出行背包',
    description: '周末短途只需这8样，背包不再超重。',
    imageAlt: '出行背包',
    imageUrl: 'https://picsum.photos/seed/xhs5/400/500',
  },
  {
    id: 'post-6',
    title: '胶片感妆容',
    description: '柔雾底妆搭配红棕口红，出片率超高。',
    imageAlt: '胶片妆容',
    imageUrl: 'https://picsum.photos/seed/xhs6/400/500',
  },
  {
    id: 'post-7',
    title: '阳台香草花园',
    description: '超省空间种植法，阳台秒变法式庭院。',
    imageAlt: '香草花园',
    imageUrl: 'https://picsum.photos/seed/xhs7/400/500',
  },
  {
    id: 'post-8',
    title: '极简运动打卡',
    description: '15分钟室内HIIT计划，忙碌也能坚持。',
    imageAlt: '运动打卡',
    imageUrl: 'https://picsum.photos/seed/xhs8/400/500',
  },
]

