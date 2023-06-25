<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import axios from 'axios'

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
const postData = reactive({ email: '', code: '2' })
const errors = reactive<{ email: string[], code: string[] }>({ email: [], code: [] })
const hasError = (arr: any[]) => arr.length > 0
const onSubmit = (e: Event) => {
  e.preventDefault();
  axios.post('dev/api/v1/session', postData).then(res => {
    console.log(res)
  })
}
const sendCode = (e: Event) => {
  e.preventDefault()
  isCounting.value = true
  // if (postData.email === '') {
  // errors.email.push('请填写正确的邮箱')
  // } else {
  // errors.email = []
  // axios.post('dev/api/v1/validation_codes', { email: postData.email }).then(res => {
  // if(res.status === 200){
  // }
  // })
  // }
}
</script>
<template lang="">
  <div class="wrapper">
    <div class="title">TODOs Login</div>
    <div class="form-container">
      <form>
        <span class="form-item">
          <span class="form-item-content">
            <label for="code">Email</label>
            <input v-model='postData.email' type="text" id="email" name="email">
          </span>
          <div class="form-item-error">{{ errors.email[0] || '　' }}</div>
        </span>
        <span class="form-item code-input">
          <span class="form-item-content">
            <label for="code">验证码</label>
            <input v-model='postData.code' type="text" id="code" name="code">
            <button :disabled="isCounting" @click="sendCode">{{ isCounting ? count : '发送验证码'}}</button>
          </span>
          <div class="form-item-error">{{ errors.code[0] || '　' }}</div>
        </span>
        <button @click='onSubmit' class="form-submit-button" type="submit">登录</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  height: 100vh;
  background: #999;
  padding-top: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.wrapper .title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 48px;
}

.wrapper .form-container {
  margin-top: 12px;
}

.form-item {
  margin: 12px 24px;
  display: flex;
  flex-direction: column;
}

.form-item .form-item-content {
  display: flex;
  align-items: center;
}

.form-item .form-item-content label {
  font-size: 18px;
  font-weight: 550;
  width: 64px;
}

.form-item .form-item-content input {
  flex: 1;
  padding-left: 12px;
  height: 36px;
  appearance: none;
  border: 2px solid #777;
  border-radius: 10px;
}

.form-item .form-item-content input:focus {
  outline: none;
  border: 2px solid #4f9b92
}

.form-item .form-item-content button {
  margin-left: 12px;
  border-radius: 10px;
  height: 36px;
  width: 90px;
}

.form-item .form-item-error {
  margin-left: 64px;
  color: red;
  font-size: 12px;
}

.form-submit-button {
  margin: 0 24px;
  width: calc(100% - 48px);
  height: 36px;
  border-radius: 10px;
}
</style>