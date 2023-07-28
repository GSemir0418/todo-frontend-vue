<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import MainLayout from '../components/MainLayout.vue';
import { useRouter } from 'vue-router';
import { getItems } from '../api/items'
import ItemCard from '../components/ItemCard.vue';

const router = useRouter();
const todoList = reactive<{ id: number, todo: string, description: string }[]>([])

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

const removeTodo = (id: number) => {
  console.log(todoList.filter(todo => todo.id !== id))
  Object.assign(todoList, todoList.filter(todo => todo.id !== id))
}

</script>
<template>
  <MainLayout>
    <div v-for="item in todoList" class="item-card-container">
      <ItemCard @update:todo-list="removeTodo" :id="item.id" :todo="item.todo" :description="item.description" />
    </div>
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

.item-card-container {
  width: 80%;
}
</style>