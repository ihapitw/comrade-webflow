import { createSchema } from '../utils/create-content'
export class ComradeWebflowRootSchema {
  constructor(content, payload) {
    this.content = { '@context': 'https://schema.org', ...content }
    this.payload = payload
    if (this.payload && this.payload.reviews) {
      this.eachReviews()
      if (this.payload.aggregateRating) {
        this.content.aggregateRating = {
          '@type': 'AggregateRating',
          ...this.payload.aggregateRating
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
    this.content = { ...this.content, review: this.reviews }
    this.print()
  }

  print() {
    createSchema('root', this.content)
  }
}
