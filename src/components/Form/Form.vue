<template>
  <form>
    <slot></slot>
    <button @click='throttledFunc' class="form-submit-button" type="submit">{{ text }}</button>
  </form>
</template>

<script setup lang="ts">
import { throttle } from '../../lib/throttle';

const { onSubmit } = defineProps<{ onSubmit: (e: Event) => void, text: string }>()
// 节流
const throttledFunc = throttle(onSubmit, 2000)
</script>

<style scoped>
form {
  width: 100%;
  position: relative;
}

.form-submit-button {
  background-color: #b24747;
  box-shadow: 2px 2px 1px 1px #641c1c;
  width: 100%;
  height: 36px;
  border-radius: 10px;
  transition: all 0.1s;
  color: white;
}

.form-submit-button:active {
  background: #641c1c;
  transform: translateY(2px);
  box-shadow: 1px 1px 1px 1px #641c1c;
}
</style>