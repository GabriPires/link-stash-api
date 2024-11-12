import type { Stash } from '../../enterprise/entities/stash'

export interface StashesRepository {
  create(stash: Stash): Promise<void>
  findById(id: string): Promise<Stash | null>
  save(stash: Stash): Promise<void>
  delete(stash: Stash): Promise<void>
}
