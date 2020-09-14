<template>
    <div>
        <h2>Todo list</h2>
        <hr>
        <router-link to="/">Home</router-link>
        <AddTodo
                @add-todo="AddTodo"/>
        <hr>
        <select v-model="filter">
            <option value="all">All</option>
            <option value="completed">completed</option>
            <option value="not-completed">Not completed</option>
        </select>
        <Preloader v-if="loading"/>
        <TodoList
                v-else-if="filteredTodos.length"
                v-bind:todos="filteredTodos"
                @remove-todo="removeTodo"
        />
        <p v-else>No todos!</p>
    </div>
</template>

<script>
    //import TodoList from '@/components/TodoList' ///src
    import TodoList from "@/components/TodoList";
    import AddTodo from "@/components/AddTodo";
    import Preloader from "@/components/Preloader";
    export default {
        name: 'Todos',
        data() {
            return {
                todos : [
                    {id: 1, title: 'Купить хлеб', completed: false},
                    {id: 2, title: 'Купить масло', completed: false},
                    {id: 3, title: 'Купить пиво', completed: false}
                ],
                loading: true,
                filter: 'all'
            }
        },
        mounted() {
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
                .then(response => response.json())
                .then(json => {
                    setTimeout(()=>{
                        this.todos = json,
                            this.loading = false
                    }, 2000)

                })
        },
        // watch: {
        //     filter(value) {
        //       console.log(value);
        //   }
        // },
        computed: {
          filteredTodos() {
              if (this.filter === 'all') {
                  return this.todos;
              }

              if (this.filter === 'completed') {
                  return this.todos.filter(t => t.completed);
              }

              if (this.filter === 'not-completed') {
                  return this.todos.filter(t => !t.completed);
              }
          }
        },
        components: {
            TodoList, AddTodo, Preloader
        },
        methods: {
            removeTodo(id) {
                this.todos = this.todos.filter( t => t.id !== id );
            },
            AddTodo(todo) {
                this.todos.push(todo);
            }
        }
    }
</script>

<style scoped>

</style>