export interface CreateSiteEntity {
  Code: string
  Name: string
  Level: number
  SortIndex: number
  Status: number
  Description: string
  Remark: string
}

export interface UpdateSiteEntity extends CreateSiteEntity {
  CodeId: number
}
