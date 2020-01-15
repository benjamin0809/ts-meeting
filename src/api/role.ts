import request from '../utils/request'
import { IRole,CreateRoleEntity,UpdateRoleEntity } from '@/models'

// 角色管理
export interface IRoleAPI {
  /**
   * 获取角色
   */
  GetRoles (): Promise<IRole[]>
  /**
   * 增加角色
   * @param entity 实体
   */
  AddRole (entity: CreateRoleEntity): Promise<any>
  /**
   * 更新角色
   * @param entity 实体
   */
  UpdateRole (entity: UpdateRoleEntity): Promise<any>
  /**
   * 删除角色
   * @param RoleID RoleID
   */
  DeleteRole (RoleID: number): Promise<any>

}

class RoleAPI implements IRoleAPI {

  GetRoles(): Promise<IRole[]> {
    return request.get<IRole[]>('admin/GetRole', { })
  }
  AddRole(entity: CreateRoleEntity): Promise<any> {
    return request.post<any>('admin/AddRole', entity)
  }
  UpdateRole(entity: UpdateRoleEntity): Promise<any> {
    return request.post<any>('admin/UpdateRole', entity)
  }
  DeleteRole(RoleID: number): Promise<any> {
    return request.post<any>('admin/DeleteRole', { RoleID })
  }

}
const instance: IRoleAPI = new RoleAPI()
export default instance
