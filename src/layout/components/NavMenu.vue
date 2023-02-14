<template>
  <div class="nav-menu-wrapper">
    <div class="title-area" @click="toHome">
      <div class="title">临安AI</div>
      <div class="sub-title">后台系统</div>
    </div>
    <el-menu ref="elMenu" :unique-opened="true" :default-active="defaultActive" class="nav-menu">
      <div v-for="(memuItem, menuIndex) in menuList" :key="menuIndex" class="submenu-wrapper">
        <!-- 有二级子菜案 -->
        <el-sub-menu v-if="memuItem.children" :index="`${memuItem.key}`">
          <template #title>
            <!-- 引入iconfont字体图标: https://at.alicdn.com/t/project/2607467/0f013d96-b9c4-4446-a4b9-6e5be62c169e.html?spm=a313x.7781069.1998910419.62 -->
            <span :class="['iconfont', 'icon-' + memuItem.iconName]"></span>
            <span class="submenu-title">{{ memuItem.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="submemuItem in memuItem.children"
              :key="submemuItem.key"
              :index="submemuItem.key"
              @click="handleClickSubMenuItem(submemuItem)"
              >{{ submemuItem.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
        <!-- 无二级子菜案 -->
        <el-menu-item v-else :index="`${memuItem.key}`" @click="handleClickMenuItem(memuItem)">
          <span :class="['iconfont', 'icon-' + memuItem.iconName]"></span>
          <template #title>
            <span>{{ memuItem.title }}</span>
          </template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
/* 左侧导航栏组件 */
import { menuList } from '@/router/config'

export default {
  data() {
    return {
      defaultActive: '', // 如: 0-0(有二级子菜单); 2(无二级子菜单)
      // 导航菜单列表
      menuList: menuList,
    }
  },
  computed: {
    // ...mapState(['loginStatus']),
  },
  watch: {
    $route(newRoute, oldRoute) {
      const newIndex = newRoute.meta.activeMenuIndex
      const oldIndex = oldRoute.meta.activeMenuIndex
      // 路由跳转时，导航栏激活新页面（如新页面配置在导航栏内）并收起旧页面（如旧页面已在导航栏展开）
      if (newIndex) {
        this.defaultActive = newIndex
      } else {
        this.defaultActive = ''
      }
      if (oldIndex && oldIndex !== newIndex) {
        this.$refs.elMenu.close(oldIndex.substr(0, 1))
      }
    },
  },
  mounted() {
    // 页面刷新时，导航栏默认激活当前页面位置
    if (this.$route.meta.activeMenuIndex) {
      this.defaultActive = this.$route.meta.activeMenuIndex
    }
  },
  methods: {
    // 回到首页
    toHome() {
      this.$router.push({ path: '/home' })
    },
    // 点击一级菜单
    handleClickMenuItem(menuItem) {
      if (typeof menuItem.path === 'string') this.$router.push({ path: menuItem.path })
      else if (Array.isArray(menuItem.path)) this.$router.push({ path: menuItem.path[0] })
    },
    // 点击二级子菜单
    handleClickSubMenuItem(submenuItem) {
      if (typeof submenuItem.path === 'string') this.$router.push({ path: submenuItem.path })
      else if (Array.isArray(submenuItem.path)) this.$router.push({ path: submenuItem.path[0] })
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-menu-wrapper {
  width: 207px;
  height: 100vh;
  padding: 0 10px;
  background: #14253a;

  .title-area {
    width: 100%;
    height: 120px;
    font-family: pangmenzhengdao;
    color: #fff;
    font-size: 32px;
    line-height: 37px;
    letter-spacing: 3px;
    -webkit-background-clip: text;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .nav-menu {
    border-right: none;
    background: #14253a;

    ::v-deep .el-menu-item-group__title {
      padding: 0 !important;
    }

    ::v-deep .el-submenu__icon-arrow {
      right: 14px;
    }

    ::v-deep {
      .submenu-wrapper {
        .el-sub-menu {
          .el-sub-menu__title {
            height: 54px;
            line-height: 54px;
            padding-left: 12px !important;
            font-size: 16px;
            color: #c1c6cd;
            display: flex;
            align-items: center;

            .iconfont {
              margin-right: 9px;
            }

            .el-icon-arrow-down {
              &::before {
                color: #ffffff;
                font-size: 14px;
              }
            }

            &:hover {
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              background: #293749;
              border-radius: 4px;
            }
          }

          .el-menu {
            .el-menu-item {
              height: 54px;
              line-height: 54px;
              font-size: 16px;
              color: #c1c6cd;
              background: #293749;
              padding-left: 39px !important;
              padding-right: 0 !important;
              min-width: initial;

              &.is-active {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
                background: #3e4753;
              }

              &:focus,
              &:hover {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
                background: #3e4753;
              }
            }
          }

          &.is-active,
          &.is-opened {
            border-radius: 4px;
            overflow: hidden;

            .el-submenu__title {
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              background: #293749;
            }
          }
        }

        & > .el-menu-item {
          height: 54px;
          line-height: 54px;
          font-size: 16px;
          color: #c1c6cd;
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding-left: 12px !important;

          .iconfont {
            margin-right: 9px;
          }

          &:hover {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            background: #293749;
          }

          &.is-active {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            background: #293749;
          }
        }
      }
    }
  }
}
</style>
