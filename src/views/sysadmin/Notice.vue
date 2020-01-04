<template>
  <el-table
    :data="tableData.filter(data => !search || data.Content.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <el-table-column label="ModifyDate" prop="ModifyDate" width="200"></el-table-column>
    <el-table-column label="Content" prop="Content"></el-table-column>
    <el-table-column label="ModifyUser" prop="ModifyUser" width="100"></el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getShowNotices } from "../../api/notice";
@Component
export default class Notice extends Vue {
  tableData = getShowNotices();

  handleEdit(index: any, row: any) {}
  handleDelete(index: any, row: any) {}
}
</script>

<style>
</style>
