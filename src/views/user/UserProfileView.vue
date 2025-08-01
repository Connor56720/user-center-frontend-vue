<template>
  <div id="userProfileView">
    <h2 class="title">个人中心</h2>
    <div class="profile-container">
      <a-row :gutter="24">
        <a-col :span="8">
          <div class="avatar-section">
            <div class="avatar-wrapper">
              <img
                :src="userInfo.avatarUrl || '../assets/logo.png'"
                alt="头像"
                class="avatar"
              />
              <div class="avatar-upload">
                <a-upload
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  accept="image/*"
                >
                  <a-button type="primary" size="small">更换头像</a-button>
                </a-upload>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="16">
          <a-form
            :model="userInfo"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            layout="horizontal"
          >
            <a-form-item label="用户名">
              <a-input
                v-model:value="userInfo.username"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item label="账号">
              <a-input v-model:value="userInfo.userAccount" disabled />
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input
                v-model:value="userInfo.email"
                placeholder="请输入邮箱"
              />
            </a-form-item>
            <a-form-item label="性别">
              <a-select
                v-model:value="userInfo.gender"
                placeholder="请选择性别"
              >
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="用户角色">
              <a-tag v-if="userInfo.userRole === 1" color="green">管理员</a-tag>
              <a-tag v-else color="blue">普通用户</a-tag>
            </a-form-item>
            <a-form-item label="创建时间">
              <span>{{ formatDate(userInfo.createTime) }}</span>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
              <a-button type="primary" @click="handleSave">保存修改</a-button>
              <a-button style="margin-left: 10px" @click="handleReset"
                >重置</a-button
              >
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useLoginUserStore } from '@/store/useLoginUserStore'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const loginUserStore = useLoginUserStore()

// 用户信息
const userInfo = ref({
  id: '',
  username: '',
  userAccount: '',
  email: '',
  gender: '',
  avatarUrl: '',
  userRole: 0,
  createTime: '',
})

// 获取用户信息
const fetchUserInfo = () => {
  const currentUser = loginUserStore.loginUser
  if (currentUser && currentUser.id) {
    userInfo.value = { ...currentUser }
  }
}

// 格式化日期
const formatDate = (date: string) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

// 头像上传前的处理
const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('只能上传图片文件!')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!')
    return false
  }

  // 这里可以调用上传接口
  message.success('头像上传成功!')
  return false // 阻止自动上传，这里只是示例
}

// 保存修改
const handleSave = async () => {
  try {
    // 这里调用更新用户信息的接口
    // await updateUserInfo(userInfo.value)
    message.success('保存成功!')
    // 更新store中的用户信息
    loginUserStore.setLoginUser(userInfo.value)
  } catch (error) {
    message.error('保存失败!')
  }
}

// 重置
const handleReset = () => {
  fetchUserInfo()
  message.info('已重置为原始信息')
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
#userProfileView {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 32px;
  color: #1890ff;
}

.profile-container {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.avatar-wrapper {
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #f0f0f0;
}

.avatar-upload {
  margin-top: 16px;
}
</style>
