<template>
   <el-menu
    default-active="1"
    class="sidebar-menu"
    @open="handleOpen"
    @close="handleClose"
  >
  <el-sub-menu v-for="menu of MenuList" :key="menu.key" :index="menu.key" >
    <template #title>
      <el-icon><icon-menu /></el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <el-menu-item v-for="children of menu.children" :key="children.key"  :index="children.key"  :class="item?.active ? 'is-active' : 'un-active'"  @click="href(children.route)">{{children.title}}</el-menu-item>
  </el-sub-menu>
  </el-menu>
</template>
<script setup lang="ts">
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue';
import { nextTick, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuList } from './constants';
import { MenuType } from './types';
const router = useRouter();
const route = useRoute();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 匹配高亮当前菜单
let hasActive = false;

const defaultActive = ref('');

watchEffect(() => {
  route.name && matchMenu && matchMenu(MenuList);
});
const matchMenu = (menuList: any[]) => {
  if (!menuList.length || hasActive) {
    return;
  }
  const routePath = route.path;
  if (!routePath) {
    return;
  }
  menuList &&
    menuList.some((el: any) => {
      el.children && matchMenu(el.children);
      if (el.route && RegExp(`^${el.route}/.*`).test(routePath + '/')) {
        nextTick(() => {
          defaultActive.value = el.key;
        });
        hasActive = true;
        return true;
      }
      return hasActive;
    });
};

// 监听路由变化激活对应路由
watchEffect(() => {
  MenuList?.forEach(
    (item: MenuType) => (item.active = item?.route === route?.path)
  );
});

const href = (route: string) => {
  router.replace(route);
};

</script>
<style lang="scss" scoped>
.sidebar-menu{
  height: 100vh;
  overflow-y: auto;
  & > .el-menu-item {
    height: 38px;
    line-height: 38px;
    padding-left: 28px !important;
    padding-bottom: 2px;

    &.is-active {
      font-weight: 500;
    }
    &.un-active {
      color: var(--el-menu-text-color);
    }
  }
}
</style>