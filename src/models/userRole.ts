// a.UserRoleID,a.UserID,b.UserName,a.RoleID,c.RoleName,c.Description,b.Tel,a.CreatedBy,a.CreatedTime
export interface IUserRole {
  UserRoleID: number,
  UserID: string,
  UserName: string,
  RoleID: number,
  RoleName: string,
  Description?: string,
  Tel?: string,
  CreatedBy?: string,
  CreatedTime?: string
}

export interface CreateUserRoleEntity {
  UserID: number,
  RoleID: number,
}
export interface UpdateUserRoleEntity extends CreateUserRoleEntity {
  UserRoleID: number
}
