<template>
  <div id="login" >
    <!-- :style="{ backgroundImage: 'url(' + bg  + ')' }" -->
    <div class="box">
      <!-- <div class="left-box">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div> -->

      <!-- <div class="right-box"> -->
        <!-- <el-tabs type="border-card" class="login-card"> -->
          <!-- <el-tab-pane :label="$t('login.byAccount')"> -->
            <el-card shadow="always">

                <h2 class="login-desc">用户身份验证</h2>
    
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              status-icon
              :rules="rules2"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item prop="account" class="margin-h-16">
                <el-input
                  v-model="ruleForm.account"
                  type="text"
                  auto-complete="off"
                ><template slot="prepend"><svg-icon class="icon"
                  name="account"
                /></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="pass" class="margin-h-16">
                <el-input
                  v-model="ruleForm.pass"
                  type="password"
                  auto-complete="off"
                  ><template slot="prepend"><svg-icon class="icon"
                  name="password"
                /></template>
                </el-input>
              </el-form-item>
              <!--      workflow登录提示 -->
            <div v-for="(item, index) in showHints" :key="index" class="hint">
              {{ item.index }}. {{ item.content }}
            </div>
              <el-form-item class="margin-h-16"> 
                <!-- <el-button @click="resetForm('ruleForm')" :disabled="loading">{{
                  $t('login.reset')
                }}</el-button> -->
                <el-button class="login-button"
                  type="primary"
                  :disabled="!ruleForm.account || !ruleForm.pass" 
                  @click="submitForm('ruleForm')"
                  :loading="loading"
                  >{{ $t('login.submit') }}</el-button
                >
                
              </el-form-item>
            </el-form>

            
            <!--      选择语言 -->
            <el-row>
              <el-button
                v-for="lang in langs"
                :key="lang.code"
                size="medium"
                type="primary"
                plain
                @click="changeLang(lang)"
                >{{ lang.lang }}</el-button
              >
            </el-row>
            </el-card>
          <!-- </el-tab-pane> -->

          <!-- <el-tab-pane :label="$t('login.byiProud')">Config</el-tab-pane>
        </el-tabs> -->
      </div>
      <!--     -->
    </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Message } from 'element-ui'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Action } from 'vuex-class'
import { DesHelper } from '@/utils/des'
import { LANGUAGES, LOGIN_HINTS } from '@/constant'
import { moduleUser } from '@/store/user'
@Component
export default class extends Vue {
  loading = false
  langs = LANGUAGES
  changeLang(lang: any) {
    this.$i18n.locale = lang.code
    localStorage.setItem('lang', lang.code)
    window.location.reload()
  }

  hints = LOGIN_HINTS
  hintItem = this.hints.find(p => p.lang === localStorage.getItem('lang')) || this.hints[0]

  showHints = this.hintItem && this.hintItem.hints

  validateAccount(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(this.$t('login.accHint').toString()))
    } else {
      callback()
    }
  }

  validatePass(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(this.$t('login.passHint').toString()))
    } else {
      if (this.ruleForm.checkPass !== '') {
        console.log('')
        ;(this.$refs.ruleForm as any).validateField('checkPass')
      }
      callback()
    }
  }

  ruleForm = {
    account: '',
    pass: '',
    checkPass: ''
  }

  rules2 = {
    account: [{ validator: this.validateAccount, trigger: 'blur' }],
    pass: [{ validator: this.validatePass, trigger: 'blur' }]
  }

  submitForm(formName: string) {
    // submit
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        try {
          // await login(this.ruleForm.account, this.ruleForm.pass)
          await moduleUser.login({
            account: this.ruleForm.account,
            password: this.ruleForm.pass
          })
          this.loading = false
          let defaultRoute = '/home'
          // console.log(moduleUser.UserNo)
          if (this.$route.query.redirect) {
            defaultRoute = this.$route.query.redirect as string
          }
          // debugger
          this.$router.push(defaultRoute).catch(err => {
            console.error(err)
          })
        } catch (e) {
          this.loading = false
        }
        return false
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  resetForm(formName: string) {
    (this.$refs[formName] as any).resetFields()
  }

  created() {
    // register('asdadsdasd', '123').then(res => {
    //   console.log(res)
    // })
    // console.log(DesHelper.DesEncrypt('123', '123'))
//     let xhr = new XMLHttpRequest()
// xhr.timeout = 3000
// xhr.ontimeout = function (event) {
//       alert('请求超时！')
//     }
// xhr.open('GET', 'http://www.popochiu.com/file/base64/getpdf')
// xhr.send()
// xhr.onreadystatechange = function () {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//             // alert(xhr.responseText);
//         }
//       else {
//           // alert(xhr.statusText)
//         }
//     }
  }
}
</script>

<style lang="scss" scoped>
.login-desc{
  text-align: center;
}
#login::after {
  clear: both;
  content: '';
  display: block;
}
#login {
  position: fixed;
  background: url(../assets/login.jpg);
  top:0;
  bottom: 0;
  left:0;
  right:0;
}

.box {
    margin: auto;
    max-width: 400px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
.box::after {
  clear: both;
  content: '';
  display: block;
}

.left-box {
  margin-top: 15%;
  float: left;
  width: 600px;
  //min-width: 50%;
}

.right-box {
  margin-top: 15%;
  float: right;
  width: 400px;
  margin-left: 20px;
}
.login-card {
  height: 400px;
}
.el-row{
  margin-left: 16px;
  .el-button{
    width: 30%;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__container {
  height: 400px !important;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.hint {
  margin-left: 16px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 10px;
  color: #909399;
}

.login-button{
  width: 100%;
}

.icon {
  width: 1.2em !important;
  height: 1.2em !important;
  fill:#475669;
}
 

// body{
//   background: $theme-color;
//   // background-image: url('../assets/login.jpg');
// }
</style>
