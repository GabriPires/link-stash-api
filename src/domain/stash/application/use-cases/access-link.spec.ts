import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import type { LinksRepository } from '../repositories/links-repository'
import { AccessLinkUseCase } from './access-link'
import { makeLink } from 'test/factories/make-link'

let linksRepository: LinksRepository
let sut: AccessLinkUseCase

beforeEach(() => {
  linksRepository = new InMemoryLinksRepository()
  sut = new AccessLinkUseCase(linksRepository)
})

describe('access link use case', () => {
  it('should to updated last accessed date', async () => {
    const link = makeLink()

    linksRepository.create(link)

    expect(link.isRecentlyAccessed).toBe(false)

    const { link: updatedLink } = await sut.execute({
      linkId: link.id.toString(),
    })

    expect(updatedLink.lastAccessedAt).not.toBeNull()
    expect(updatedLink.lastAccessedAt).toBeInstanceOf(Date)
    expect(updatedLink.isRecentlyAccessed).toBe(true)
  })
})
