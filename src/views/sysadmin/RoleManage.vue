<template>
  <div style="padding:20px 40px 20px 20px;">
    <div class="page-title">
      {{ $t('role.roleManage') }}
      <el-button
        size="mini"
        type="primary"
        style="margin-left:20px;"
        @click="addRole"
      >
        {{ $t('role.add') }}
      </el-button>
    </div>

    <el-dialog
      ref="roleDialog"
      :title="roleForm.RoleID ? $t('role.editRole') : $t('role.addRole')"
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetForm('roleForm')"
    >
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item :label="$t('role.code')">
          <el-input
            v-model="roleForm.RoleType"
            type="text"
            auto-complete="off"
            placeholder
            :disabled="true"
          />
        </el-form-item>
        <el-form-item :label="$t('role.name')" prop="name">
          <el-input
            v-model="roleForm.RoleName"
            type="text"
            auto-complete="off"
            placeholder
          />
        </el-form-item>
        <el-form-item :label="$t('role.description')" prop="description">
          <el-input
            v-model="roleForm.Description"
            type="text"
            auto-complete="off"
            placeholder
          />
        </el-form-item>
        <el-form-item :label="$t('role.permission')">
          <el-tree
            :data="menus"
            show-checkbox
            node-key="id"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('roleForm')">{{
          $t('role.cancel')
        }}</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">{{
          $t('role.confirm')
        }}</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :empty-text="$t('common.noData')"
    >
      <el-table-column
        prop="RoleType"
        :label="$t('role.code')"
        width="180"
        align="center"
      />
      <el-table-column
        prop="RoleName"
        :label="$t('role.name')"
        width="180"
        align="center"
      />
      <el-table-column prop="Description" :label="$t('role.description')" />
      <el-table-column :label="$t('role.tag')" width="180" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.RoleType === 1" type="primary">
            {{ $t('role.admin') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateUser"
        :label="$t('site.creator')"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="CreateDate"
        :label="$t('site.createTime')"
        align="center"
        sortable
        width="160"
      ></el-table-column>
      <el-table-column :label="$t('role.operation')" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            {{ $t('role.edit') }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            {{ $t('role.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { IRole, CreateRoleEntity, UpdateRoleEntity } from '@/models'
import RoleApi from '@/api/role'
import moment from 'moment'
@Component
export default class RoleManage extends Vue {
  menus = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 7,
          label: '二级 1-1',
          children: [
            {
              id: 10,
              label: '三级 1-1-1'
            },
            {
              id: 11,
              label: '三级 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 8,
          label: '二级 2-1'
        },
        {
          id: 9,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3'
    },
    {
      id: 4,
      label: '一级 4'
    },
    {
      id: 5,
      label: '一级 5'
    },
    {
      id: 6,
      label: '一级 6'
    }
  ]

  defaultProps = {
    children: 'children',
    label: 'label'
  }
  tableData: IRole[] = []
  async mounted() {
    this.refreshList()
  }

  async refreshList() {
    this.tableData = await RoleApi.GetRoles()
    this.tableData.forEach(item => {
      item.CreateDate &&
        (item.CreateDate = moment(item.CreateDate).format(
          'YYYY-MM-DD HH:mm:ss'
        ))
    })
    console.log('allRoles', this.tableData)
    this.roleForm.RoleType = this.tableData.length + 1
  }

  dialogVisible = false
  roleForm: IRole = {
    RoleID: 0,
    RoleType: this.tableData.length + 1,
    RoleName: '',
    Description: ''
  }

  addRole() {
    this.dialogVisible = true
  }

  validateName(rule: any, value: any, callback: any) {
    if (this.roleForm.RoleName === '') {
      callback(new Error(this.$t('role.nameHint').toString()))
    } else {
      callback()
    }
  }
  validateDescription(rule: any, value: any, callback: any) {
    if (this.roleForm.Description === '') {
      callback(new Error(this.$t('role.descripHint').toString()))
    } else {
      callback()
    }
  }
  rules = {
    name: [{ validator: this.validateName, trigger: 'blur' }],
    description: [{ validator: this.validateDescription, trigger: 'blur' }]
  }
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        // 判断是新增还是编辑
        const entity: CreateRoleEntity = {
          RoleType: this.roleForm.RoleType,
          RoleName: this.roleForm.RoleName,
          Description: this.roleForm.Description
        }
        // 判断是新增还是编辑
        if (this.roleForm.RoleID) {
          const updateEntity: UpdateRoleEntity = {
            RoleID: this.roleForm.RoleID,
            ...entity
          }
          await RoleApi.UpdateRole(updateEntity)
        } else {
          // 添加到數據表中
          await RoleApi.AddRole(entity)
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
    this.roleForm = {
      RoleID: 0,
      RoleType: this.tableData.length + 1,
      RoleName: '',
      Description: ''
    }
  }

  handleEdit(index: any, row: any) {
    console.log(index, row)
    this.roleForm.RoleID = row.RoleID
    this.roleForm.RoleType = row.RoleType
    this.roleForm.RoleName = row.RoleName
    this.roleForm.Description = row.Description
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
    await RoleApi.DeleteRole(row.RoleID)
    this.$message(this.$t('common.deleteSuccess').toString())
    // 更新頁面數據
    this.refreshList()
  }
}
</script>

<style></style>
