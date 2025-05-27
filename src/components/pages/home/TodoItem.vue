<script setup>
import { useRouter } from 'vue-router'

// Props
const props = defineProps(['todo'])

// Emits
const emit = defineEmits(['update','remove'])

// Router instance
const router = useRouter()

const toggleCompleted = () => {
  emit('update', { ...props.todo, completed: !props.todo.completed })
}

// Methods
const removeTodo = () => {
  emit('remove', props.todo.id)
}

const editTodo = () => {
  router.push(`/edit/${props.todo.id}`)
}

</script>

<template>
<div class=" py-2 flex items-center gap-4 justify-between border-b-[1px]">
  <FormKit
    type="checkbox"
    :value="props.todo.completed"
    @input="toggleCompleted"
    :label="props.todo.content"
  />
  <div class="flex gap-2">
    <button class="todo-btn bg-[#04AA6D]" @click="editTodo">Edit</button>
    <button class="todo-btn  bg-red-400" @click="removeTodo">Delete</button>
  </div>
</div>
</template>

<style scoped>
.todo-btn {
  @apply py-1 px-2 rounded-lg text-xs
}
</style>
