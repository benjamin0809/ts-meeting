import request from '../utils/request'
import { UpdateSiteEntity, CreateSiteEntity, ISite, UpdateMeetingRoomEntity, CreateMeetingRoomEntity, MeetingRoomEntity } from '@/models'

export interface IAdminAPI {
  /**
   * 删除厂区
   * @param CodeId CodeId
   */
  DeleteSite (CodeId: number): Promise<any>
  /**
   * 更新厂区信息
   * @param entity 实体
   */
  UpdateSite (entity: UpdateSiteEntity): Promise<any>
  /**
   * 增加厂区
   * @param entity 实体
   */
  AddSite (entity: CreateSiteEntity): Promise<any>
  /**
   * 获取厂区
   */
  GetSites (): Promise<ISite[]>
  /**
   * 删除会议室
   * @param CodeId CodeId
   */
  DeleteRoom (RoomID: number): Promise<any>
  /**
   * 更新会议室信息
   * @param entity 实体
   */
  UpdateRoom (entity: UpdateMeetingRoomEntity): Promise<any>
  /**
   * 增加会议室
   * @param entity 实体
   */
  AddRoom (entity: CreateMeetingRoomEntity): Promise<any>
  /**
   * 获取会议室
   */
  GetRoom (): Promise<MeetingRoomEntity[]>
}
class AdminAPI implements IAdminAPI {
  DeleteRoom (RoomID: number): Promise<any> {
    return request.post<any>('admin/DeleteRoom', { RoomID })
  }
  UpdateRoom (entity: UpdateMeetingRoomEntity): Promise<any> {
    return request.post<any>('admin/UpdateRoom', entity)
  }
  AddRoom (entity: CreateMeetingRoomEntity): Promise<any> {
    return request.post<any>('admin/AddRoom', entity)
  }
  GetRoom (): Promise<MeetingRoomEntity[]> {
    throw request.get<MeetingRoomEntity[]>('admin/GetRoom', { })
  }
  GetSites (): Promise<ISite[]> {
    return request.get<ISite[]>('admin/GetSite', { })
  }
  DeleteSite (CodeId: number): Promise<any> {
    return request.post<any>('admin/DeleteSite', { CodeId })
  }
  UpdateSite (entity: UpdateSiteEntity): Promise<any> {
    return request.post<any>('admin/UpdateSite', entity)
  }
  AddSite (entity: CreateSiteEntity): Promise<any> {
    return request.post<any>('admin/AddSite', entity)
  }
}

const instance: IAdminAPI = new AdminAPI()
export default instance
