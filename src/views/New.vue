<template>
  <MainLayout>
    <Form :onSubmit="onSubmit" text="CREATE">
      <FormItem label="TODO" id="todo" name="todo" v-model:value="postData.todo" :error="errors.todo[0]" type="text" />
      <FormItem label="DESC" id="description" name="description" v-model:value="postData.description"
        :error="errors.description[0]" type="text" />
    </Form>
  </MainLayout>
</template>
<script setup lang="ts">
import MainLayout from '../components/MainLayout.vue';
import Form from '../components/Form/Form.vue';
import FormItem from '../components/Form/FormItem.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { createItem } from '../api/items';

const router = useRouter()

const postData = reactive({ todo: '', description: '' })
const errors = reactive<{ todo: string[], description: string[] }>({ todo: [], description: [] })

const onSubmit = (e: Event) => {
  e.preventDefault()
  createItem(postData).then(res => {
    if (res.status === 201) {
      errors.todo = []
      errors.description = []
      alert('创建成功')
      router.push('/')
    }
  }).catch(err => {
    console.log(err)
    if (err.response.status === 422) {
      Object.assign(errors, err.response.data.errors)
    }
  })
}
</script>
<style scoped></style>