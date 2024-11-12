import { right, type Either } from '@/core/entities/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'

interface FetchStashLinksUseCaseRequest {
  stashId: string
}

type FetchStashLinksUseCaseResponse = Either<
  null,
  {
    stashLinks: Link[]
  }
>

export class FetchStashLinksUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    stashId,
  }: FetchStashLinksUseCaseRequest): Promise<FetchStashLinksUseCaseResponse> {
    const links = await this.linksRepository.findManyByStashId(stashId)

    return right({
      stashLinks: links,
    })
  }
}
