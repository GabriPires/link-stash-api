import type { LinksRepository } from '../repositories/links-repository'

interface DeleteLinkUseCaseRequest {
  linkId: string
  ownerId: string
}

interface DeleteLinkUseCaseResponse {}

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
    ownerId,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    if (link.ownerId.toString() !== ownerId) {
      throw new Error('You cannot delete a link that you do not own.')
    }

    await this.linksRepository.delete(link)

    return {}
  }
}
