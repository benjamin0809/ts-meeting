<template>
  <div style="padding:20px 40px 20px 20px;">
    <div class="page-title">
      <span style="display: inline-block;width:60%">{{
        $t('user.userManage')
      }}</span>
      <el-input
        v-model="searchKey"
        type="text"
        auto-complete="off"
        :placeholder="$t('user.searchPlaceholder')"
        class="search-user"
        :clearable="true"
        @blur="handleSearchBlur"
        @clear="handleSearchClear"
      />
      <el-button @click="searchUser" type="primary" style="margin-left:20px;">{{
        $t('user.searchUser')
      }}</el-button>
    </div>

    <el-dialog
      ref="userDialog"
      :title="$t('user.editUser')"
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetForm('userForm')"
    >
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item :label="$t('user.empNO')" prop="code">
          <el-input
            v-model="userForm.UserID"
            :disabled="true"
            type="text"
            auto-complete="off"
            placeholder
          />
        </el-form-item>
        <el-form-item :label="$t('user.name')" prop="name">
          <el-input
            v-model="userForm.UserName"
            :disabled="true"
            type="text"
            auto-complete="off"
            placeholder
          />
        </el-form-item>
        <el-form-item :label="$t('schedulerDialog.contact')" prop="description">
          <el-input
            v-model="userForm.Tel"
            type="text"
            auto-complete="off"
            placeholder
          />
        </el-form-item>

        <el-form-item :label="$t('user.role')" prop="role">
          <el-radio-group v-model="userForm.RoleID">
            <el-radio
              v-for="item of roleData"
              :key="item.RoleID"
              :label="item.RoleID"
            >
              {{ item.RoleName }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('userForm')">{{
          $t('user.cancel')
        }}</el-button>
        <el-button type="primary" @click="submitForm('userForm')">{{
          $t('user.confirm')
        }}</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="showData"
      border
      style="width: 100%"
      :empty-text="$t('common.noData')"
      :default-sort="{ prop: 'CreatedTime', order: 'descending' }"
    >
      <el-table-column
        prop="UserID"
        :label="$t('user.empNO')"
        width="180"
        align="center"
      />
      <el-table-column
        prop="UserName"
        :label="$t('user.name')"
        width="180"
        align="center"
      />
      <el-table-column
        prop="Tel"
        :label="$t('schedulerDialog.contact')"
        width="180"
        align="center"
      />
      <el-table-column :label="$t('user.role')" width="300" align="center">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.RoleName">
            {{ scope.row.RoleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreatedBy"
        :label="$t('site.creator')"
        align="center"
        width="150"
      />
      <el-table-column
        prop="CreatedTime"
        :label="$t('site.createTime')"
        align="center"
        sortable
        width="160"
      />
      <el-table-column :label="$t('user.operation')" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >
            {{ $t('user.edit') }}
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.UserRoleID !== 0"
            @click="handleDelete(scope.$index, scope.row)"
        >
            {{ $t('user.deleteRoleSet') }}
        </el-button>
        </template>

      </el-table-column>
    </el-table>

    <!--     <el-pagination
      align="right"
      background
      layout="prev, pager, next"
      :total="1000"
    /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  IUser,
  IRole,
  IUserRole,
  CreateUserRoleEntity,
  UpdateUserRoleEntity
} from '@/models'
import RoleApi from '@/api/role'
import UserRoleApi from '@/api/userRole'
import moment from 'moment'

@Component
export default class RoleManage extends Vue {
  roleData: IRole[] = [] // 所有角色
  searchKey = ''
  searchData: IUser[] = [] // 搜索到的用戶
  showData: IUserRole[] = [] // 頁面顯示列表
  userData: IUserRole[] = [] // 用戶角色表裡所有的用戶
  async mounted() {
    this.roleData = await RoleApi.GetRoles()
    this.refreshList()
    /*     this.refreshList().then(() => {
      this.showData = this.userData
    }) */
  }

  async refreshList() {
    this.userData = await UserRoleApi.GetUserRoles()
    this.userData.forEach(item => {
      item.CreatedTime &&
        (item.CreatedTime = moment(item.CreatedTime).format(
          'YYYY-MM-DD HH:mm:ss'
        ))
    })
    this.showData = this.userData
    console.log('allUserRoles', this.userData)
  }

  // 搜索
  async searchUser() {
    if (this.searchKey.trim() === '') {
      this.$message(this.$t('common.searchHint').toString())
      return
    }
    // 先搜索userData
    const filterData = this.userData.filter(
      p => p.UserID === this.searchKey.trim()
    )
    if (filterData.length > 0) {
      this.showData = filterData
      return
    }
    this.searchData = await UserRoleApi.SearchUser(this.searchKey)
    if (this.searchData.length > 0) {
      this.showData = []
      this.searchData.forEach(item => {
        let searchedItem: IUserRole = {
          UserRoleID: 0,
          UserID: item.UserID,
          UserName: item.UserName,
          RoleID: 0,
          RoleName: '',
          Tel: item.Tel
        }
        this.showData.push(searchedItem)
      })
    } else {
      this.$message(this.$t('common.searchNothing').toString())
    }
  }
  handleSearchBlur() {
    if (this.searchKey.trim() === '') {
      this.showData = this.userData
    }
  }
  handleSearchClear() {
    this.showData = this.userData
  }
  // 編輯Dialog
  dialogVisible = false
  userForm: IUserRole = {
    UserRoleID: 0,
    UserID: '',
    UserName: '',
    RoleID: 0,
    RoleName: '',
    Tel: ''
  }

  rules = {}
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        // 判断是新增还是编辑
        const entity: CreateUserRoleEntity = {
          UserID: this.userForm.UserID,
          RoleID: this.userForm.RoleID
        }
        // 判断是新增还是编辑
        if (this.userForm.UserRoleID) {
          const updateEntity: UpdateUserRoleEntity = {
            UserRoleID: this.userForm.UserRoleID,
            ...entity
          }
          await UserRoleApi.UpdateUserRole(updateEntity)
        } else {
          // 添加到數據表中
          await UserRoleApi.AddUserRole(entity)
        }
        this.$message(this.$t('common.saveSuccess').toString())
        // 更新頁面數據
        this.refreshList()
        this.resetForm(formName)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  cancelForm(formName: string) {
    this.dialogVisible = false
    this.resetForm(formName)
  }

  resetForm(formName: string) {
    (this.$refs[formName] as any).resetFields()
    this.userForm = {
      UserRoleID: 0,
      UserID: '',
      UserName: '',
      RoleID: 0,
      RoleName: '',
      Tel: ''
    }
  }

  handleEdit(index: any, row: any) {
    console.log(index, row)
    this.userForm.UserRoleID = row.UserRoleID
    this.userForm.UserID = row.UserID
    this.userForm.UserName = row.UserName
    this.userForm.RoleID = row.RoleID
    this.userForm.RoleName = row.RoleName
    this.userForm.Tel = row.Tel
    this.dialogVisible = true
  }

  handleDelete(index: any, row: any) {
    this.$confirm(this.$t('common.deleteConfirm').toString(), {
      cancelButtonText: this.$t('common.cancel').toString(),
      confirmButtonText: this.$t('common.confirm').toString()
    })
      .then(_ => {
        // 删除操作
        void this.delete(index, row)
      })
      .catch(_ => {
        console.log('取消了删除')
      })
  }
  async delete(index: any, row: any) {
    // 接口刪除
    await UserRoleApi.DeleteUserRole(row.UserRoleID)
    this.$message(this.$t('common.deleteSuccess').toString())
    // 更新頁面數據
    this.refreshList()
  }
}
</script>

<style>
.search-user {
  width: 20% !important;
}
</style>
