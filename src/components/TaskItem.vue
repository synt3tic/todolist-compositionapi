<template>
  <li :class="taskClasses">
    <div v-if="editStatus" class="flex flex-col w-full gap-[5px]">
      <input 
        v-model="editedTask.title"
        class="edit-input"
        type="text"
      />
      <textarea 
        v-model="editedTask.description"
        class="edit-input h-full w-full p-[6px] resize-none text-base"
        type="text"
      />
    </div>
    <div v-else :class="taskTextClasses">
      <h3 
        class="bg-[#134c8659] rounded-[5px] p-1.5 h-9 font-bold text-lg"
      >
        {{ task.title }}
      </h3>
      <p 
        class="bg-[#54a6e93f] rounded-[5px] p-1.5 h-full"
      >
        {{ task.description }}
      </p>
    </div>
    <div class="flex flex-col gap-[5px]">
      <my-button 
        :buttonState="buttonState"
        @click="changeTaskStatus"
      >
        {{ buttonContent }}
      </my-button>
      <my-button 
        :buttonState="editButtonState" 
        @click="changeEditStatus"
      >
        {{ editButtonIcon }}
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

const buttonContent = computed(() => {
  let result
  if(props.task.status) {
    result = "❎"
  } else {
    result = "✅"
  }
  return result
});

const taskClasses = computed(() => {
  return ["task", {
    "bg-[#c4c4c4]": props.task.status,
  }]
});

const taskTextClasses = computed(() => {
  return ["cursor-default flex flex-col gap-[5px] w-full", {
    "line-through": props.task.status,
  }]
})
    
const changeTaskStatus = () => {
  if(!editStatus.value) {
    emit("changeTaskStatus", props.task)
  }
};

const removeTask = () => {
  emit("removeTask", props.task)
};

const editStatus = ref(false);

const editedTask = ref({
  ...props.task
});

const editButtonIcon = computed(() => editStatus.value ? "✔️" : "✏️")

const changeEditStatus = () => {
  if(!props.task.status && !editStatus.value) {
    editStatus.value = true
  } else if (editStatus.value) {
    editStatus.value = false
    emit("editTask", editedTask.value)
  }
};

const buttonState = computed(() => {
  return editStatus.value ? false : true
});

const editButtonState = computed(() => {
  return props.task.status ? false : true
});
</script>

<style>
.task {
  @apply flex gap-[5px] rounded-[10px] border border-[1px] border-[#134d86] p-[15px] w-[300px]
}

.edit-input {
  @apply h-9 p-1.5 rounded-[5px] border border-[#134d86] bg-[#1e8fff07]  text-lg text-[#134d86] active:outline-1 active:outline-[#134d86] focus:outline-1 focus:outline-[#134d86]
}
</style>