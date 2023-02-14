<template>
  <!-- 页面实际内容展示区 -->
  <div class="jurisdiction">
    <div class="jurisdiction-content">
      <img src="@/assets/images/jurisdiction/no_jurisdiction.png" alt="no_jurisdiction" />
      <p>您当前暂无查看此页面的权限！</p>
      <template v-if="loginStatus">
        <p v-if="status" class="result">已于{{ filterTime(applyTime) }}提交申请 请等待处理！</p>
        <a href="javascript: void(0)" @click="apply">点击申请该功能的使用权限</a>
      </template>
    </div>
  </div>
</template>

<script>
/* 申请权限组件 */
import dayjs from 'dayjs'
import { menuList, flattening } from '@/router/config'

export default {
  name: 'Jurisdiction',
  data() {
    return {
      visible: false,
      id: '',
      key: '',
      status: 0,
      applyTime: null,
    }
  },
  computed: {
    // ...mapState(['loginStatus']),
  },
  mounted() {
    this.id = this.$route.query.id || ''
    this.key = this.$route.query.key || ''

    if (this.id) {
      this.getApplyStatus(this.id)
      return
    }

    if (this.loginStatus && !this.id) {
      this.$router.push({
        path: '/satelliteData',
      })
    }
  },
  methods: {
    // 申请权限
    apply() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    success() {
      this.getApplyStatus(this.id)
      this.close()
    },
    filterTime(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm')
    },
    async getApplyStatus(id) {
      const res = await this.$request.get('user/applyStatus', {
        params: {
          menuId: id,
        },
      })

      this.status = res.status
      this.applyTime = res.applyTime

      if (this.status) {
        await this.$store.dispatch('getUserMenuList')
        const status = this.$store.state.userMenuList.find((menu) => menu.id == id).status
        if (status) {
          const path = flattening(menuList).find((menu) => menu.key == this.key).path
          await this.$router.push({
            path,
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.jurisdiction {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .jurisdiction-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transform: translateY(-50px);

    img {
      width: 300px;
    }

    p {
      margin: 19px 0 48px;
      font-size: 18px;
      color: #333333;

      &.result {
        width: 244px;
      }
    }

    a {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1264ce;
      line-height: 20px;
    }
  }
}
</style>
