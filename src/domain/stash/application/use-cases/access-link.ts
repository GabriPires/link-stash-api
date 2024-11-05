import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'

interface AccessLinkUseCaseRequest {
  linkId: string
}

interface AccessLinkUseCaseResponse {
  link: Link
}

export class AccessLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
  }: AccessLinkUseCaseRequest): Promise<AccessLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found')
    }

    link.lastAccessedAt = new Date()

    await this.linksRepository.save(link)

    return { link }
  }
}
