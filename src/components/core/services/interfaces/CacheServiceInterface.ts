export default interface CacheServiceInterface {
  get (key: String): any
  set (key: String, value: any): void
}
