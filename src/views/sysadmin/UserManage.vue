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
        placeholder="输入工号搜索..."
        class="search-user"
      />
      <el-button
        @click="searchUser"
        size="mini"
        type="primary"
        style="margin-left:20px;"
        >搜索用户</el-button
      >
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
      <el-table-column prop="Tel" :label="$t('schedulerDialog.contact')" width="180" align="center" />
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
import { IRole,IUserRole, CreateUserRoleEntity, UpdateUserRoleEntity } from '@/models'
import RoleApi from '@/api/role'
import UserRoleApi from '@/api/userRole'
import moment from 'moment'

@Component
export default class RoleManage extends Vue {
  roleData: IRole[] = []

  searchKey = ''
  showData: IUserRole[] = []
  userData: IUserRole[] = []
  async mounted() {
    this.roleData = await RoleApi.GetRoles()
    this.refreshList().then(() => {
      this.showData = this.userData
    })
  }

  async refreshList() {
    this.userData = await UserRoleApi.GetUserRoles()
    this.userData.forEach(item => {
      item.CreatedTime &&
        (item.CreatedTime = moment(item.CreatedTime).format(
          'YYYY-MM-DD HH:mm:ss'
        ))
    })
    console.log('allUserRoles', this.userData)
  }

  async searchUser() {
    this.showData = await UserRoleApi.SearchUser(this.searchKey)
    this.showData.forEach(item => {
      item.CreatedTime &&
        (item.CreatedTime = moment(item.CreatedTime).format(
          'YYYY-MM-DD HH:mm:ss'
        ))
    })
  }

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
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        this.resetForm(formName)
        this.$message(this.$t('common.saveSuccess').toString())
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
}
</script>

<style>
.search-user {
  width: 20% !important;
}
</style>
