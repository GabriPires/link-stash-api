/**
 * Make some properties of T optional
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  title: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'name' | 'email'>;
 * ```
 */

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
