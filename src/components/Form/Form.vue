<template>
  <form>
    <slot></slot>
    <button @click='onSubmit' class="form-submit-button" type="submit">{{ text }}</button>
  </form>
</template>
<script setup lang="ts">
defineProps<{ onSubmit: (e: Event) => void, text: string}>()
</script>
<style scoped>
  .form-submit-button {
  margin: 0 24px;
  width: calc(100% - 48px);
  height: 36px;
  border-radius: 10px;
}
</style>