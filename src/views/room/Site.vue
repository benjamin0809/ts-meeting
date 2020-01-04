<template>
  <div>
    <el-dialog
      title="添加会议室厂区"
      :visible.sync="dialogVisible"
      width="30%"
      ref="siteDialog"
      @close="resetForm('siteForm')"
    >
      <el-form :model="siteForm" :rules="rules" ref="siteForm">
        <el-form-item label="Label" prop="label">
          <el-input type="text" v-model="siteForm.label" auto-complete="off" placeholder="如：龙华"></el-input>
        </el-form-item>
        <el-form-item label="Value" prop="value">
          <el-input type="text" v-model="siteForm.value" auto-complete="off" placeholder="LH"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('siteForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('siteForm')">确 定</el-button>
      </span>
    </el-dialog>

    <div class="page-title">
      会议室厂区
      <el-button size="mini" type="primary" @click="addSite" style="margin-left:20px;">添加</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.label }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
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
import { ISite } from "../../models/site";
import { dateFormat } from "../../utils/date";
@Component({
  name: "site"
})
export default class extends Vue {
  tableData = [
    {
      id: 1,
      date: "2020-01-02",
      label: "龙华",
      value: "LH"
    },
    {
      id: 2,
      date: "2020-01-02",
      label: "贵阳",
      value: "GY"
    }
  ];

  dialogVisible = false;
  siteForm = {
    id: 0,
    label: "",
    value: "",
    ModifyTime: "",
    ModifyUser: ""
  };

  addSite() {
    this.dialogVisible = true;
  }

  rules = {
    label: [{ required: true, message: "请填写厂区名称", trigger: "blur" }],
    value: [{ required: true, message: "请填写厂区代码", trigger: "blur" }]
  };
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.dialogVisible = false;
        //判断是新增还是编辑
        const index = this.tableData.findIndex(p => p.id == this.siteForm.id);
        if (index > -1) {
          let updateItem = this.tableData.find(p => p.id == this.siteForm.id);
          if (updateItem) {
            updateItem.label = this.siteForm.label;
            updateItem.value = this.siteForm.value;
          }
          this.resetForm(formName);
        } else {
          this.tableData.push({
            id: Math.random(),
            date: dateFormat(new Date()),
            label: this.siteForm.label,
            value: this.siteForm.value
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
    this.siteForm.id = row.id;
    this.siteForm.label = row.label;
    this.siteForm.value = row.value;
    this.dialogVisible = true;
  }
  handleDelete(index: any, row: any) {
    let a = this.tableData.findIndex(p => p.label == row.label);
    this.tableData.splice(a, 1);
    console.log(index, row);
  }
}
</script>

<style lang="scss" scope>
.page-title {
  text-align: left;
  padding: 20px 0px;
  font-size: 20px;
}
</style>