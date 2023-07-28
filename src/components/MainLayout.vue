<template>
  <div class="main-layout" :class="classNames">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const { classname } = defineProps<{ classname?: string }>()

const classNames = computed(() => {
  if (classname && classname !== '')
    return `main-layout ${classname}`
  else return 'main-layout'
})
</script>
<style scoped>
.main-layout {
  height: 100vh;
  background: #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 66px 12px 0 12px;
}
</style>