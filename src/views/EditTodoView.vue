<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const todos =  ref([])
const route = useRoute()
const router= useRouter()
const selectedTodoId = ref(null)
const selectedTodo = ref(null)

onMounted(() => {
  selectedTodoId.value = Number(route.params.id)
  todos.value = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
  findSelectedTodo()
})
const findSelectedTodo = ()=>{
  if(selectedTodoId.value){
    selectedTodo.value = todos.value.find(todo => {
     return todo.id === selectedTodoId.value
    })
  }
}
const updateTodo = ()=>{
  localStorage.setItem('todos', JSON.stringify(todos.value))
  router.push('/')
}
</script>

<template>
  <main class="mt-20 flex flex-col gap-4 items-center justify-center">
    <span @click="router.back" > {{'< Back To Todo List'}}</span>
    <h1 class="self-center text-3xl font-bold text-center">Edit Existing Todo</h1>
    <template v-if="selectedTodo">
    <FormKit
      v-model="selectedTodo.content"
      placeholder="Enter Todo Text"
      type="text"
      autofocus
    />
    <FormKit
      v-model="selectedTodo.completed"
      type="checkbox"
      label="Completed"
    />
    </template>
    <button @click="updateTodo" class="button">Update Todo</button>
  </main>
</template>

<style scoped>

</style>
