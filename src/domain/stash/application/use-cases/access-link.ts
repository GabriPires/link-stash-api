import { left, right, type Either } from '@/core/entities/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AccessLinkUseCaseRequest {
  linkId: string
}

type AccessLinkUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    link: Link
  }
>

export class AccessLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
  }: AccessLinkUseCaseRequest): Promise<AccessLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      return left(new ResourceNotFoundError())
    }

    link.lastAccessedAt = new Date()

    await this.linksRepository.save(link)

    return right({ link })
  }
}
