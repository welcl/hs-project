<template>
   <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Meun />
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Meun from '@/components/Menu/index.vue';
import { RouterView } from 'vue-router';
</script>
<style lang="scss" scoped>
.common-layout .el-container{
  width: 100vw;
    height: 100vh;
}
</style>