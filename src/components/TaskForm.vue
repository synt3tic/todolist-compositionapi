<template>
  <form class="task-form" @submit.prevent>
    <h1 
      class="task-form__header"
    >
      Creating a task
    </h1>
    <input 
      v-model="task.title"
      class="task-form__input" 
      type="text"
      placeholder="Title"
      maxlength="20"
    />
    <textarea 
      v-model="task.description"
      class="task-form__input task-form__textarea"
      type="text"
      placeholder="Description(no more than 120 letters)"
      maxlength="120"
    />
    <my-button 
      :buttonState="buttonState"
      @click="createTask"
    >
      Create Task
    </my-button>
  </form>
</template>

<script setup>
import { computed, ref } from "vue"

const emit = defineEmits(["createTask"])

const task = ref({
  id: 0,
  title: "",
  description: "",
  status: false,
})

const createTask = () => {
  emit("createTask", task.value)
  emit("hideForm")
  task.value = {
    id: Date.now(),
    title: "",
    description: "",
    status: false,
  };
};

const buttonState = computed(() => {
  return task.value.title === "" ? false : true
})
</script>

<style scoped>
.task-form {
  @apply flex flex-col items-center my-[15px] p-[15px] gap-2.5 rounded-[15px] border border-[2px] border-[#134d86] w-[300px]
}

.task-form__header {
  @apply cursor-default text-2xl font-bold text-[#134d86]
}

.task-form__input {
  @apply h-6 w-full bg-[#1e8fff07] rounded-[5px] border border-[#134d86] text-lg text-[#134d86] px-2 py-3 active:outline active:outline-1 active:outline-[#134d86] focus:outline focus:outline-1 focus:outline-[#134d86]
}

.task-form__textarea {
  @apply h-36 py-0 resize-none
}
</style>