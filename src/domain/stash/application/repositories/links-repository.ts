import type { Link } from '../../enterprise/entities/link'

export interface LinksRepository {
  create: (link: Link) => Promise<void>
}
