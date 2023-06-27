<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import { http } from '../lib/http'
import MainLayout from '../components/MainLayout.vue';

const todoList = reactive([])

watchEffect(() => {
  http.get<any>('/api/v1/items', { page: 1 }).then(res => {
    if (res.status === 200) {
      todoList.concat(res.data.resources)
    }
    console.log('res', res)
  })
})
const fakeData = [
  { id: 1, todo: '事项1', description: '描述1' },
  { id: 1, todo: '事项2', description: '描述2' },
  { id: 1, todo: '事项3', description: '描述3' }
]

</script>
<template>
  <MainLayout>
    <ul v-for="item in fakeData">
      <li>{{ item.todo }}</li>
    </ul>
    <div class="add-button"></div>
  </MainLayout>
</template>
<style scoped>
.add-button {
  position: fixed;
  right: 12px;
  bottom: 72px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #444;
}
</style>