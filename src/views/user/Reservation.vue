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
        label="会议主题"
        align="left"
        width="250"
      ></el-table-column>
      <el-table-column label="會議室" width="300" align="left">
        <template slot-scope="scope">
          {{ scope.row.RoomName }}
          <el-tag size="medium">{{ scope.row.RoomSite }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="StartTime"
        label="開始時間"
        align="left"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="EndTime"
        label="結束時間"
        align="left"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="Remark"
        label="備註"
        align="center"
        width="130"
      ></el-table-column>
      <el-table-column
        prop="Tel"
        label="聯繫方式"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="CreatedTime"
        label="創建時間"
        align="center"
        sortable
        width="200"
      ></el-table-column>
      <el-table-column :label="$t('site.operation')" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.canCancel" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">取消</el-button>
          <el-tag v-if="!scope.row.canCancel" size="medium" type="info">已完成</el-tag>
        </template>
      </el-table-column>
    </el-table>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import RoomApi from '@/api/room'
import moment from 'moment'
@Component
export default class extends Vue {
  myData: any[] = []
      // select b.RoomID,b.RoomName,a.RecID,a.MeetingMemo,a.StartTime,a.EndTime,a.Remark,a.Tel,a.CreatedBy,a.CreatedTime
  mounted() {
    this.myData = [
      { RecID: 1, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-02 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-01 10:00:00.000' } ,
      { RecID: 2, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-03 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-02 10:00:00.000' } ,
      { RecID: 3, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-04 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-03 10:00:00.000' } ,
      { RecID: 4, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-05 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-04 10:00:00.000' } ,
      { RecID: 5, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-06 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-05 10:00:00.000' } ,
      { RecID: 6, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-07 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-06 10:00:00.000' } ,
      { RecID: 7, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-08 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-07 10:00:00.000' } ,
      { RecID: 8, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-09 08:00:00.000',EndTime: '2020-01-02 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-08 10:00:00.000' } ,
      { RecID: 9, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-14 08:00:00.000',EndTime: '2020-01-14 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-13 10:00:00.000' } ,
      { RecID: 10, RoomName: 'E7棟4樓視訊會議室1',RoomSite: '龍華',MeetingMemo: 'SuperD 裸視3D方案介紹',StartTime: '2020-01-15 08:00:00.000',EndTime: '2020-01-15 10:00:00.000',Remark: '',Tel: '560-68962',CreatedBy: 'F2846759',CreatedTime: '2020-01-14 10:00:00.000' }
    ]
    for (let item of this.myData) {
      item.StartTime = moment(item.StartTime).format('YYYY-MM-DD HH:mm:ss')
      item.EndTime = moment(item.EndTime).format('YYYY-MM-DD HH:mm:ss')
      item.CreatedTime = moment(item.CreatedTime).format('YYYY-MM-DD HH:mm:ss')
      if (moment(item.StartTime).isBefore(moment(), 'day')) {
        item.canCancel = false
      } else {
        item.canCancel = true
      }

    }
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
    // await SiteApi.DeleteSite(row.CodeId)
    this.$message(this.$t('common.deleteSuccess').toString())
    // 更新頁面數據
    // this.refreshList()
  }

}
</script>

<style lang="scss" scoped>

</style>
