<template>
  <span class="form-item">
    <span class="form-item-content">
      <label :for="id">{{ label }}</label>
      <input 
        :value='value' 
        @input="$emit('update:value', ($event.target as HTMLInputElement).value)" 
        type="text" 
        :id="id"
        :name="id"
        :class="{'error-border': error}"
      />
      <button v-if="type === 'code'" :disabled="disabled" @click="sendCode">{{ disabled ? count : 'SEND' }}</button>
    </span>
    <div class="form-item-error">{{ error || '　' }}</div>
  </span>
</template>
<script setup lang="ts">
defineEmits(['update:value'])
defineProps<{
  id: string, label: string, value: string, error?: string, type: 'text' | 'code'
  disabled?: boolean, sendCode?: any, count?: number
}>()
</script>
<style scoped>
.form-item {
  display: flex;
  flex-direction: column;
}

.form-item .form-item-content {
  display: flex;
  align-items: center;
}

.form-item .form-item-content label {
  font-size: 18px;
  font-weight: 550;
  width: 64px;
}

.form-item .form-item-content input {
  flex: 1;
  min-width: 0;
  height: 36px;
  appearance: none;
  border: 2px solid #777;
  border-radius: 10px;
}
.form-item .form-item-content .error-border {
  border: 2px solid red
}
.form-item .form-item-content input:focus {
  outline: none;
  border: 2px solid #4f9b92
}

.form-item .form-item-content button {
  margin-left: 12px;
  border-radius: 10px;
  height: 36px;
  width: 90px;
}

.form-item .form-item-error {
  margin-left: 64px;
  color: red;
  font-size: 12px;
}

</style>