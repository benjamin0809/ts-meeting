<template>
  <div id="login">

    <div class="left-box">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="right-box">
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('login.byAccount')">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Account" prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
            <el-button @click="resetForm('ruleForm2')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="员宝扫码登录">Config</el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from 'element-ui'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Action } from 'vuex-class'
@Component
export default class extends Vue {
  @Action('login') private login!: any
  checkAge (rule: any, value: any, callback: any) {
    if (!value) {
      return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
      } else {
        if (value < 18) {
          callback(new Error('Age must be greater than 18'))
        } else {
          callback()
        }
      }
    }, 1000)
  }

  validateAccount (rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('Please input the account'))
    } else {
      callback()
    }
  }

  validatePass (rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('Please input the password'))
    } else {
      if (this.ruleForm2.checkPass !== '') {
        (this.$refs.ruleForm2 as any).validateField('checkPass')
      }
      callback()
    }
  }

  validatePass2 (rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== this.ruleForm2.pass) {
      callback(new Error("Two inputs don't match!"))
    } else {
      callback()
    }
  }

  ruleForm2 = {
    account: '',
    pass: '',
    checkPass: '',
    age: ''
  }

  rules2 = {
    account: [{ validator: this.validateAccount, trigger: 'blur' }],
    pass: [{ validator: this.validatePass, trigger: 'blur' }]
  }

  submitForm (formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.login({ account: this.ruleForm2.account, password:  this.ruleForm2.pass }).then((res: any) => {
          this.$router.push('/scheduler').catch(err => {
            console.error(err)
          })
        }).catch((e: any) => {
          Message.error(e.msg || 'Has Error')
        })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  resetForm (formName: string) {
    (this.$refs[formName] as any).resetFields()
  }

  created () {
    console.log(this.$i18n.t('login.byAccount'))
  }
}
</script>

<style lang="scss" scope>

  #login::after{
    clear: both;
    content: '';
    display: block;
  }

  .left-box{
    margin-top: 15%;
    float: left;
    width: auto;
    min-width: 50%;
  }

  .right-box{
    margin-top: 15%;
    float: right;
    width: 30%;
    margin-right:24px;
  }
  .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }
 .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>