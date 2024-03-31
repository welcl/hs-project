<template>
  <el-menu
    ref="menuRef"
    class="sidebar-menu"
    :collapse="false"
    :ellipsis="false"
    :default-active="defaultActive"
    :default-openeds="defaultOpens"
  >
    <template v-for="(item, index) in menuList">
      <el-sub-menu v-if="item.children" :key="index" :index="item.key">
        <template #title>{{ item.title }}</template>
        <el-menu-item
          v-for="(item2, index2) in item.children?.filter(
            (childItem: any) => childItem.visible
          )"
          :key="index2"
          :class="item.active ? 'is-active' : 'un-active'"
          :index="item2.key"
          @click="href(item2.route)"
        >
          <template #title> {{ item2.title }}</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item
        v-if="!item.children"
        :key="index"
        :class="item.active ? 'is-active' : 'un-active'"
        :index="item.key"
        @click="href(item.route)"
      >
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { nextTick, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';
import { MenuList as defaultMenuList } from './constants';

const defaultActive = ref('');

const route = useRoute();
const router = useRouter();
const menuList = ref<any[]>(defaultMenuList);
const defaultOpens = ref<string[]>([]);
const menuRef = ref();

// 匹配高亮当前菜单
let hasActive = false;
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

const getMenuList = async () => {
  // 前端路由path数组
  let routePathList: any = router?.getRoutes()?.map((item: any) => item.path);
  // 遍历菜单，匹配子应用路由，若不存在则不渲染菜单
  filterMenu(menuList.value, (menu) => {
    menu.visible = true;
    const isHasRoute = routePathList.some(
      (item) => item.indexOf(menu.route) > -1
    );

    // 叶子节点并且路由信息不包含在项目路由列表中
    if (!menu.children && !isHasRoute) {
      menu.visible = false;
    }
    return menu.visible;
  });

  // 没有菜单
  if (!menuList.value) {
    return;
  }

  matchMenu(menuList.value);
  // 全部展开
  nextTick(() => {
    menuList.value.forEach((el: any) => {
      menuRef.value.open(el.key);
    });
  });
};

// 遍历菜单，匹配子应用路由，若不存在则不渲染菜单
const filterMenu = (list: Array<any>, func: () => any, parentNode = null) => {
  let nodeVisible = false;
  list.forEach((node) => {
    if (!nodeVisible) {
      nodeVisible = func(node);
    } else {
      func(node);
    }

    node.children && filterMenu(node.children, func, node);
  });
  if (parentNode) parentNode.visible = nodeVisible;
};

const parseData = (data: any[]) => {
  data = data.map((el: any) => {
    el.children && (el.children = parseData(el.children));
    // 容错（仓储、商品路由设置错误，纠正设置之后可以删除）
    if (/^app.*/.test(el.route)) {
      el.route = '/' + el.route;
    }
    // 容错（商品路由设置错误，纠正之后可以删除）
    if (el.pageId === '66') {
      el.key = '2-2';
    }

    return el;
  });
  return data;
};
getMenuList();

watchEffect(() => {
  route.name && matchMenu && matchMenu(menuList.value);
});
router.isReady().then(() => {
  // router ready 之后，如果 menuList 也 ready：
  menuList.value.length && matchMenu(menuList.value);
});
// Method
const href = (route: string) => {
  router.replace(route);
};

// 监听路由变化激活对应路由
watchEffect(() => {
  menuList.value?.forEach(
    (item: {
      flag: string;
      key: string;
      pageId: string;
      route: string;
      title: string;
      active?: boolean;
    }) => (item.active = item?.route === route?.path)
  );
});
</script>

<style lang="scss">
@import 'element-plus/theme-chalk/el-menu.css';
@import 'element-plus/theme-chalk/el-icon.css';

:root {
  --el-color-primary: #327de8 !important;
}

.sidebar-menu {
  width: 245px;
  height: 100%;
  padding-top: 8px;
  background: #fff !important;
  overflow-x: hidden;
  z-index: 1;

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

  .el-sub-menu {
    padding-bottom: 2px;

    .el-sub-menu__title {
      height: 38px;
      line-height: 38px;
      padding-left: 28px !important;
      font-weight: 500;

      .el-sub-menu__icon-arrow {
        right: auto;
        left: 8px;
      }
    }

    .el-menu-item {
      height: 36px;
      line-height: 36px;
      padding: 0 0 0 28px !important;
      font-size: 14px;

      &.is-active {
        font-weight: 500;
      }
    }
  }
}
</style>
