<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import MainLayout from '../components/MainLayout.vue';
import { useRouter } from 'vue-router';
import { getItems } from '../api/items'

const router = useRouter();
const todoList = reactive<{todo: string, description: string}[]>([])

watchEffect(() => {
  getItems(1).then(res => {
    if (res.status === 200) {
      todoList.push(...res.data.resources)
      console.log(todoList)
    }
  })
})

const handleAddClick = () => {
  router.push("/new");
}

</script>
<template>
  <MainLayout>
    <ul v-for="item in todoList">
      <li><h4>{{ item.todo }}</h4></li>
      <li>{{ item.description }}</li>
    </ul>
    <div class="add-button" @click="handleAddClick"></div>
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