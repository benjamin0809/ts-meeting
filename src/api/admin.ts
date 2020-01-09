import request from '../utils/request'
import { UpdateSiteEntity, CreateSiteEntity, ISite } from '@/models'

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
}
class AdminAPI implements IAdminAPI {
  GetSites (): Promise<ISite[]> {
    return request.get<ISite[]>('room/GetSites', { })
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
