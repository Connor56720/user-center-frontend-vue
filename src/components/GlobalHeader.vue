<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.png" alt="logo" />
          <div class="title">用户中心</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>

      <a-col flex="100px">
        <div class="avatar-bar">
          <img
            class="avatar"
            :src="loginUserStore.loginUser.avatarUrl ?? '../assets/logo.png'"
            alt="avatar"
          />
        </div>
      </a-col>

      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <div class="user-info">
              <span class="username">
                {{ loginUserStore.loginUser.username ?? '无名' }}
              </span>
              <a-button type="link" size="small" @click="handleLogout">
                登出
              </a-button>
            </div>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined, CrownOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/useLoginUserStore'
import { userLogout } from '@/api/user'
import { message } from 'ant-design-vue'

const loginUserStore = useLoginUserStore()

const router = useRouter()

// 登出处理
const handleLogout = async () => {
  try {
    await userLogout({})
    loginUserStore.setLoginUser({ username: '未登录' })
    message.success('登出成功')
    router.push('/')
  } catch (error) {
    message.error('登出失败')
  }
}

// 点击菜单的路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}

const current = ref<string[]>(['mail'])
// 监听路由变化，更新当前菜单选中状态
router.afterEach((to, from, failure) => {
  current.value = [to.path]
})

const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/user/login',
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '/user/register',
    label: '用户注册',
    title: '用户注册',
  },
  {
    key: '/admin/userManage',
    icon: () => h(CrownOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/user/profile',
    label: '个人中心',
    title: '个人中心',
  },
])
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}
.logo {
  height: 48px;
}
.avatar-bar {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.user-login-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.username {
  font-size: 14px;
  font-weight: 500;
  margin-right: 20px;
}
</style>
