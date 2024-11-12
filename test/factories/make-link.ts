import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Link, type LinkProps } from '@/domain/stash/enterprise/entities/link'
import { faker } from '@faker-js/faker'

export function makeLink(
  override: Partial<LinkProps> = {},
  id?: UniqueEntityId,
) {
  const link = Link.create(
    {
      ownerId: new UniqueEntityId(),
      stashId: new UniqueEntityId(),
      url: faker.internet.url(),
      ...override,
    },
    id,
  )

  return link
}
