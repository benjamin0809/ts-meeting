<template>
  <div v-if="user.Id" class="profile-container">
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <user-card :user="user" v-if="isGetUserRole" />
      </el-col>

      <el-col :span="20" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="$t('profile.reservation')" name="reservation">
              <reservation />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.timeline')" name="timeline">
              <timeline />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { IUserInfo } from '../../models'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import UserCard from './UserCard.vue'
import Reservation from './Reservation.vue'
import Timeline from './Timeline.vue'
import { IUserRole } from '@/models'
import UserRoleApi from '@/api/userRole'
import moment from 'moment'

@Component({
  name: 'profile',
  components: {
    UserCard,
    Reservation,
    Timeline
  }
})
export default class Profile extends Vue {
  @State private user!: IUserInfo
  activeTab = 'reservation'
  userData: IUserRole[] = []
  isGetUserRole = false
  async mounted() {
    // 父组件先获得用户角色再传递user给自组件
    this.getUserRole().then(() => {
      this.isGetUserRole = true
    })
  }

  async getUserRole() {
    this.userData = await UserRoleApi.GetUserRoleById(this.user.UserNo)
    if (this.userData.length === 1) {
      const item = this.userData[0]
      item.CreatedTime &&
        (item.CreatedTime = moment(item.CreatedTime).format(
          'YYYY-MM-DD HH:mm:ss'
        ))
      this.user.RoleName = item.RoleName
      this.user.RoleDescription = item.Description
    } else if (this.userData.length === 0) {
      this.user.RoleName = '普通用戶'
      this.user.RoleDescription = '系統的默認用戶，只能預訂會議室'
    }
  }
}
</script>

<style lang="scss" scope>
.profile-container {
  padding: 20px 20px 0 0;
}
</style>
