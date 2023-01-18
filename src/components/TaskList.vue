<template>
  <ul class="task-list">
    <task-item 
      v-for="task in taskList" 
      :key="task.id" 
      :task="task"
      @changeTaskStatus="changeTaskStatus"
      @removeTask="removeTask"
      @editTask="editTask"
    />
  </ul>
</template>

<script setup>
import TaskItem from "@/components/TaskItem.vue"

const props = defineProps({
  taskList: Array,
});

const emit = defineEmits(["changeTaskStatus", "removeTask", "editTask"]);

const changeTaskStatus = (task) => {
  emit("changeTaskStatus", task);
};

const removeTask = (task) => {
  emit("removeTask", task);
};

const editTask = (task) => {
  emit("editTask", task);
};
</script>

<style scoped>
.task-list {
  @apply flex flex-col mb-[15px] gap-[15px] list-none
}
</style>
