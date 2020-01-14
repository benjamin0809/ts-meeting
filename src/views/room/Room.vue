<template>
  <div style="padding:0px 40px 20px 20px;">
    <div class="page-title">
      {{ $t('room.roomManage') }}
      <el-button
        size="mini"
        type="primary"
        style="margin-left:20px;"
        @click="addRoom"
      >
        {{ $t('room.add') }}
      </el-button>
    </div>
    <el-dialog
      :title="
        roomForm.RoomID ? $t('room.dialogTitle1') : $t('room.dialogTitle')
      "
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetForm('roomForm')"
    >
      <el-form
        :model="roomForm"
        :rules="rules"
        ref="roomForm"
        label-width="100px"
      >
        <el-form-item :label="$t('room.name')" prop="name">
          <el-input
            type="text"
            v-model="roomForm.RoomName"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('room.site')" prop="site">
          <el-select
            v-model="roomForm.Site"
            :placeholder="$t('room.pleaseChoose')"
          >
            <el-option
              v-for="item in siteData"
              :key="item.CodeId"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('room.valid')" prop="valid">
          <el-radio-group v-model="roomForm.StatusID">
            <el-radio :label="1">{{$t('common.enable')}}</el-radio>
            <el-radio :label="0">{{$t('common.disable')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('room.deptCode')" prop="deptId">
          <el-input
            type="text"
            v-model="roomForm.DeptID"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('room.position')" prop="position">
          <el-input
            type="text"
            v-model="roomForm.Position"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('room.device')" prop="device">
          <el-input
            type="text"
            v-model="roomForm.Device"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('roomForm')">{{
          $t('room.cancel')
        }}</el-button>
        <el-button type="primary" @click="submitForm('roomForm')">{{
          $t('room.confirm')
        }}</el-button>
      </span>
    </el-dialog>

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date" />
          {{ $t('room.all') }}
        </span>
        <!--         所有会议室 -->
        <el-table
          :data="listData"
          border
          style="width: 100%"
          :empty-text="$t('common.noData')"
        >
          <el-table-column
            prop="RoomName"
            :label="$t('room.name')"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="Position"
            :label="$t('room.position')"
            width="150"
          ></el-table-column>
          <el-table-column :label="$t('room.site')" width="100" align="center">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.Site }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="StatusID"
            :label="$t('room.valid')"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Device"
            :label="$t('room.device')"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="CreatedBy"
            :label="$t('site.creator')"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="CreatedTime"
            :label="$t('site.createTime')"
            sortable
            width="160"
          ></el-table-column>
          <el-table-column
            prop="LastUpdateBy"
            :label="$t('site.updator')"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="LastUpdatedTime"
            :label="$t('site.updateTime')"
            sortable
            width="160"
          ></el-table-column>

          <el-table-column :label="$t('room.operation')" align="center">
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
      </el-tab-pane>
      <!--         厂区会议室 -->
      <el-tab-pane v-for="item in siteData" :label="item.Name" :key="item.Code">
        <el-table
          :data="listData.filter(p => p.Site == item.Code)"
          style="width: 100%"
          :empty-text="$t('common.noData')"
        >
          <el-table-column
            prop="RoomName"
            :label="$t('room.name')"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="Position"
            :label="$t('room.position')"
            width="150"
          ></el-table-column>
          <el-table-column :label="$t('room.site')" width="100" align="center">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.Site }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="StatusID"
            :label="$t('room.valid')"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Device"
            :label="$t('room.device')"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="CreatedBy"
            :label="$t('site.creator')"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="CreatedTime"
            :label="$t('site.createTime')"
            sortable
            width="160"
          ></el-table-column>
          <el-table-column
            prop="LastUpdateBy"
            :label="$t('site.updator')"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="LastUpdatedTime"
            :label="$t('site.updateTime')"
            sortable
            width="160"
          ></el-table-column>
          <el-table-column :label="$t('room.operation')" align="center">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import Component from 'vue-class-component'
