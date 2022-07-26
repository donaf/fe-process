import { defineStore } from 'pinia'
import { TodoState } from './types';

export const useTodoStore = defineStore(
  {
    id: 'todo',
    state: (): TodoState => {
      return {
        todos: [
          {
            status: true,
            editable: false,
            text: "初始化",
          },
          {
            status: false,
            editable: false,
            text: "编写html",
          },
        ]
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