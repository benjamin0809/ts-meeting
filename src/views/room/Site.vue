<template>
  <div>
    <el-dialog
      ref="siteDialog"
      :title="$t('site.dialogTitle')"
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetForm('siteForm')"
    >
      <el-form
        ref="siteForm"
        :model="siteForm"
        :rules="rules"
      >
        <el-form-item
          :label="$t('site.label')"
          prop="label"
        >
          <el-input
            v-model="siteForm.label"
            type="text"
            auto-complete="off"
            placeholder="如：龙华"
          />
        </el-form-item>
        <el-form-item
          :label="$t('site.name')"
          prop="value"
        >
          <el-input
            v-model="siteForm.value"
            type="text"
            auto-complete="off"
            placeholder="LH"
          />
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelForm('siteForm')">{{ $t('room.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="submitForm('siteForm')"
        >{{ $t('room.confirm') }}</el-button>
      </span>
    </el-dialog>

    <div class="page-title">
      {{ $t('site.title') }}
      <el-button
        size="mini"
        type="primary"
        style="margin-left:20px;"
        @click="addSite"
      >
        {{ $t('room.add') }}
      </el-button>
    </div>

    <el-table
      :data="listData"
      style="width: 100%"
      :empty-text="$t('common.noData')"
    >
      <!-- <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>-->

      <el-table-column
        :label="$t('site.label')"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.Code }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('site.name')"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('site.operation')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            {{ $t('room.edit') }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            {{ $t('room.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SiteApi from '@/api/admin'
import { ISite } from '@/models/room'
import { dateFormat } from '../../utils/date'
import { CreateSiteEntity, UpdateSiteEntity } from '@/models'
@Component({
  name: 'site'
})
export default class extends Vue {
  async mounted() {
    this.listData = await SiteApi.GetSites()
  }
  listData: ISite[] = []
  tableData = [
    {
      id: 1,
      date: '2020-01-02',
      label: '龙华',
      value: 'LH'
    },
    {
      id: 2,
      date: '2020-01-02',
      label: '贵阳',
      value: 'GY'
    }
  ]

  dialogVisible = false
  siteForm = {
    id: 0,
    label: '',
    value: '',
    ModifyTime: '',
    ModifyUser: ''
  }

  addSite() {
    this.dialogVisible = true
  }

  validateLabel(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(this.$t('site.labelHint').toString()))
    } else {
      callback()
    }
  }
  validateName(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(this.$t('site.nameHint').toString()))
    } else {
      callback()
    }
  }

  rules = {
    label: [{ validator: this.validateLabel, trigger: 'blur' }],
    value: [{ validator: this.validateName, trigger: 'blur' }]
  }
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate(async(valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        const entity: CreateSiteEntity = {
          Code: this.siteForm.value,
          Name: this.siteForm.label,
          Level: 1,
          SortIndex: 1,
          Status: 1,
          Description: '',
          Remark: ''
        }
        // 判断是新增还是编辑
        if (this.siteForm.id) {
          const updateEntity: UpdateSiteEntity = {
            CodeId: this.siteForm.id,
            ...entity
          }
          await SiteApi.UpdateSite(updateEntity)
          this.resetForm(formName)
        } else {
          await SiteApi.AddSite(entity)
          this.tableData.push({
            id: Math.random(),
            date: dateFormat(new Date()),
            label: this.siteForm.label,
            value: this.siteForm.value
          })
        }
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
    this.siteForm.id = row.CodeId
    this.siteForm.label = row.Name
    this.siteForm.value = row.Code
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
    await SiteApi.DeleteSite(row.CodeId)
    let a = this.tableData.findIndex(p => p.label === row.label)
    this.tableData.splice(a, 1)
    console.log(index, row)
    this.$message(this.$t('common.deleteSuccess').toString())
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
