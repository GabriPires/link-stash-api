import type { Link } from '../../enterprise/entities/link'

export interface LinksRepository {
  create(link: Link): Promise<void>
  findById(id: string): Promise<Link | null>
  findManyByStashId(stashId: string): Promise<Link[]>
  save(link: Link): Promise<void>
  delete(link: Link): Promise<void>
}
