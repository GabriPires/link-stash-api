import { InMemoryStashesRepository } from 'test/repositories/in-memory-stashes-repository'
import type { StashesRepository } from '../repositories/stashes-repository'
import { CreateStashUseCase } from './create-stash'

let stashesRepository: StashesRepository
let sut: CreateStashUseCase

beforeEach(() => {
  stashesRepository = new InMemoryStashesRepository()
  sut = new CreateStashUseCase(stashesRepository)
})

describe('create stash use case', () => {
  it('should be able to create a stash', async () => {
    const response = await sut.execute({
      ownerId: '123',
      name: 'My stash',
    })

    expect(response.isRight()).toBeTruthy()
  })
})
