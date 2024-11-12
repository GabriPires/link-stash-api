import { left, right, type Either } from '@/core/entities/either'
import type { StashesRepository } from '../repositories/stashes-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteStashUseCaseRequest {
  stashId: string
  ownerId: string
}

type DeleteStashUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  Record<string, unknown>
>

export class DeleteStashUseCase {
  constructor(private stashesRepository: StashesRepository) {}

  async execute({
    stashId,
    ownerId,
  }: DeleteStashUseCaseRequest): Promise<DeleteStashUseCaseResponse> {
    const stash = await this.stashesRepository.findById(stashId)

    if (!stash) {
      return left(new ResourceNotFoundError())
    }

    if (stash.ownerId.toString() !== ownerId) {
      return left(new NotAllowedError())
    }

    await this.stashesRepository.delete(stash)

    return right({})
  }
}
