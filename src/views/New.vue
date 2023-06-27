<template>
  <MainLayout>
    <Form :onSubmit="onSubmit" text="创建">
      <FormItem label="标题" id="todo" name="todo" v-model:value="postData.todo" type="text" />
      <FormItem label="描述" id="description" name="description" v-model:value="postData.description" type="text" />
    </Form>
  </MainLayout>
</template>
<script setup lang="ts">
import MainLayout from '../components/MainLayout.vue';
import Form from '../components/Form/Form.vue';
import FormItem from '../components/Form/FormItem.vue';
import { reactive } from 'vue';
import { http } from '../lib/http';
import { useRouter } from 'vue-router';

const router = useRouter()

const postData = reactive({ todo: '', description: '' })

const onSubmit = (e: Event) => {
  e.preventDefault()
  http.post('api/v1/items', postData).then(res => {
    if (res.status === 201) {
      alert('创建成功')
      router.push('/')
    }
  })
}
</script>
<style scoped></style>