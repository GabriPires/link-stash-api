import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

export interface LinkProps {
  ownerId: UniqueEntityId
  url: string
  lastAccessedAt?: Date
  createdAt: Date
  updatedAt?: Date
}

export class Link extends Entity<LinkProps> {
  get url() {
    return this.props.url
  }

  get ownerId() {
    return this.props.ownerId
  }

  get lastAccessedAt(): Date | undefined {
    return this.props.lastAccessedAt
  }

  set lastAccessedAt(date: Date) {
    this.props.lastAccessedAt = date
    this.touch()
  }

  get isRecentlyAccessed() {
    if (this.lastAccessedAt) {
      const accessedInRecentDays = dayjs().diff(this.lastAccessedAt, 'day') <= 5
      return accessedInRecentDays
    }

    return false
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<LinkProps, 'createdAt' | 'lastAccessedAt'>,
    id?: UniqueEntityId,
  ) {
    const link = new Link(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return link
  }
}
