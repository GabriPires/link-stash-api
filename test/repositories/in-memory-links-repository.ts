import type { LinksRepository } from '@/domain/stash/application/repositories/links-repository'
import type { Link } from '@/domain/stash/enterprise/entities/link'

export class InMemoryLinksRepository implements LinksRepository {
  public items: Link[] = []

  async create(link: Link) {
    this.items.push(link)
  }

  async findById(id: string) {
    const link = this.items.find((link) => link.id.toString() === id)

    return link || null
  }

  async findManyByStashId(stashId: string): Promise<Link[]> {
    return this.items.filter((link) => link.stashId.toString() === stashId)
  }

  async save(link: Link) {
    const index = this.items.findIndex((item) => item.id === link.id)
    this.items[index] = link
  }

  async delete(link: Link) {
    this.items = this.items.filter((item) => item.id !== link.id)
  }
}
