
import request from '../utils/request'
import { ISite,IRoom,INotice,IRole,IUserMeetingRoom,IUserRole } from '@/models'

// 获得用户的Timeline数据
export interface IUserAPI {
  /**
   * 用户添加的会议室厂区
   */
  GetUserCreateSites (UserID: string): Promise<ISite[]>
  /**
   * 用户添加的会议室
   */
  GetUserCreateRooms (UserID: string): Promise<IRoom[]>
  /**
   * 用户添加的公告
   */
  GetUserCreateAnnounces (UserID: string): Promise<INotice[]>
  /**
   * 用户添加的系统角色
   */
  GetUserCreateRoles (UserID: string): Promise<IRole[]>
  /**
   * 用户的会议室预定记录
   */
  GetUserReservations (UserID: string): Promise<IUserMeetingRoom[]>
  /**
   * 用户设置的角色
   */
  GetUserSetAdmin (UserID: string): Promise<IUserRole[]>
}

class UserAPI implements IUserAPI {

  GetUserCreateSites (UserID: string): Promise<ISite[]> {
    return request.getData<ISite[]>('user/GetUserCreateSites', { UserID })
  }
  GetUserCreateRooms (UserID: string): Promise<IRoom[]> {
    return request.getData<IRoom[]>('user/GetUserCreateRooms', { UserID })
  }
  GetUserCreateAnnounces (UserID: string): Promise<INotice[]> {
    return request.getData<INotice[]>('user/GetUserCreateAnnounces', { UserID })
  }
  GetUserCreateRoles (UserID: string): Promise<IRole[]> {
    return request.getData<IRole[]>('user/GetUserCreateRoles', { UserID })
  }
  GetUserReservations (UserID: string): Promise<IUserMeetingRoom[]> {
    return request.getData<IUserMeetingRoom[]>('user/GetUserReservations', { UserID })
  }
  GetUserSetAdmin (UserID: string): Promise<IUserRole[]> {
    return request.getData<IUserRole[]>('user/GetUserSetAdmin', { UserID })
  }
}
const instance: IUserAPI = new UserAPI()
export default instance
