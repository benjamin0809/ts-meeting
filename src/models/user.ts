export interface IUserInfo {
  UserName: string
  UserNo: string
  Token: string
  Email: string
  Id: number
  RoleName?: string
  RoleDescription?: string
}

export interface IUserMeetingRoom {
  RecID: number
  MeetingMemo: string
  RoomID: number
  RoomName: string
  StartTime: string
  EndTime: string
  Remark: string
  Tel: string
  CreatedBy: string
  CreatedTime: string
  canCancel?: boolean
}
