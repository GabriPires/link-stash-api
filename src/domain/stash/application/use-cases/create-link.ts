import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { z } from 'zod'

interface CreateLinkUseCaseRequest {
  url: string
  ownerId: string
}

interface CreateLinkUseCaseResponse {
  link: Link
}

export class CreateLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    ownerId,
    url,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const parsedUrl = z.string().url().safeParse(url)

    if (!parsedUrl.success) {
      throw new Error('Provided URL is not valid.')
    }

    const link = Link.create({
      ownerId: new UniqueEntityId(ownerId),
      url: parsedUrl.data,
    })

    await this.linksRepository.create(link)

    return { link }
  }
}
