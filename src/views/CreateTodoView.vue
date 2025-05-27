<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const todos =  ref([])
const content =  ref('')
const router = useRouter()
onMounted(() => {
  todos.value = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
})
const createTodo = ()=>{
  if(content.value){
    const maxId = todos.value.length > 0
      ? Math.max(...todos.value.map(todo => todo.id))
      : 0
    todos.value.push({
      id: maxId + 1,
      content: content.value,
      completed: false
    })
    localStorage.setItem('todos', JSON.stringify(todos.value))
    content.value = ''
    router.push('/')
  }
}
</script>

<template>
<main class="mt-20 w-full flex flex-col gap-4 items-center justify-center">
  <span @click="router.back" > {{'< Back To Todo List'}}</span>
  <h1 class="self-center text-3xl font-bold text-center">Create New Todo</h1>
  <FormKit
    placeholder="Add a new todo"
    type="text"
    v-model="content"
    autofocus
    @keydown.enter="createTodo"
  />
  <button @click="createTodo" class="button">Create Todo</button>
</main>
</template>

<style scoped>

</style>
