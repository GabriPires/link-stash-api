import type { StashesRepository } from '@/domain/stash/application/repositories/stashes-repository'
import type { Stash } from '@/domain/stash/enterprise/entities/stash'

export class InMemoryStashesRepository implements StashesRepository {
  public items: Stash[] = []

  async create(stash: Stash) {
    this.items.push(stash)
  }

  async findById(id: string) {
    const stash = this.items.find((stash) => stash.id.toString() === id)

    return stash || null
  }

  async save(stash: Stash) {
    const index = this.items.findIndex((item) => item.id === stash.id)
    this.items[index] = stash
  }

  async delete(stash: Stash) {
    this.items = this.items.filter((item) => item.id !== stash.id)
  }
}
