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

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2020/01/05 20:46',
          title: '添加廠區',
          content: '你添加了一個會議室廠區：南京 ',
          icon: 'el-icon-office-building',
          type: 'primary',
          color: '',
          size: ''
        },
        {
          timestamp: '2020/01/10 20:46',
          title: '刪除廠區',
          content: '你刪除了一個會議室廠區：南京 ',
          icon: 'el-icon-office-building',
          type: 'danger',
          color: '',
          size: ''
        },
        {
          timestamp: '2020/01/12 20:46',
          title: '添加公告',
          content:
            '你添加了一個公告：贵阳视讯会议室使用完毕后请及时通知管理员 周天卫：583-62628 ， 周安：583-61111 关闭视讯设备',
          icon: 'el-icon-message-solid',
          type: 'primary',
          color: '',
          size: ''
        },
        {
          timestamp: '2020/01/14 20:46',
          title: '預定會議室',
          content:
            '你預定了一個會議室：龍華F7棟1F會議室二，會議主題：檢討會議 ',
          icon: 'el-icon-s-platform',
          type: 'success',
          color: '',
          size: 'large'
        }
      ]
    }
  }
}
</script>

<style>
.el-timeline-item__node {
  padding: 5px;
  margin-left: -5px;
}
</style>
