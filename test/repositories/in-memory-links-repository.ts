import type { LinksRepository } from '@/domain/stash/application/repositories/links-repository'
import type { Link } from '@/domain/stash/enterprise/entities/link'

export class InMemoryLinksRepository implements LinksRepository {
  public items: Link[] = []

  async create(link: Link) {
    this.items.push(link)
  }
}
