import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import type { LinksRepository } from '../repositories/links-repository'
import { CreateLinkUseCase } from './create-link'
import { InvalidPayloadError } from './errors/invalid-payload-error'

let linksRepository: LinksRepository
let sut: CreateLinkUseCase

beforeEach(() => {
  linksRepository = new InMemoryLinksRepository()
  sut = new CreateLinkUseCase(linksRepository)
})

describe('create link use case', () => {
  it('should be able to create a link', async () => {
    const response = await sut.execute({
      ownerId: '123',
      url: 'https://example.com',
    })

    expect(response.isRight()).toBeTruthy()
  })

  it('should throw an error if the URL is not valid', async () => {
    const response = await sut.execute({
      ownerId: '123',
      url: 'invalid-url',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(InvalidPayloadError)
  })
})
