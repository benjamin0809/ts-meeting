<template>
  <div style="padding:20px 40px 20px 20px;">
    <div class="page-title">
      {{ $t('notice.noticeManage') }}
      <el-button
        size="mini"
        type="primary"
        style="margin-left:20px;"
        @click="addNotice"
      >
        {{ $t('notice.add') }}
      </el-button>
    </div>

    <el-dialog
      ref="noticeDialog"
      :title="$t('notice.dialogTitle')"
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetForm('noticeForm')"
    >
      <el-form ref="noticeForm" :model="noticeForm" :rules="rules">
        <el-form-item :label="$t('notice.content')" prop="Content">
          <el-input
            v-model="noticeForm.Content"
            type="text"
            auto-complete="off"
          />
        </el-form-item>
<!--         <el-form-item :label="$t('notice.ableSite')" prop="site">
          <el-select
            v-model="noticeForm.Sites"
            :placeholder="$t('notice.pleaseChoose')"
            multiple
          >
            <el-option
              v-for="item in siteData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('noticeForm')">{{
          $t('notice.cancel')
        }}</el-button>
        <el-button type="primary" @click="submitForm('noticeForm')">{{
          $t('notice.confirm')
        }}</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="
        listData.filter(
          data =>
            !search || data.Content.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      :empty-text="$t('common.noData')"
    >
      <el-table-column
        :label="$t('notice.modifyDate')"
        prop="LastUpdatedTime"
        width="150"
      />
      <el-table-column
        :label="$t('notice.modifyUser')"
        prop="LastUpdatedBy"
        width="130"
      />
      <el-table-column :label="$t('notice.content')" prop="Content" />
      <el-table-column align="center">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            :placeholder="$t('notice.searchPlaceholder')"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            {{ $t('notice.edit') }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            {{ $t('notice.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { INotice, CreateNoticeEntity, UpdateNoticeEntity } from '@/models'
import NoticeApi from '@/api/notice'
import moment from 'moment'
@Component
export default class Notice extends Vue {
  search = ''

  listData: INotice[] = []
  async mounted() {
    this.refreshList()
  }

  async refreshList() {
    this.listData = await NoticeApi.GetNotices()
    this.listData.forEach(item => {
      item.CreatedTime &&
        (item.CreatedTime = moment(item.CreatedTime).format(
          'YYYY-MM-DD HH:mm:ss'
        ))

      item.LastUpdatedTime &&
        (item.LastUpdatedTime = moment(item.LastUpdatedTime).format(
          'YYYY-MM-DD HH:mm:ss'
        ))
    })
    console.log('allNotices', this.listData)
  }

  noticeForm: INotice = {
    AnnounceId: 0,
    Title: '',
    Content: '',
    Type: '',
    AttFileLength: 0,
    AttFileNameOri: '',
    AttFileNameUni: '',
    EffectedDate: '',
    Status: 1,
    Remark: ''
  }

  dialogVisible = false
  addNotice() {
    this.dialogVisible = true
  }

  /*   validateSite(rule: any, value: any, callback: any) {
    if (this.noticeForm.Sites.length === 0) {
      callback(new Error(this.$t('notice.ableSiteHint').toString()))
    } else {
      callback()
    }
  } */
  validateContent(rule: any, value: any, callback: any) {
    if (this.noticeForm.Content === '') {
      callback(new Error(this.$t('notice.contentHint').toString()))
    } else {
      callback()
    }
  }
  rules = {
    content: [{ validator: this.validateContent, trigger: 'blur' }]
    // site: [{ validator: this.validateSite, trigger: 'blur' }]
  }

  submitForm(formName: string) {
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        const entity: CreateNoticeEntity = {
          Title: this.noticeForm.Title,
          Content: this.noticeForm.Content,
          Type: this.noticeForm.Type,
          AttFileLength: this.noticeForm.AttFileLength,
          AttFileNameOri: this.noticeForm.AttFileNameOri,
          AttFileNameUni: this.noticeForm.AttFileNameUni,
          EffectedDate: this.noticeForm.EffectedDate,
          Status: this.noticeForm.Status,
          Remark: this.noticeForm.Remark
        }
        // 判断是新增还是编辑
        if (this.noticeForm.AnnounceId) {
          const updateEntity: UpdateNoticeEntity = {
            AnnounceId: this.noticeForm.AnnounceId,
            ...entity
          }
          await NoticeApi.UpdateNotice(updateEntity)
        } else {
          // 添加到數據表中
          await NoticeApi.AddNotice(entity)
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
    this.noticeForm = {
      AnnounceId: 0,
      Title: '',
      Content: '',
      Type: '',
      AttFileLength: 0,
      AttFileNameOri: '',
      AttFileNameUni: '',
      EffectedDate: '',
      Status: 1,
      Remark: ''
    }
  }

  handleEdit(index: any, row: any) {
    console.log(index, row)
    this.noticeForm.AnnounceId = row.AnnounceId
    this.noticeForm.Title = row.Title
    this.noticeForm.Content = row.Content
    this.noticeForm.Title = row.Title
    this.noticeForm.Type = row.Type
    this.noticeForm.AttFileLength = row.AttFileLength
    this.noticeForm.AttFileNameOri = row.AttFileNameOri
    this.noticeForm.EffectedDate = row.EffectedDate
    this.noticeForm.Status = row.Status
    this.noticeForm.Remark = row.Remark
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
    console.log(row.AnnounceId)
    await NoticeApi.DeleteNotice(row.AnnounceId)

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
