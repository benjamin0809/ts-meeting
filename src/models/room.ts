export interface IBookingRoomEntity {
  MeetingMemo: string, // 标题
  StartTime: string, // 会议开始时间 eg: 2020-01-05 08:48:00
  EndTime: string, // 会议开始时间 eg: 2020-01-05 10:48:00
  RoomID: number, // 会议室ID
  Remark?: string // 备注
  Tel: string // 联系电话
  ExtString1?: string // 会议室描述
}

export interface IUpdateBookingRoomEntity extends IBookingRoomEntity {
  RecID: number
}

export interface IUpdateBookingRoomInput {
  UpdateBookingEntity: IUpdateBookingRoomEntity
}

export interface IBookingRoomInput {
  BookingEntity: IBookingRoomEntity
}

export interface IHomeDataResult {
  RecID: number
  Text: string
  Start_Date: string
  End_Date: string
  Remark: string
  RoomId: string
  ItSuppor: string
  Tel: string
}
