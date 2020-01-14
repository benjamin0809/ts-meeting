<template>
  <div style="padding:20px 40px 20px 20px;">
    <div class="page-title">个人设置</div>

    <el-form ref="form" :model="form" label-width="120px" class="form">
      <el-form-item label="我的邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item align="left">
        <el-switch v-model="form.send"></el-switch>
        预定成功发邮件提醒我
      </el-form-item>  
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'setting'
})
export default class extends Vue {
  form = {
    email: 'amy.rm.li@mail.foxconn.com',
    send: true
  }
  onSubmit() {
    console.log('submit!')
  }
}
</script>

<style>
.page-title {
  text-align: left;
  padding: 20px 0px;
  font-size: 20px;
}
.form {
  width: 50%;
  border: 1px solid #f4f5f7;
  padding: 20px;
  background: aliceblue;
}
</style>
