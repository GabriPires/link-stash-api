import { left, right, type Either } from '@/core/entities/either'
import type { LinksRepository } from '../repositories/links-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteLinkUseCaseRequest {
  linkId: string
  ownerId: string
}

type DeleteLinkUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  Record<string, unknown>
>

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
    ownerId,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      return left(new ResourceNotFoundError())
    }

    if (link.ownerId.toString() !== ownerId) {
      return left(new NotAllowedError())
    }

    await this.linksRepository.delete(link)

    return right({})
  }
}
