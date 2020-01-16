<template>
  <div style="padding:20px 40px 20px 20px;">
    <el-dialog
      :title="
        siteForm.CodeId ? $t('site.dialogTitle1') : $t('site.dialogTitle')
      "
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetForm('siteForm')"
    >
      <el-form
        :model="siteForm"
        :rules="rules"
        ref="siteForm"
        label-width="100px"
      >
        <el-form-item :label="$t('site.name')" prop="name">
          <el-input
            type="text"
            v-model="siteForm.Name"
            auto-complete="off"
            placeholder="如：龙华"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('site.code')" prop="code">
          <el-input
            type="text"
            v-model="siteForm.Code"
            auto-complete="off"
            placeholder="LH"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('site.valid')" prop="valid">
          <el-radio-group v-model="siteForm.Status">
            <el-radio :label="1">{{$t('common.enable')}}</el-radio>
            <el-radio :label="0">{{$t('common.disable')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('site.level')" prop="level">
          <el-input
            type="number"
            v-model="siteForm.Level"
            auto-complete="off"
            :placeholder="$t('common.numberHint')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('site.sort')" prop="sort">
          <el-input
            type="number"
            v-model="siteForm.SortIndex"
            auto-complete="off"
            :placeholder="$t('common.numberHint')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('site.description')" prop="description">
          <el-input
            type="text"
            v-model="siteForm.Description"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('site.remark')" prop="remark">
          <el-input
            type="text"
            v-model="siteForm.Remark"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('siteForm')">{{
          $t('site.cancel')
        }}</el-button>
        <el-button type="primary" @click="submitForm('siteForm')">{{
          $t('site.confirm')
        }}</el-button>
      </span>
    </el-dialog>

    <div class="page-title">
      {{ $t('site.title') }}
      <el-button size="mini" @click="addSite" type="primary" style="margin-left:20px;">{{
        $t('site.add')
      }}</el-button>
    </div>

    <el-table
      :data="listData"
      border
      style="width: 100%"
      :empty-text="$t('common.noData')"
      :default-sort="{ prop: 'LastUpdatedTime', order: 'order' }"
    >
      <el-table-column
        prop="Code"
        :label="$t('site.code')"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="Name"
        :label="$t('site.name')"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="Level"
        :label="$t('site.level')"
        align="center"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        prop="SortIndex"
        :label="$t('site.sort')"
        align="center"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        prop="Status"
        :label="$t('site.status')"
        align="center"
        width="130"
          
      >
      <template slot-scope="scope">
        <el-checkbox :checked="!!scope.row.Status" disabled=""></el-checkbox>
           
        </template>
        </el-table-column>
      <el-table-column
        prop="Description"
        :label="$t('site.description')"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="Remark"
        :label="$t('site.remark')"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="CreatedBy"
        :label="$t('site.creator')"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="CreatedTime"
        :label="$t('site.createTime')"
        align="center"
        sortable
        width="160"
      ></el-table-column>
      <el-table-column
        prop="LastUpdatedBy"
        :label="$t('site.updator')"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="LastUpdatedTime"
        :label="$t('site.updateTime')"
        align="center"
        sortable
        width="160"
      ></el-table-column>
      <el-table-column :label="$t('site.operation')" align="center" width="400">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{
            $t('site.edit')
          }}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >{{ $t('site.delete') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import moment from 'moment'
import { IUserInfo } from '../../models'
import { State } from 'vuex-class'
import { moduleUser } from '@/store/user'
import SiteApi from '@/api/admin'
import { ISite } from '@/models/room'
import { dateFormat } from '../../utils/date'
import { CreateSiteEntity, UpdateSiteEntity } from '@/models'
@Component({
  name: 'site'
})
export default class extends Vue {
  @State private user!: IUserInfo
  // TableData:所有廠區
  listData: ISite[] = []

  async mounted() {
    console.log(' site mounted')
    this.refreshList()
  }

  async refreshList() {
    this.listData = await SiteApi.GetSites()
    this.listData.forEach(item => {
      item.CreatedTime &&
        (item.CreatedTime = moment(item.CreatedTime).format('YYYY-MM-DD HH:mm:ss'))

      item.LastUpdatedTime &&
        (item.LastUpdatedTime = moment(item.LastUpdatedTime).format('YYYY-MM-DD HH:mm:ss'))
    })
    console.log('allsites', this.listData)
  }

  dialogVisible = false

  siteForm: ISite = {
    CodeId: 0,
    Code: '',
    Name: '',
    Level: 0,
    SortIndex: 1,
    Status: 1,
    Description: '',
    Remark: ''
  }

  addSite() {
    this.dialogVisible = true
  }

  validateCode(rule: any, value: any, callback: any) {
    if (this.siteForm.Code === '') {
      callback(new Error(this.$t('site.labelHint').toString()))
    } else {
      callback()
    }
  }
  validateName(rule: any, value: any, callback: any) {
    if (this.siteForm.Name === '') {
      callback(new Error(this.$t('site.nameHint').toString()))
    } else {
      callback()
    }
  }

  rules = {
    code: [{ validator: this.validateCode, trigger: 'blur' }],
    name: [{ validator: this.validateName, trigger: 'blur' }]
  }
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        const entity: CreateSiteEntity = {
          Code: this.siteForm.Code,
          Name: this.siteForm.Name,
          Level: this.siteForm.Level,
          SortIndex: this.siteForm.SortIndex,
          Status: this.siteForm.Status,
          Description: this.siteForm.Description,
          Remark: this.siteForm.Remark
        }
        // 判断是新增还是编辑
        if (this.siteForm.CodeId) {
          const updateEntity: UpdateSiteEntity = {
            CodeId: this.siteForm.CodeId,
            ...entity
          }
          await SiteApi.UpdateSite(updateEntity)
        } else {
          // 添加到數據表中
          await SiteApi.AddSite(entity)
        }
        this.resetForm(formName)
        // 更新頁面數據
        this.refreshList()
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
    this.siteForm = {
      CodeId: 0,
      Code: '',
      Name: '',
      Level: 0,
      SortIndex: 1,
      Status: 1,
      Description: '',
      Remark: ''
    }

  }

  handleEdit(index: any, row: any) {
    console.log(index, row)
    this.siteForm.CodeId = row.CodeId
    this.siteForm.Name = row.Name
    this.siteForm.Code = row.Code
    this.siteForm.Level = row.Level
    this.siteForm.SortIndex = row.SortIndex
    this.siteForm.Status = row.Status
    this.siteForm.Description = row.Description
    this.siteForm.Remark = row.Remark
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
    await SiteApi.DeleteSite(row.CodeId)
    this.$message(this.$t('common.deleteSuccess').toString())
    // 更新頁面數據
    this.refreshList()
  }
}
</script>

<style lang="scss" scope>
.page-title {
  text-align: left;
  padding: 20px 0px;
  font-size: 20px;
}
</style>
