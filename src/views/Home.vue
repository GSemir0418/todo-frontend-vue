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
  todoList.splice(todoList.findIndex(todo => todo.id === id), 1)
}

</script>
<template>
  <MainLayout>
    <div class="home-container">
      <div class="item-title">Todo List</div>
      <div v-for="item in todoList" class="item-card-container">
        <ItemCard @update:todo-list="removeTodo" :id="item.id" :todo="item.todo" :description="item.description" />
      </div>
      <div class="add-button" @click="handleAddClick">+</div>
    </div>
  </MainLayout>
</template>
<style scoped>
.home-container .item-title {
  position: sticky;
  top: 0;
  z-index: 999;
  text-align: center;
  font-size: 36px;
  margin-bottom: 48px;
}

.home-container {
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
}

.home-container .item-card-container {
  width: 80%;
}

.add-button {
  position: fixed;
  right: 12px;
  bottom: 72px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #b24747;
  box-shadow: 2px 2px 1px 1px #641c1c;
  text-align: center;
  font-size: 50px;
  line-height: 50px;
  color: white;
  transition: all 0.2s;
}

.add-button:active {
  background: #641c1c;
  transform: translateY(2px);
  box-shadow: 1px 1px 1px 1px #641c1c;
}
</style>