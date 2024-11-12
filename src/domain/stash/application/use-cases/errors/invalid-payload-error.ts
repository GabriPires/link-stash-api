import type { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidPayloadError extends Error implements UseCaseError {
  constructor() {
    super('Invalid payload.')
  }
}
