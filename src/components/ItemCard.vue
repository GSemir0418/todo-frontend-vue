<template>
  <div class="item-card">
    <div class="item-card-todo">{{ todo }}</div>
    <div class="item-card-description">{{ description }}</div>
    <a @click="onDelClick" class="item-card-del">X</a>
  </div>
</template>
<script setup lang="ts">
import { removeItem } from '../api/items';
const emit = defineEmits(['update:todoList'])
const { id } = defineProps<{ id: number, todo: string, description: string }>()
const onDelClick = (e: Event) => {
  e.preventDefault()
  removeItem(id).then(res => {
    if (res.status === 204) {
      alert('删除成功！')
      // 前端删除即可
      emit('update:todoList', id)
    }
  })
}
</script>
<style scoped>
.item-card {
  padding: 4px;
  border: 1px solid red;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 1px 1px 1px 1px red;
  position: relative;
}

.item-card .item-card-todo {
  font-size: 20px;
  margin-bottom: 4px;
}

.item-card .item-card-description {
  font-size: 14px;
  color: #333;
  text-overflow: ellipsis;
}

.item-card .item-card-del {
  color: red;
  position: absolute;
  right: 8px;
  top: calc(50% - 12px);
}</style>