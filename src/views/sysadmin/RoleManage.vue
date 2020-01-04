<template>
  <div>
    <div class="page-title">
      角色管理
      <el-button size="mini" type="primary" @click="addRole" style="margin-left:20px;">添加角色</el-button>
    </div>

    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      ref="roleDialog"
      @close="resetForm('roleForm')"
    >
      <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
        <el-form-item label="角色代码" prop="code">
          <el-input type="text" v-model="roleForm.code" auto-complete="off" placeholder></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input type="text" v-model="roleForm.name" auto-complete="off" placeholder></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input type="text" v-model="roleForm.description" auto-complete="off" placeholder></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree :data="menus" show-checkbox node-key="id" :props="defaultProps"></el-tree>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('roleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="code" label="角色代码" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="180" align="center"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column prop="tag" label="角色类型" width="180" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.tag"
            :type="scope.row.tag === '系统' ? 'primary' : 'success'"
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { dateFormat } from "../../utils/date";
@Component
export default class RoleManage extends Vue {
  menus = [
    {
      id: 1,
      label: "一级 1",
      children: [
        {
          id: 7,
          label: "二级 1-1",
          children: [
            {
              id: 10,
              label: "三级 1-1-1"
            },
            {
              id: 11,
              label: "三级 1-1-2"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: "一级 2",
      children: [
        {
          id: 8,
          label: "二级 2-1"
        },
        {
          id: 9,
          label: "二级 2-2"
        }
      ]
    },
    {
      id: 3,
      label: "一级 3"
    },
    {
      id: 4,
      label: "一级 4"
    },
    {
      id: 5,
      label: "一级 5"
    },
    {
      id: 6,
      label: "一级 6"
    }
  ];

  defaultProps = {
    children: "children",
    label: "label"
  };

  tableData = [
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

  dialogVisible = false;
  roleForm = {
    id: 0,
    code: "",
    name: "",
    description: "",
    ModifyTime: "",
    ModifyUser: ""
  };

  addRole() {
    this.dialogVisible = true;
  }

  rules = {
    code: [{ required: true, message: "请填写角色代码", trigger: "blur" }],
    name: [{ required: true, message: "请填写角色名称", trigger: "blur" }],
    description: [
      { required: true, message: "请填写角色名称", trigger: "blur" }
    ]
  };
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.dialogVisible = false;
        //判断是新增还是编辑
        const index = this.tableData.findIndex(p => p.id == this.roleForm.id);
        if (index > -1) {
          let updateItem = this.tableData.find(p => p.id == this.roleForm.id);
          if (updateItem) {
            updateItem.code = this.roleForm.code;
            updateItem.name = this.roleForm.name;
            updateItem.description = this.roleForm.description;
          }
        } else {
          this.tableData.push({
            id: Math.random(),
            code: this.roleForm.code,
            name: this.roleForm.name,
            description: this.roleForm.description
          });
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
    this.roleForm.id = row.id;
    this.roleForm.code = row.code;
    this.roleForm.name = row.name;
    this.roleForm.description = row.description;
    this.dialogVisible = true;
  }
  handleDelete(index: any, row: any) {
    let a = this.tableData.findIndex(p => p.id == row.id);
    this.tableData.splice(a, 1);
    console.log(index, row);
  }
}
</script>

<style>
</style>
