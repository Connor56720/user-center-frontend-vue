<template>
  <div id="userRegisterView">
    <h2 class="title">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      :model="formState"
      name="basic"
      label-align="left"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="handleSubmit"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="账号"
        name="userAccount"
        :rules="[{ required: true, message: '请输入账号' }]"
      >
        <a-input
          v-model:value="formState.userAccount"
          placeholder="请输入账号"
        />
      </a-form-item>

      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码长度不能小于8位' },
        ]"
      >
        <a-input-password
          v-model:value="formState.userPassword"
          placehoder="请输入密码"
        />
      </a-form-item>

      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[
          { required: true, message: '请输入确认密码' },
          { min: 8, message: '确认密码长度不能小于8位' },
        ]"
      >
        <a-input-password
          v-model:value="formState.checkPassword"
          placehoder="请输入确认密码"
        />
      </a-form-item>

      <a-form-item
        label="编号"
        name="planetCode"
        :rules="[{ required: true, message: '请输入编号' }]"
      >
        <a-input
          v-model:value="formState.planetCode"
          placeholder="请输入编号"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { userRegister } from '@/api/user'
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface FormState {
  userAccount: string
  userPassword: string
  checkPassword: string
  planetCode: string
}

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  planetCode: '',
})

// 提交表单
const handleSubmit = async (values: any) => {
  // 验证密码和确认密码是否一致
  if (values.userPassword !== values.checkPassword) {
    message.error('两次输入密码不一致')
    return
  }

  const res = await userRegister(values)
  // 注册成功，跳转到登录页面
  if (res.data.code === 0 && res.data.data) {
    message.success('注册成功')
    router.push({
      path: '/user/login',
      replace: true,
    })
  } else {
    message.error('注册失败，' + res.data.description)
  }
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<style scoped>
#userRegisterView .title {
  text-align: center;
  margin-bottom: 16px;
}
</style>
