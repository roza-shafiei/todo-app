<script setup>
import { useRouter } from 'vue-router'
import TodoList from '@/components/pages/home/TodoList.vue'
import { ref } from 'vue'
const router = useRouter()
const resetTodos = ref(false)

const goToCreatePage = () => {
  router.push('/create')
}
const clearAllTodos = ()=>{
  resetTodos.value = true
}
</script>

<template>
  <main class="w-full mt-20">
    <section class="todo-container w-full">
      <h1 class="text-3xl font-bold text-center">To-Do List</h1>
    <header class="flex items-center justify-center gap-2 mt-4">
      <button class="button" @click="goToCreatePage">Create New Todo</button>
      <button class="button" @click="clearAllTodos">Clear All Todos</button>
    </header>
      <TodoList :reset-todos="resetTodos"/>
    </section>
  </main>
</template>
