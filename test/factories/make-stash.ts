import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  Stash,
  type StashProps,
} from '@/domain/stash/enterprise/entities/stash'
import { faker } from '@faker-js/faker'

export function makeStash(
  override: Partial<StashProps> = {},
  id?: UniqueEntityId,
) {
  const stash = Stash.create(
    {
      ownerId: new UniqueEntityId(),
      name: faker.person.fullName(),
      ...override,
    },
    id,
  )

  return stash
}
