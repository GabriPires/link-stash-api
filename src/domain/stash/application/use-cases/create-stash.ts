import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Stash } from '../../enterprise/entities/stash'
import type { StashesRepository } from '../repositories/stashes-repository'
import { right, type Either } from '@/core/entities/either'

interface CreateStashUseCaseRequest {
  name: string
  ownerId: string
}

type CreateStashUseCaseResponse = Either<
  null,
  {
    stash: Stash
  }
>

export class CreateStashUseCase {
  constructor(private stashesRepository: StashesRepository) {}

  async execute({
    ownerId,
    name,
  }: CreateStashUseCaseRequest): Promise<CreateStashUseCaseResponse> {
    const stash = Stash.create({
      ownerId: new UniqueEntityId(ownerId),
      name,
    })

    await this.stashesRepository.create(stash)

    return right({ stash })
  }
}
