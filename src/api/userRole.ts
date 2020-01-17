import request from '../utils/request'
import { IUser,IUserRole,CreateUserRoleEntity,UpdateUserRoleEntity } from '@/models'

// 用户的角色管理
export interface IUserRoleAPI {
  /**
   * 搜索用户以设置角色
   */
  SearchUser (SearchKey: string): Promise<IUser[]>
  /**
   * 获取用户角色表里的用户
   */
  GetUserRoles (): Promise<IUserRole[]>
  /**
   * 设置一个用户的角色
   * @param entity 实体
   */
  AddUserRole (entity: CreateUserRoleEntity): Promise<any>
  /**
   * 更新一个用户的角色
   * @param entity 实体
   */
  UpdateUserRole (entity: UpdateUserRoleEntity): Promise<any>
  /**
   * 删除一个用户的角色
   * @param RoleID RoleID
   */
  DeleteUserRole (UserRoleID: number): Promise<any>

}

class UserRoleAPI implements IUserRoleAPI {

  SearchUser(SearchKey: string): Promise<IUser[]> {
    return request.post<IUser[]>('admin/SearchUser', { SearchKey })
  }

  GetUserRoles(): Promise<IUserRole[]> {
    return request.get<IUserRole[]>('admin/GetUserRole', { })
  }
  AddUserRole(entity: CreateUserRoleEntity): Promise<any> {
    return request.post<any>('admin/AddUserRole', entity)
  }
  UpdateUserRole(entity: UpdateUserRoleEntity): Promise<any> {
    return request.post<any>('admin/UpdateUserRole', entity)
  }
  DeleteUserRole(UserRoleID: number): Promise<any> {
    return request.post<any>('admin/DeleteUserRole', { UserRoleID })
  }

}
const instance: IUserRoleAPI = new UserRoleAPI()
export default instance
