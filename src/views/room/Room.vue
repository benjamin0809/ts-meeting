<template>
  <div>
    <div class="page-title">
      会议室管理
      <el-button size="mini" type="primary" @click="addRoom" style="margin-left:20px;">添加</el-button>
    </div>

    <el-dialog
      title="添加会议室"
      :visible.sync="dialogVisible"
      width="30%"
      ref="roomDialog"
      @close="resetForm('roomForm')"
    >
      <el-form :model="roomForm" :rules="rules" ref="roomForm">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="roomForm.name" auto-complete="off" placeholder></el-input>
        </el-form-item>
        <el-form-item label="厂区" prop="site">
          <el-select v-model="roomForm.site" placeholder="请选择">
            <el-option
              v-for="item in siteData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('roomForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('roomForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> All
        </span>
        <el-table :data="roomData" style="width: 100%">
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column label="名称" width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="厂区" width="180">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.site }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-for="item in siteData" :label="item.label">
        <el-table :data="roomData.filter(p=>p.site==item.value)" style="width: 100%">
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column label="名称" width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="厂区" width="180">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.site }}</el-tag>
            </template>
          </el-table-column>
          <!-- align="right" -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { dateFormat } from "../../utils/date";
@Component({
  name: "manage"
})
export default class extends Vue {
  siteData = [
    {
      date: "2020-01-02",
      label: "龙华",
      value: "LH"
    },
    {
      date: "2020-01-02",
      label: "贵阳",
      value: "GY"
    }
  ];

  roomData = [
    {
      id: 1,
      date: "2016-05-02",
      name: "E7棟4樓視訊會議室2",
      site: "LH"
    },
    {
      id: 2,
      date: "2016-05-04",
      name: "E7棟4樓視訊會議室1",
      site: "LH"
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "貴陽1.5F教育訓練室（一）",
      site: "GY"
    },
    {
      id: 4,
      date: "2016-05-03",
      name: "貴陽1.5F教育訓練室（二）",
      site: "GY"
    }
  ];

  dialogVisible = false;
  roomForm = {
    id: 0,
    name: "",
    site: "",
    ModifyTime: "",
    ModifyUser: ""
  };

  addRoom() {
    this.dialogVisible = true;
  }

  validateSite(rule: any, value: any, callback: any) {
    if (this.roomForm.site === "") {
      callback(new Error("请选择会议室厂区"));
    } else {
      callback();
    }
  }

  rules = {
    name: [{ required: true, message: "请填写会议室名称", trigger: "blur" }],
    site: [{ validator: this.validateSite, trigger: "change" }]
  };

  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.dialogVisible = false;
        //判断是新增还是编辑
        const index = this.roomData.findIndex(p => p.id == this.roomForm.id);
        if (index > -1) {
          let updateItem = this.roomData.find(p => p.id == this.roomForm.id);
          if (updateItem) {
            updateItem.name = this.roomForm.name;
            updateItem.site = this.roomForm.site;
          }
          //this.resetForm(formName);
        } else {
          this.roomData.push({
            id: Math.random(),
            date: dateFormat(new Date()),
            name: this.roomForm.name,
            site: this.roomForm.site
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
    this.roomForm.id = row.id;
    this.roomForm.name = row.name;
    this.roomForm.site = row.site;
    this.dialogVisible = true;
  }

  handleDelete(index: any, row: any) {
    let a = this.roomData.findIndex(p => p.name == row.name);
    this.roomData.splice(a, 1);
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