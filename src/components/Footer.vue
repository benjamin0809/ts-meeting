<template>
  <el-footer>
     <el-divider>有限公司</el-divider>
    </el-footer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class Footer extends Vue {

}
</script>

<style>
.el-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
}
</style>