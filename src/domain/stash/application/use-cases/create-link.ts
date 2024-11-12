import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { z } from 'zod'
import { InvalidPayloadError } from './errors/invalid-payload-error'
import { left, right, type Either } from '@/core/entities/either'

interface CreateLinkUseCaseRequest {
  url: string
  ownerId: string
}

type CreateLinkUseCaseResponse = Either<
  InvalidPayloadError,
  {
    link: Link
  }
>

export class CreateLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    ownerId,
    url,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const parsedUrl = z.string().url().safeParse(url)

    if (!parsedUrl.success) {
      return left(new InvalidPayloadError())
    }

    const link = Link.create({
      ownerId: new UniqueEntityId(ownerId),
      url: parsedUrl.data,
    })

    await this.linksRepository.create(link)

    return right({ link })
  }
}
