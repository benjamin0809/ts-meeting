<template>
  <div class="user">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'sysadmin'
})
export default class extends Vue {}
</script>

<style>
</style>