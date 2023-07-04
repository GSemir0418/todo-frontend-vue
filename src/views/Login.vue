<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import { session } from '../api/session'
import { sendValidationCode } from '../api/validationCodes'
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form/Form.vue'
import FormItem from '../components/Form/FormItem.vue'
import MainLayout from '../components/MainLayout.vue';

// 路由解析与跳转
const route = useRoute();
const router = useRouter();
// 倒计时
const isCounting = ref(false)
const count = ref(10)
watchEffect(() => {
  if (isCounting.value) {
    const id = setInterval(() => {
      if (count.value === 1) {
        clearInterval(id)
        isCounting.value = false
        count.value = 10
        return
      }
      count.value -= 1
    }, 1000)
  }
})
// 表单响应式数据
const postData = reactive({ email: '', code: '' })
const errors = reactive<{ email: string[], code: string[] }>({ email: [], code: [] })
// 登录回调
const onSubmit = (e: Event) => {
  e.preventDefault();
  session(postData).then(res => {
    console.log(res)
    if (res.status === 200) {
      localStorage.setItem('jwt', res.data.jwt)
      errors.email = []
      errors.code = []
      const returnTo = route.query.return_to?.toString();
      router.push(returnTo || "/");
    } else {
      // 校验暂时完全依赖后端
      Object.assign(errors, res.data.errors)
    }
  }).catch(err => {
    console.log(err)
    if (err.response.status) {
      // 校验暂时完全依赖后端
      errors.code = []
      errors.email = []
      Object.assign(errors, err.response.data.errors)
    }
  })
}
// 发送验证码回调
const sendCode = (e: Event) => {
  e.preventDefault()
  sendValidationCode(postData.email).then(res => {
    if (res.status === 200) {
      errors.email = []
      isCounting.value = true
    } else {
      // 校验暂时完全依赖后端
      errors.email = res.data.errors.email
    }
  }).catch(err => {
    if (err.response.status) {
      // 校验暂时完全依赖后端
      errors.email = err.response.data.errors.email
    }
  })
}
</script>
<template>
  <MainLayout classname="wrapper">
    <div class="title">TODOs Login</div>
    <div class="form-container">
      <Form :onSubmit=onSubmit text="登录">
        <FormItem id='email' type='text' label="Email" :error="errors.email[0]" v-model:value="postData.email" />
        <FormItem id='code' type='code' label="验证码" :error="errors.code[0]" v-model:value="postData.code"
          :sendCode="sendCode" :disabled="isCounting" :count="count" />
      </Form>
    </div>
  </MainLayout>
</template>
<style scoped>
.wrapper .title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 48px;
}

.wrapper .form-container {
  margin-top: 12px;
}
</style>