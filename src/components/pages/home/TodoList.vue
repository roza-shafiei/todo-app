<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import TodoItem from '@/components/pages/home/TodoItem.vue'

const props = defineProps({resetTodos: Boolean})

const todos = ref([])
const sortBy = ref('none') // 'none', 'alpha-asc', 'alpha-desc'

// Load todos from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem('todos')
  todos.value = saved ? JSON.parse(saved) : []
})

// Save todos to localStorage
const setTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

// Remove a todo by ID
const removeTodo = (id) => {
  const index = todos.value.findIndex((t) => t.id === id)
  if (index !== -1) {
    todos.value.splice(index, 1)
    setTodos()
  }
}

// Update a todo
const updateTodo = (updatedTodo) => {
  const index = todos.value.findIndex((t) => t.id === updatedTodo.id)
  if (index !== -1) {
    todos.value[index] = { ...updatedTodo }
    setTodos()
  }
}

// Computed property for sorted todos
const sortedTodos = computed(() => {
  const todosCopy = [...todos.value]

  switch (sortBy.value) {
    case 'alpha-asc':
      return todosCopy.sort((a, b) =>
        a.content.toLowerCase().localeCompare(b.content.toLowerCase())
      )

    case 'alpha-desc':
      return todosCopy.sort((a, b) =>
        b.content.toLowerCase().localeCompare(a.content.toLowerCase())
      )

    default:
      return todosCopy
  }
})

watch(()=>props.resetTodos, (val) => {
  if (val) {
    todos.value = []
    localStorage.removeItem('todos')
    setTodos()
  }
})
</script>

<template>
  <section>
    <!-- Sort Controls -->
    <div v-if="todos.length" class="sort-controls my-4 flex flex-wrap gap-2 items-center justify-center">
      <label class="text-sm font-medium">Sort by:</label>
      <select
        v-model="sortBy"
        class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="none">Default</option>
        <option value="alpha-asc">Alphabetical (A-Z)</option>
        <option value="alpha-desc">Alphabetical (Z-A)</option>
      </select>
    </div>

    <ul v-if="todos.length" class="todo-list space-y-2">
      <li v-for="todo in sortedTodos" :key="todo.id">
        <TodoItem :todo="todo" @remove="removeTodo" @update="updateTodo" />
      </li>
    </ul>
    <p class="mt-4 font-bold text-xs text-center" v-else>add todo...</p>
  </section>
</template>

<style scoped>
.todo-list {
  @apply mt-4;
}

.sort-controls {
  @apply border-b border-gray-200 pb-3;
}
</style>
