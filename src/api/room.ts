import request from '../utils/request'
import { IBookingRoomInput, IHomeDataResult, IUpdateBookingRoomInput, IRoom, IHomeRoom } from '@/models/room'

export interface IRoomAPI {
  /**
   * 获取启用的会议室
   */
  GetActiveRoom (): Promise<IRoom[]>

  GetHomeRoom (): Promise<IHomeRoom[]>
  /**
   * 获取所有会议室
   */
  GetRoom (): Promise<IRoom[]>
  /**
   * 查询会议室预订数据
   * @param queryDate 格式 yyyy-MM eg: 2020-01
   */
  GetHomeData (queryDate: string): Promise<IHomeDataResult[]>
  /**
   * 查询某个会议室预订数据
   * @param roomId 会议室id
   * @param queryDate 查询日期 （yyyy-MM）
   */
  GetMeetingRoomData (roomId: number, queryDate: string): Promise<IHomeDataResult[]>
  /**
   * 预订会议室
   * @param entity 表单实体
   */
  BookingRoom (entity: IBookingRoomInput): Promise<any[]>
  /**
   * 修改会议室预订
   * @param entity 表单实体
   */
  UpdateBookingInfo (entity: IUpdateBookingRoomInput): Promise<IRoom[]>
  /**
   * 取消预订会议室
   * @param RecId 记录ID
   */
  CancelBookingRoom (RecId: number): Promise<any>
}

class RoomAPI implements IRoomAPI {
  GetHomeRoom(): Promise<IHomeRoom[]> {
    return request.get<IHomeRoom[]>('room/GetHomeRoom')
  }
  UpdateBookingInfo(entity: IUpdateBookingRoomInput): Promise<IRoom[]> {
    return request.post<any>('room/UpdateBookingInfo', entity)
  }
  CancelBookingRoom(RecId: number): Promise<any> {
    return request.post<any>('room/CancelBookingRoom', { RecId })
  }

  BookingRoom(entity: IBookingRoomInput): Promise<any[]> {
    return request.post<any>('room/BookingRoom', entity)
  }

  GetRoom() {
    return request.get<IRoom[]>('room/GetRoom', { })
  }

  GetActiveRoom() {
    return request.get<IRoom[]>('room/GetActiveRoom', { })
  }

  GetHomeData(queryDate: string) {
    return request.get<IHomeDataResult[]>('room/GetHomeData', { params: { queryDate } })
  }

  GetMeetingRoomData(roomId: number, queryDate: string) {
    return request.get<IHomeDataResult[]>('room/GetMeetingRoomData', { params: { roomId, queryDate } })
  }
}

const instance: IRoomAPI = new RoomAPI()
export default instance
