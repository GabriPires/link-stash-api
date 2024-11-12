import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { FetchStashLinksUseCase } from './fetch-stash-links'
import { makeLink } from 'test/factories/make-link'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: FetchStashLinksUseCase

beforeEach(() => {
  inMemoryLinksRepository = new InMemoryLinksRepository()
  sut = new FetchStashLinksUseCase(inMemoryLinksRepository)
})

describe('fetch stash links use case', () => {
  it('should be able to get a stash', async () => {
    const link = makeLink({
      stashId: new UniqueEntityId('stash-id'),
    })

    await inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      stashId: 'stash-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.stashLinks).toHaveLength(1)
  })
})
