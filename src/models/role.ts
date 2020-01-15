
export interface IRole {
  RoleID: number,
  RoleType: number,
  RoleName: string,
  Description: string,
  CreateUser?: string,
  CreateDate?: string
}

export interface CreateRoleEntity {
  RoleType: number,
  RoleName: string,
  Description: string,
}
export interface UpdateRoleEntity extends CreateRoleEntity {
  RoleID: number,
}
