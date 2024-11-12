import { InMemoryStashesRepository } from 'test/repositories/in-memory-stashes-repository'
import { makeStash } from 'test/factories/make-stash'
import { GetStashByIdUseCase } from './get-stash-by-id'

let inMemoryStashesRepository: InMemoryStashesRepository
let sut: GetStashByIdUseCase

beforeEach(() => {
  inMemoryStashesRepository = new InMemoryStashesRepository()
  sut = new GetStashByIdUseCase(inMemoryStashesRepository)
})

describe('get stash by id use case', () => {
  it('should be able to get a stash', async () => {
    const stash = makeStash()

    await inMemoryStashesRepository.create(stash)

    const response = await sut.execute({
      stashId: stash.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toMatchObject({
      stash: {
        id: stash.id,
      },
    })
  })
})
