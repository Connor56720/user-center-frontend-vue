<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>
<script setup lang="ts">
import BasicLayout from './layouts/BasicLayout.vue'
import { useLoginUserStore } from '@/store/useLoginUserStore'

// 全局获取用户信息
const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
</script>
<style></style>
