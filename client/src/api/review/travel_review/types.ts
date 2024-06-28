export type TravelReview = {
  _id: string
  user_id: number
  booking: string
  agency: string
  travel: string
  rating: number
  createdAt: string
  comment: string
}

export type TravelReviewPost = {
  comment: string
  rating: number
  booking_id: string
}
