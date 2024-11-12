import { left, right, type Either } from '@/core/entities/either'
import type { Stash } from '../../enterprise/entities/stash'
import type { StashesRepository } from '../repositories/stashes-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetStashByIdUseCaseRequest {
  stashId: string
}

type GetStashByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    stash: Stash
  }
>

export class GetStashByIdUseCase {
  constructor(private stashesRepository: StashesRepository) {}

  async execute({
    stashId,
  }: GetStashByIdUseCaseRequest): Promise<GetStashByIdUseCaseResponse> {
    const stash = await this.stashesRepository.findById(stashId)

    if (!stash) {
      return left(new ResourceNotFoundError())
    }

    return right({
      stash,
    })
  }
}
