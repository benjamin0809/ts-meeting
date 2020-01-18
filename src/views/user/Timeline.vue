<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of timeline"
        :key="index"
        :timestamp="item.timestamp"
        placement="top"
        :icon="item.icon"
        :type="item.type"
        :color="item.color"
        :size="item.size"
      >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { IUserInfo } from '../../models'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import {
  ISite,
  IRoom,
  INotice,
  IRole,
  IUserMeetingRoom,
  IUserRole,
  ITimelineItem
} from '@/models'
import UserApi from '@/api/user'
import moment from 'moment'
@Component
export default class extends Vue {
  @State private user!: IUserInfo
  timeline: ITimelineItem[] = []
  mySiteData: ISite[] = []
  myRoomData: IRoom[] = []
  myNoticeData: INotice[] = []
  myRoleData: IRole[] = []
  mySetRoleData: IUserRole[] = []
  myReserveData: IUserMeetingRoom[] = []
  async mounted() {
    this.getTimelineData().then(() => {
      if (this.mySiteData.length > 0) {
        this.mySiteData.forEach(data => {
          let item: ITimelineItem = {
            timestamp: moment(data.CreatedTime).format('YYYY-MM-DD HH:mm:ss'),
            title: this.$t('timeline.addSite').toString() ,
            content: '你添加了一個會議室廠區：' + data.Name,
            icon: 'el-icon-office-building',
            type: 'primary',
            color: ''
          }
          this.timeline.push(item)
        })
      }

      if (this.myRoomData.length > 0) {
        this.myRoomData.forEach(data => {
          let item: ITimelineItem = {
            timestamp: moment(data.CreatedTime).format('YYYY-MM-DD HH:mm:ss'),
            title: this.$t('timeline.addRoom').toString(),
            content:
              '你添加了一個會議室：' + data.RoomName + '(' + data.Site + ')',
            icon: 'el-icon-s-platform',
            type: 'success',
            color: ''
          }
          this.timeline.push(item)
        })
      }

      if (this.myNoticeData.length > 0) {
        this.myNoticeData.forEach(data => {
          let item: ITimelineItem = {
            timestamp: moment(data.CreatedTime).format('YYYY-MM-DD HH:mm:ss'),
            title: this.$t('timeline.addNotice').toString(),
            content: '你添加了一個公告：' + data.Content,
            icon: 'el-icon-message-solid',
            type: 'warning',
            color: ''
          }
          this.timeline.push(item)
        })
      }

      if (this.myRoleData.length > 0) {
        this.myRoleData.forEach(data => {
          let item: ITimelineItem = {
            timestamp: moment(data.CreateDate).format('YYYY-MM-DD HH:mm:ss'),
            title: this.$t('timeline.addRole').toString(),
            content:
              '你添加了一個角色：' +
              data.RoleName +
              '(' +
              data.Description +
              ')',
            icon: 'el-icon-user-solid',
            type: 'info',
            color: ''
          }
          this.timeline.push(item)
        })
      }

      if (this.mySetRoleData.length > 0) {
        this.mySetRoleData.forEach(data => {
          let item: ITimelineItem = {
            timestamp: moment(data.CreatedTime).format('YYYY-MM-DD HH:mm:ss'),
            title: this.$t('timeline.setUserRole').toString(),
            content: '你設置了' + data.UserName + '為' + data.RoleName,
            icon: 'el-icon-office-building',
            type: 'primary',
            color: ''
          }
          this.timeline.push(item)
        })
      }

      if (this.myReserveData.length > 0) {
        this.myReserveData.forEach(data => {
          let item: ITimelineItem = {
            timestamp: moment(data.CreatedTime).format('YYYY-MM-DD HH:mm:ss'),
            title: this.$t('timeline.reserveRoom').toString(),
            content:
              '你預定了一個會議室：' +
              data.RoomName +
              '(' +
              data.MeetingMemo +
              ' ' +
              moment(data.StartTime).format('YYYY-MM-DD HH:mm:ss') +
              '~' +
              moment(data.EndTime).format('YYYY-MM-DD HH:mm:ss') +
              ')',
            icon: 'el-icon-success',
            type: 'danger',
            color: ''
          }
          this.timeline.push(item)
        })
      }

      this.timeline.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    })
  }

  async getTimelineData() {
    const param = this.user.UserNo
    this.mySiteData = await UserApi.GetUserCreateSites(param)
    this.myRoomData = await UserApi.GetUserCreateRooms(param)
    this.myNoticeData = await UserApi.GetUserCreateAnnounces(param)
    this.myRoleData = await UserApi.GetUserCreateRoles(param)
    this.mySetRoleData = await UserApi.GetUserSetAdmin(param)
    this.myReserveData = await UserApi.GetUserReservations(param)
  }
}
</script>

<style>
.el-timeline-item__node {
  padding: 5px;
  margin-left: -5px;
}
.el-timeline-item__timestamp {
  text-align: left;
}
.el-card__body {
  text-align: left;
}
</style>
