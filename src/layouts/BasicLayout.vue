<template>
  <div id="basicLayout">
    <a-layout>
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://codefather.cn" target="_blank">
          编程导航 by 程序员鱼皮
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>
<style scoped>
#basicLayout .footer {
  background-color: #efefef;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
#basicLayout .content {
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(to bottom, #efefef, #ffffff);
}
#basicLayout .header {
  background-color: white;
  margin-bottom: 16px;
  color: unset;
  padding-inline: 20px;
}
</style>
