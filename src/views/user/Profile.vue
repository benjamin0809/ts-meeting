<template>
  <div
    v-if="user.Id"
    class="profile-container"
  >
    <el-row :gutter="20">
      <el-col
        :span="6"
        :xs="24"
      >
        <user-card :user="user" />
      </el-col>

      <el-col
        :span="18"
        :xs="24"
      >
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane
              label="我的预定"
              name="reservation"
            >
              <reservation />
            </el-tab-pane>
            <el-tab-pane
              label="Timeline"
              name="timeline"
            >
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
import { dateFormat } from '../../utils/date'
import UserCard from './UserCard.vue'
import Reservation from './Reservation.vue'
import Timeline from './Timeline.vue'

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
  created() {
    console.log('currentUser:', this.user)
  }
}
</script>

<style  lang="scss" scope>
.profile-container {
  padding: 20px 20px 0 0;
}
</style>
