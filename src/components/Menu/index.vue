<template>
   <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
  <el-sub-menu v-for="menu of MenuList" :key="menu.key" :index="menu.key">
    <template #title>
      <el-icon><icon-menu /></el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <el-menu-item v-for="children of menu.children" :key="children.key"  :index="children.key"  @click="href(children.route)">{{children.title}}</el-menu-item>
  </el-sub-menu>
  </el-menu>
</template>
<script setup lang="ts">
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { MenuList } from './constants';
const router = useRouter();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const href = (route: string) => {
  router.replace(route);
};

</script>
<style lang="scss" scoped>
.el-menu-vertical-demo{
  height: 100vh;
  overflow-y: auto;
}
</style>