import { dateFormat } from '../../utils/date'
import RoomApi from '@/api/admin'
import {
  UpdateSiteEntity,
  CreateSiteEntity,
  ISite,
  IRoom,
  UpdateMeetingRoomEntity,
  CreateMeetingRoomEntity,
  MeetingRoomEntity
} from '@/models'

@Component({
  name: 'manage'
})
export default class extends Vue {
  listData: MeetingRoomEntity[] = []
  siteData: ISite[] = []
  async mounted() {
    this.siteData = await RoomApi.GetSites()
    this.refreshList()
  }

  async refreshList() {
    this.listData = await RoomApi.GetRoom()
    console.log('allrooms', this.listData)
    this.listData.forEach(item => {
      item.CreatedTime &&
        (item.CreatedTime = moment(item.CreatedTime).format('YYYY-MM-DD HH:mm:ss'))

      item.LastUpdatedTime &&
        (item.LastUpdatedTime = moment(item.LastUpdatedTime).format('YYYY-MM-DD HH:mm:ss'))
    })
  }

  dialogVisible = false
  roomForm: IRoom = {
    RoomID: 0,
    RoomName: '',
    Site: '',
    DeptID: '',
    Position: '',
    StatusID: 1,
    ExtInt1: 0,
    ExtInt2: 0,
    Device: ''
  }

  addRoom() {
    this.dialogVisible = true
  }

  validateName(rule: any, value: any, callback: any) {
    if (this.roomForm.RoomName === '') {
      callback(new Error(this.$t('room.nameHint').toString()))
    } else {
      callback()
    }
  }
  validateSite(rule: any, value: any, callback: any) {
    if (this.roomForm.Site === '') {
      callback(new Error(this.$t('room.siteHint').toString()))
    } else {
      callback()
    }
  }

  rules = {
    name: [{ validator: this.validateName, trigger: 'blur' }],
    site: [{ validator: this.validateSite, trigger: 'change' }]
  }

  submitForm(formName: string) {
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {
        this.dialogVisible = false
        const entity: CreateMeetingRoomEntity = {
          RoomName: this.roomForm.RoomName,
          DeptID: this.roomForm.DeptID,
          Position: this.roomForm.Position,
          StatusID: this.roomForm.StatusID,
          ExtInt1: this.roomForm.ExtInt1,
          ExtInt2: this.roomForm.ExtInt2,
          Device: this.roomForm.Device,
          Site: this.roomForm.Site
        }
        console.log('submit:',this.roomForm)
        // 判断是新增还是编辑
        if (this.roomForm.RoomID) {
          const updateEntity: UpdateMeetingRoomEntity = {
            RoomID: this.roomForm.RoomID,
            ...entity
          }
          console.log('updateEntity',updateEntity)
          await RoomApi.UpdateRoom(updateEntity)
          this.resetForm(formName)
        } else {
          // 添加到數據表中
          await RoomApi.AddRoom(entity)
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
    this.roomForm = {
      RoomID: 0,
      RoomName: '',
      Site: '',
      DeptID: '',
      Position: '',
      StatusID: 1,
      ExtInt1: 0,
      ExtInt2: 0,
      Device: ''
    }
  }

  handleEdit(index: any, row: any) {
    console.log(index, row)
    this.roomForm.RoomID = row.RoomID
    this.roomForm.RoomName = row.RoomName
    this.roomForm.Site = row.Site
    this.roomForm.DeptID = row.DeptID
    this.roomForm.Position = row.Position
    this.roomForm.StatusID = row.StatusID
    this.roomForm.Device = row.Device
    console.log('editRoom:',this.roomForm)
    this.dialogVisible = true
  }

  handleDelete(index: any, row: any) {
    this.$confirm(this.$t('common.deleteConfirm').toString(), {
      cancelButtonText: this.$t('common.cancel').toString(),
      confirmButtonText: this.$t('common.confirm').toString()
    })
      .then(_ => {
        // 删除操作
        this.delete(index, row)
      })
      .catch(_ => {
        console.log('取消了删除')
      })
  }
  async delete(index: any, row: any) {
    // 接口刪除
    await RoomApi.DeleteRoom(row.RoomID)
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
