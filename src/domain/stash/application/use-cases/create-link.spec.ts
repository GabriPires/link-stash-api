import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import type { LinksRepository } from '../repositories/links-repository'
import { CreateLinkUseCase } from './create-link'

let linksRepository: LinksRepository
let sut: CreateLinkUseCase

beforeEach(() => {
  linksRepository = new InMemoryLinksRepository()
  sut = new CreateLinkUseCase(linksRepository)
})

describe('create link use case', () => {
  it('should be able to create a link', async () => {
    const { link } = await sut.execute({
      ownerId: '123',
      url: 'https://example.com',
    })

    expect(link.ownerId.toString()).toBe('123')
  })

  it('should throw an error if the URL is not valid', async () => {
    await expect(() =>
      sut.execute({
        ownerId: '123',
        url: 'invalid-url',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
