import { InMemoryStashesRepository } from 'test/repositories/in-memory-stashes-repository'
import { DeleteStashUseCase } from './delete-stash'
import { makeStash } from 'test/factories/make-stash'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryStashesRepository: InMemoryStashesRepository
let sut: DeleteStashUseCase

beforeEach(() => {
  inMemoryStashesRepository = new InMemoryStashesRepository()
  sut = new DeleteStashUseCase(inMemoryStashesRepository)
})

describe('delete stash use case', () => {
  it('should be able to delete a stash', async () => {
    const stash = makeStash()

    await inMemoryStashesRepository.create(stash)

    const response = await sut.execute({
      ownerId: stash.ownerId.toString(),
      stashId: stash.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryStashesRepository.items).toHaveLength(0)
  })

  it('should throw an error if the URL owner is different', async () => {
    const stash = makeStash()

    await inMemoryStashesRepository.create(stash)

    const response = await sut.execute({
      ownerId: 'another-owner-id',
      stashId: stash.id.toString(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
