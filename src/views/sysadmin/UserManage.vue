<template>
  <div>
    <div class="page-title">
      用户管理
      <!-- <el-button size="mini" type="primary" @click="addRole" style="margin-left:20px;">添加用户</el-button> -->
    </div>

    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="30%"
      ref="userDialog"
      @close="resetForm('userForm')"
    >
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
        <el-form-item label="工号" prop="code">
          <el-input
            :disabled="true"
            type="text"
            v-model="userForm.empNumber"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            :disabled="true"
            type="text"
            v-model="userForm.name"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="厂区" prop="description">
          <el-input
            :disabled="true"
            type="text"
            v-model="userForm.site"
            auto-complete="off"
            placeholder
          ></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="userForm.role">
            <el-radio v-for="item of roleData" :label="item.code">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('userForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="userData" border style="width: 100%">
      <el-table-column prop="empNumber" label="工号" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="site" label="厂区" width="180" align="center"></el-table-column>
      <el-table-column prop="role" label="角色" width="300" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.role"
            :type="scope.row.role === 'Admin' ? 'primary' : 'success'"
          >{{scope.row.roleName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!--  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination align="right" background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { dateFormat } from "../../utils/date";
@Component
export default class RoleManage extends Vue {
  roleData = [
    {
      id: 1,
      code: "Admin",
      name: "系统管理员",
      description: "Super Administrator. Have access to view all pages.",
      tag: "系统"
    },
    {
      id: 2,
      code: "SiteAdmin",
      name: "厂区管理员",
      description: "可以维护对应厂区的会议室信息及公告通知"
    },
    {
      id: 3,
      code: "User",
      name: "默认普通用户",
      description: "只能预订会议室",
      tag: "默认"
    }
  ];

  userData = [
    {
      id: 1,
      empNumber: "F2846759",
      name: "李如梦",
      site: "龙华",
      role: "Admin",
      roleName: "系统管理员"
    },
    {
      id: 2,
      empNumber: "F2846811",
      name: "张三",
      site: "龙华",
      role: "SiteAdmin",
      roleName: "厂区管理员"
    },
    {
      id: 3,
      empNumber: "F2846235",
      name: "李四",
      site: "贵阳",
      role: "SiteAdmin",
      roleName: "厂区管理员"
    },
    {
      id: 4,
      empNumber: "F2846759",
      name: "李小梦",
      site: "龙华",
      role: "User",
      roleName: "默认普通用户"
    }
  ];

  dialogVisible = false;
  userForm = {
    id: 0,
    empNumber: "",
    name: "",
    site: "",
    role: "",
    roleName: "",
    ModifyTime: "",
    ModifyUser: ""
  };

  /*   addRole() {
    this.dialogVisible = true;
  } */

  rules = {};
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.dialogVisible = false;
        const index = this.userData.findIndex(p => p.id == this.userForm.id);
        if (index > -1) {
          let updateItem = this.userData.find(p => p.id == this.userForm.id);
          if (updateItem) {
            updateItem.role = this.userForm.role;
            let roleItem = this.roleData.find(
              p => p.code == this.userForm.role
            );
            updateItem.roleName = roleItem ? roleItem.name : "User";
          }
        }
        this.resetForm(formName);
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  cancelForm(formName: string) {
    this.dialogVisible = false;
    this.resetForm(formName);
  }

  resetForm(formName: string) {
    (this.$refs[formName] as any).resetFields();
  }

  handleEdit(index: any, row: any) {
    console.log(index, row);
    this.userForm.id = row.id;
    this.userForm.empNumber = row.empNumber;
    this.userForm.name = row.name;
    this.userForm.site = row.site;
    this.userForm.role = row.role;
    this.userForm.roleName = row.roleForm;
    this.dialogVisible = true;
  }

  /* 
  handleDelete(index: any, row: any) {
    let a = this.tableData.findIndex(p => p.id == row.id);
    this.tableData.splice(a, 1);
    console.log(index, row);
  } */
}
</script>

<style>
</style>

