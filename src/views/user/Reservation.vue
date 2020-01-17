<template>
  <el-table
    :data="myData"
    border
    style="width: 100%"
    :empty-text="$t('common.noData')"
    :default-sort="{ prop: 'CreatedTime', order: 'descending' }"
  >
    <el-table-column
      prop="MeetingMemo"
      :label="$t('schedulerDialog.subject')"
      align="left"
      width="230"
    ></el-table-column>
    <el-table-column :label="$t('room.room')" width="280" align="left">
      <template slot-scope="scope">
        {{ scope.row.RoomName }}
        <el-tag size="medium">{{ scope.row.RoomSite }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="StartTime"
      :label="$t('schedulerDialog.startTime')"
      align="left"
      width="200"
      sortable
    ></el-table-column>
    <el-table-column
      prop="EndTime"
      :label="$t('schedulerDialog.endTime')"
      align="left"
      width="200"
      sortable
    ></el-table-column>
    <el-table-column
      prop="Remark"
      :label="$t('schedulerDialog.remark')"
      align="center"
      width="130"
    ></el-table-column>
    <el-table-column
      prop="Tel"
      :label="$t('schedulerDialog.contact')"
      width="100"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="CreatedTime"
      :label="$t('site.createTime')"
      align="center"
      sortable
      width="200"
    ></el-table-column>
    <el-table-column :label="$t('site.operation')" align="center">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.canCancel"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >{{$t('common.cancel')}}</el-button
        >
        <el-tag v-if="!scope.row.canCancel" size="medium" type="info"
          >{{$t('common.completed')}}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { IUserInfo } from '../../models'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { IUserMeetingRoom } from '@/models'
import UserApi from '@/api/userRole'
import RoomApi from '@/api/room'
import moment from 'moment'
@Component
export default class extends Vue {
  @State private user!: IUserInfo
  myData: IUserMeetingRoom[] = []
  async mounted() {
    this.getUserReservations()
  }

  async getUserReservations() {
    const param = this.user.UserNo
    this.myData = await UserApi.GetUserReservations(param)
    this.myData.forEach(item => {
      item.StartTime = moment(item.StartTime).format('YYYY-MM-DD HH:mm:ss')
      item.EndTime = moment(item.EndTime).format('YYYY-MM-DD HH:mm:ss')
      item.CreatedTime = moment(item.CreatedTime).format('YYYY-MM-DD HH:mm:ss')
      if (moment(item.StartTime).isBefore(moment(), 'day')) {
        item.canCancel = false
      } else {
        item.canCancel = true
      }
    })
  }

  handleDelete(index: any, row: any) {
    this.$confirm(this.$t('schedulerDialog.cancelHint').toString(), {
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
    await RoomApi.CancelBookingRoom(row.RecID)
    this.$message(this.$t('common.cancelSuccess').toString())
    // 更新頁面數據
    this.getUserReservations()
  }
}
</script>

<style lang="scss" scoped></style>
