import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { DeleteLinkUseCase } from './delete-link'
import { makeLink } from 'test/factories/make-link'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: DeleteLinkUseCase

beforeEach(() => {
  inMemoryLinksRepository = new InMemoryLinksRepository()
  sut = new DeleteLinkUseCase(inMemoryLinksRepository)
})

describe('delete link use case', () => {
  it('should be able to delete a link', async () => {
    const link = makeLink()

    await inMemoryLinksRepository.create(link)

    const response = await sut.execute({
      ownerId: link.ownerId.toString(),
      linkId: link.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryLinksRepository.items).toHaveLength(0)
  })

  it('should throw an error if the URL owner is different', async () => {
    const link = makeLink()

    await inMemoryLinksRepository.create(link)

    const response = await sut.execute({
      ownerId: 'another-owner-id',
      linkId: link.id.toString(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
