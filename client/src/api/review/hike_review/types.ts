export type HikeReview = {
  _id: string
  user_id: number
  booking: string
  agency: string
  hike: string
  rating: number
  createdAt: string
  comment: string
}

export type HikeReviewPost = {
  comment: string
  rating: number
  booking_id: string
}
