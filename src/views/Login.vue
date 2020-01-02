<template>
  <div id="login">
    <el-tabs type="border-card">
      <el-tab-pane label="账号登录">
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
          <!--           <el-form-item label="Confirm" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Age" prop="age">
            <el-input v-model.number="ruleForm2.age"></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
            <el-button @click="resetForm('ruleForm2')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="员宝扫码登录">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { userLogin, login } from "../api/user";
import { Message } from "element-ui";
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class extends Vue {
  checkAge(rule: any, value: any, callback: any) {
    if (!value) {
      return callback(new Error("Please input the age"));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error("Please input digits"));
      } else {
        if (value < 18) {
          callback(new Error("Age must be greater than 18"));
        } else {
          callback();
        }
      }
    }, 1000);
  }

  validateAccount(rule: any, value: any, callback: any) {
    if (value === "") {
      callback(new Error("Please input the account"));
    } else {
      callback();
    }
  }

  validatePass(rule: any, value: any, callback: any) {
    if (value === "") {
      callback(new Error("Please input the password"));
    } else {
      if (this.ruleForm2.checkPass !== "") {
        (this.$refs.ruleForm2 as any).validateField("checkPass");
      }
      callback();
    }
  }

  validatePass2(rule: any, value: any, callback: any) {
    if (value === "") {
      callback(new Error("Please input the password again"));
    } else if (value !== this.ruleForm2.pass) {
      callback(new Error("Two inputs don't match!"));
    } else {
      callback();
    }
  }

  ruleForm2 = {
    account: "",
    pass: "",
    checkPass: "",
    age: ""
  };

  rules2 = {
    account: [{ validator: this.validateAccount, trigger: "blur" }],
    pass: [{ validator: this.validatePass, trigger: "blur" }],
    //checkPass: [{ validator: this.validatePass2, trigger: "blur" }],
    //age: [{ validator: this.checkAge, trigger: "blur" }]
  };

  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        debugger;

        // login('F2846595','123').then(res => {
        //   console.log(res)
        // }).catch(err => {
        //   console.error(err)
        // })
        userLogin(this.ruleForm2.account, this.ruleForm2.pass)
          .then(res => {
            this.$router.push("/scheduler").catch(err => {
              console.error(err);
            });
          })
          .catch(e => {
            Message.error(e.msg || "Has Error");
          });
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  resetForm(formName: string) {
    (this.$refs[formName] as any).resetFields();
  }
}
</script>

<style>
</style>