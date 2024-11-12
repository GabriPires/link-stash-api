import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export interface StashProps {
  ownerId: UniqueEntityId
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class Stash extends Entity<StashProps> {
  get name() {
    return this.props.name
  }

  get ownerId() {
    return this.props.ownerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<StashProps, 'createdAt'>, id?: UniqueEntityId) {
    return new Stash(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
