
export interface INotice {
  AnnounceId: number,
  Title?: string,
  Content: string,
  Type: string,
  AttFileLength?: number,
  AttFileNameOri?: string,
  AttFileNameUni?: string,
  EffectedDate?: string,
  Status: number,
  Remark?: string,
  CreatedBy?: string,
  CreatedTime?: string,
  LastUpdatedBy?: string,
  LastUpdatedTime?: string
}

export interface CreateNoticeEntity {
  Title?: string,
  Content: string,
  Type: string,
  AttFileLength?: number,
  AttFileNameOri?: string,
  AttFileNameUni?: string,
  EffectedDate?: string,
  Status: number,
  Remark?: string
}
export interface UpdateNoticeEntity extends CreateNoticeEntity {
  AnnounceId: number,
}
