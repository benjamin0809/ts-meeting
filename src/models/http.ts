export interface IResponseResult<T> {
  Errcode: number
  Errmsg: string
  Result: T
}
