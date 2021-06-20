import { createSchema } from '../utils/create-content'
export class ComradeWebflowRootSchema {
  constructor(content, payload) {
    this.template = { '@context': 'https://schema.org', ...content }
    this.payload = payload
    if (this.payload && this.payload.reviews) {
      this.eachReviews()
      if (this.reviews.length > 0) {
        this.template.aggregateRating = {
          '@type': 'AggregateRating',
          ...this.aggregateRating()
        }
      }
    }
    this.print()
  }

  makeReviewAtom({ author, reviewBody, rating }) {
    return {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating
      },
      reviewBody: reviewBody
    }
  }

  eachReviews() {
    this.reviews = []
    const meta = this.payload.reviews
    document.querySelectorAll(meta.itemSelector).forEach((item) => {
      this.reviews.push(
        this.makeReviewAtom({
          author: item.querySelector(meta.authorSelector).textContent,
          reviewBody: item.querySelector(meta.bodySelector).textContent,
          rating: item.querySelector(meta.ratingSelector).textContent
        })
      )
    })
    if (this.reviews.length > 0) {
      this.template = { ...this.template, review: this.reviews }
    }
    this.print()
  }

  aggregateRating() {
    let reviewCount = this.reviews.length
    let ratingValue =
      this.reviews.reduce((sum, review) => {
        return sum + parseFloat(review.reviewRating.ratingValue)
      }, 0) / reviewCount
    return {
      reviewCount,
      ratingValue
    }
  }

  print() {
    createSchema('root', this.template)
  }
}
