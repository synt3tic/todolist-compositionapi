<template>
  <button 
    class="button"
    :disabled="!buttonState"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  buttonState: Boolean,
});
</script>

<style scoped>
.button {
  @apply h-9 px-1.5 rounded  duration-200 bg-[#134c8659] hover:bg-[#54a6e93f] disabled:bg-[#b0b4b9] disabled:hover:cursor-default
}
</style>