import { defineStore } from 'pinia'
import { TodoState } from './types';

export const useTodoStore = defineStore(
  'todo',
  {
    state: (): TodoState => {
      return {
        todos: []
      }
    },
    getters: {
      fiterTodos: (state) => state.todos,
      leftNum: (state) => state.todos.filter(item => !item.status).length
    },
    actions: {
      addTodo(text: string) {
        this.todos.push({
          status: false,
          editable: false,
          text
        })
      },
      deleteTodo(index: number) {
        this.todos.splice(index, 1)
      }
    }
  }
)