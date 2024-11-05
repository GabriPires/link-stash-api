import type { Link } from '../../enterprise/entities/link'

export interface LinksRepository {
  create(link: Link): Promise<void>
  findById(id: string): Promise<Link | null>
  save(link: Link): Promise<void>
}
