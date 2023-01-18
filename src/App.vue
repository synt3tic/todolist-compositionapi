<template>
  <main>
    <my-button 
      v-if="!isFormVisible"
      @click="changeFormVisibilityStatus"
      :buttonState="true" 
      class="main__button"
    >
      New Task
    </my-button>
    <task-form 
      v-else 
      @createTask="createTask" 
      @hideForm="changeFormVisibilityStatus"
    />
    <task-list 
      :taskList="taskList" 
      @changeTaskStatus="changeTaskStatus"
      @removeTask="removeTask"
      @editTask="editTask"
    />
  </main>
</template>

<script setup>
import TaskForm from "@/components/TaskForm.vue"
import TaskList from "./components/TaskList.vue";
import { ref } from 'vue'

const taskList = ref([
  {
    id: 1,
    title: "Make Video",
    description: "Upload on YouTube",
    status: false,
  },
  {
    id: 2,
    title: "Make Dinner",
    description: "Make Dinner and eat",
    status: false,
  },
]);
const isFormVisible = ref(false)

const changeTaskStatus = (task) => {
  taskList.value = taskList.value.map((el) => {
    if(el.id === task.id) {
      el.status = !el.status
      return el
    } else {
      return el
    }
  })
};
const createTask = (task) => {
  taskList.value.push(task)
};
const removeTask = (task) => {
  taskList.value = taskList.value.filter(el => el.id !== task.id)
};
const editTask = (task) => {
  taskList.value = taskList.value.map((el) => {
    if(el.id === task.id) {
      return task
    } else {
      return el
    }
  })
};
const changeFormVisibilityStatus = () => {
  isFormVisible.value = !isFormVisible.value
};
</script>

<style>
* {
  font-family: "JetBrains Mono", monospace;
  margin: 0;
  padding: 0;
}

main {
  @apply flex flex-col items-center pt-3 
}

.main__button {
  @apply w-[300px] mb-[15px]
}
</style>
