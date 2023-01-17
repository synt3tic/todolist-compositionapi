<template>
  <main class="flex flex-col items-center">
    <task-form @createTask="createTask"/>
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
</script>

<style>
* {
  font-family: "JetBrains Mono", monospace;
  margin: 0;
  padding: 0;
}
</style>
