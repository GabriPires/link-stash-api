import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import type { LinksRepository } from '../repositories/links-repository'
import { CreateLinkUseCase } from './create-link'

let linksRepository: LinksRepository
let sut: CreateLinkUseCase

beforeEach(() => {
  linksRepository = new InMemoryLinksRepository()
  sut = new CreateLinkUseCase(linksRepository)
})

describe('CreateLink', () => {
  it('should be able to create a link', async () => {
    const { link } = await sut.execute({
      ownerId: '123',
      url: 'https://example.com',
    })

    expect(link.id.toString()).toBe('123')
  })
})
