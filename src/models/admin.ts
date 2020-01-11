import { BaseEntity } from './base'

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

export interface CreateMeetingRoomEntity {
  RoomName: string
  DeptID: number
  Position: string
  StatusID: number
  ExtInt1: number
  ExtInt2: number
  Device: string
  Site: string
}

export interface UpdateMeetingRoomEntity extends CreateMeetingRoomEntity {
  RoomID: number
}

export interface MeetingRoomEntity extends UpdateMeetingRoomEntity, BaseEntity {

}
