<template>
  <div id="login">
    <div class="box">
      <div class="left-box">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="right-box">
        <el-tabs type="border-card" class="login-card">
          <el-tab-pane :label="$t('login.byAccount')">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              status-icon
              :rules="rules2"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item :label="$t('login.account')" prop="account">
                <el-input
                  v-model="ruleForm.account"
                  type="text"
                  auto-complete="off"
                />
              </el-form-item>
              <el-form-item :label="$t('login.pass')" prop="pass">
                <el-input
                  v-model="ruleForm.pass"
                  type="password"
                  auto-complete="off"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary" native-type="submit"
                  @click="submitForm('ruleForm')"
                  :loading="loading"
                  >{{ $t('login.submit') }}</el-button
                >
                <el-button @click="resetForm('ruleForm')" :disabled="loading">{{
                  $t('login.reset')
                }}</el-button>
              </el-form-item>
            </el-form>
            <!--      workflow登录提示 -->
            <div v-for="(item, index) in showHints" :key="index" class="hint">
              {{ item.index }}. {{ item.content }}
            </div>
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
          </el-tab-pane>

          <el-tab-pane :label="$t('login.byiProud')">Config</el-tab-pane>
        </el-tabs>
      </div>
      <!--     -->
    </div>
  </div>
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
  hintItem = this.hints.find(p => p.lang === localStorage.getItem('lang'))

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
          await moduleUser.login({
            account: this.ruleForm.account,
            password: this.ruleForm.pass
          })
          this.loading = false
          let defaultRoute = '/scheduler'
          if (this.$route.query.redirect) {
            defaultRoute = this.$route.query.redirect as string
          }
          this.$router.push(defaultRoute).catch(err => {
            console.error(err)
          })
        } catch (e) {
          this.loading = false
        }
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
    // console.log(DesHelper.DesEncrypt('123', '123'))
  }
}
</script>

<style lang="scss" scope>
#login::after {
  clear: both;
  content: '';
  display: block;
}
#login {
  position: relative;
  background: url('/assets/login.jpg')
}

.box {
  margin: auto;
  width: 1020px;
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
  text-align: left;
  font-size: 14px;
  margin-bottom: 10px;
  color: #909399;
}
</style>
