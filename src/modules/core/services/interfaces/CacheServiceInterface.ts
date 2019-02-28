/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
export default interface CacheServiceInterface {
  get (key: String): any
  set (key: String, value: any): void
  close (): void
}
