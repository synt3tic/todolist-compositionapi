<template>
  <li :class="taskClasses">
    <div v-if="isEditingState" class="task__edit-inputs">
      <input 
        v-model="editedTask.title"
        class="edit-field edit-field_input"
        type="text"
      />
      <textarea 
        v-model="editedTask.description"
        class="edit-field edit-field_textarea"
        type="text"
      />
    </div>
    <div v-if="!isEditingState" :class="taskTextClasses">
      <h3 
        class="information__title"
      >
        {{ task.title }}
      </h3>
      <p 
        class="information__description"
      >
        {{ task.description }}
      </p>
    </div>
    <div class="task__buttons">
      <my-button 
        :buttonState="buttonState"
        @click="changeTaskStatus"
      >
        {{ taskStatusButtonIcon }}
      </my-button>
      <my-button 
        :buttonState="editButtonState" 
        @click="changeEditingState"
      >
        {{ editingButtonIcon }}
      </my-button>
      <my-button 
        :buttonState="buttonState" 
        @click="removeTask"
      >
        🗑️
      </my-button>
    </div>
  </li>
</template>

<script setup>
import { computed, ref } from "vue"

const props = defineProps({
  task: Object,
});
const emit = defineEmits(["changeTaskStatus", "removeTask", "editTask"])


const isEditingState = ref(false);

const editedTask = ref({
  ...props.task
});

const buttonState = computed(() => {
  return isEditingState.value ? false : true
});

const editButtonState = computed(() => {
  return props.task.status ? false : true
});


const taskClasses = computed(() => {
  return ["task", {
    "task_complited": props.task.status,
  }]
});

const taskTextClasses = computed(() => {
  return ["task__information", {
    "task__information_complited": props.task.status,
  }]
});


const taskStatusButtonIcon = computed(() => {
  return props.task.status ? "❎" : "✅"
});

const editingButtonIcon = computed(() => {
  return isEditingState.value ? "✔️" : "✏️"
});


const changeTaskStatus = () => {
  emit("changeTaskStatus", props.task)
};

const removeTask = () => {
  emit("removeTask", props.task)
};

const changeEditingState = () => {
  if(!props.task.status && !isEditingState.value) {
    isEditingState.value = true
  } else if (isEditingState.value) {
    isEditingState.value = false
    emit("editTask", editedTask.value)
  }
};
</script>

<style>
.task {
  @apply flex gap-[5px] rounded-[10px] border border-[1px] border-[#134d86] p-[15px] w-[300px]
}

.task_complited {
  @apply bg-[#c4c4c4]
}

.task__edit-inputs {
  @apply flex flex-col w-full gap-[5px]
}

.edit-field {
  @apply p-1.5 rounded-[5px] border border-[#134d86] text-lg text-[#134d86] active:outline-1 active:outline-[#134d86] focus:outline-1 focus:outline-[#134d86]
}

.edit-field_input {
  @apply p-1.5 h-9 font-bold text-lg
}

.edit-field_textarea {
  @apply h-full w-full p-[5px] resize-none text-base
}

.task__information {
  @apply cursor-default flex flex-col gap-[5px] w-full
}

.task__information_complited {
  @apply line-through
}

.information__title {
  @apply bg-[#134c8659] rounded-[5px] p-1.5 h-9 font-bold text-lg
}

.information__description {
  @apply bg-[#54a6e93f] rounded-[5px] p-1.5 h-full
}

.task__buttons {
  @apply flex flex-col gap-[5px]
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>