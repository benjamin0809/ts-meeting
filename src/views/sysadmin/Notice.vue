<template>
  <div>
    <div class="page-title">
      {{$t('notice.noticeManage')}}
      <el-button
        size="mini"
        type="primary"
        @click="addNotice"
        style="margin-left:20px;"
      >{{$t('notice.add')}}</el-button>
    </div>

    <el-dialog
      :title="$t('notice.dialogTitle')"
      :visible.sync="dialogVisible"
      width="30%"
      ref="noticeDialog"
      @close="resetForm('noticeForm')"
    >
      <el-form :model="noticeForm" :rules="rules" ref="noticeForm">
        <el-form-item :label="$t('notice.content')" prop="content">
          <el-input type="text" v-model="noticeForm.Content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('notice.ableSite')" prop="site">
          <el-select v-model="noticeForm.Sites" :placeholder="$t('notice.pleaseChoose')" multiple>
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
        <el-button @click="cancelForm('noticeForm')">{{$t('notice.cancel')}}</el-button>
        <el-button type="primary" @click="submitForm('noticeForm')">{{$t('notice.confirm')}}</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData.filter(data => !search || data.Content.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :empty-text="$t('common.noData')"
    >
      <el-table-column :label="$t('notice.modifyDate')" prop="ModifyDate" width="150"></el-table-column>
      <el-table-column :label="$t('notice.modifyUser')" prop="ModifyUser" width="130"></el-table-column>
      <el-table-column :label="$t('notice.content')" prop="Content"></el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" :placeholder="$t('notice.searchPlaceholder')"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('notice.edit')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >{{$t('notice.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getShowNotices } from "../../api/notice";
import { dateFormat } from "../../utils/date";
@Component
export default class Notice extends Vue {
  search = "";
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

  tableData = getShowNotices();

  noticeForm = {
    Id: 0,
    ModifyDate: "",
    ModifyUser: "李如梦",
    Content: "",
    Sites: []
  };

  dialogVisible = false;
  addNotice() {
    this.dialogVisible = true;
  }

  validateSite(rule: any, value: any, callback: any) {
    if (this.noticeForm.Sites.length === 0) {
      callback(new Error(this.$t("notice.ableSiteHint").toString()));
    } else {
      callback();
    }
  }
  validateContent(rule: any, value: any, callback: any) {
    if (this.noticeForm.Content === "") {
      callback(new Error(this.$t("notice.contentHint").toString()));
    } else {
      callback();
    }
  }
  rules = {
    content: [{ validator: this.validateContent, trigger: "blur" }],
    site: [{ validator: this.validateSite, trigger: "blur" }]
  };

  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        this.dialogVisible = false;
        //判断是新增还是编辑
        const index = this.tableData.findIndex(p => p.Id == this.noticeForm.Id);
        if (index > -1) {
          let updateItem = this.tableData.find(p => p.Id == this.noticeForm.Id);
          if (updateItem) {
            updateItem.Content = this.noticeForm.Content;
            //updateItem.site = this.roomForm.site;
          }
          //this.resetForm(formName);
        } else {
          this.tableData.push({
            Id: Math.random(),
            ModifyDate: dateFormat(new Date()),
            Content: this.noticeForm.Content,
            ModifyUser: "李如梦"
          });
        }
        this.$message(this.$t("common.saveSuccess").toString());
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
    this.noticeForm.Id = row.Id;
    this.noticeForm.Content = row.Content;
    this.dialogVisible = true;
  }

  handleDelete(index: any, row: any) {
    this.$confirm(this.$t("common.deleteConfirm").toString(), {
      cancelButtonText: this.$t("common.cancel").toString(),
      confirmButtonText: this.$t("common.confirm").toString()
    })
      .then(_ => {
        //删除操作
        let a = this.tableData.findIndex(p => p.Id == row.Id);
        this.tableData.splice(a, 1);
        console.log(index, row);
        this.$message(this.$t("common.deleteSuccess").toString());
      })
      .catch(_ => {
        console.log("取消了删除");
      });
  }
}
</script>

<style  lang="scss" scope>
.page-title {
  text-align: left;
  padding: 20px 0px;
  font-size: 20px;
}
</style>
