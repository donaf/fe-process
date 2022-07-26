<script lang="ts" setup>
import { ref, watch } from "vue";
import TodoItem from "../components/TodoItem.vue";
import { useTodoStore } from "../store/modules/todo/index";
import { storeToRefs } from "pinia";
let text = ref("");

const todoStore = useTodoStore();

const { todos, leftNum, fiterTodos } = storeToRefs(todoStore);

const allChecked = ref(false); // 全选
watch(todoStore.todos, (todos) => {
  allChecked.value = todos.every((item) => item.status);
});

/**
 * 输入框
 * @param e
 */
const onInput = (e: any) => {
  let value = e.target.value;
  if (!value.trim()) return;
  text.value = e.target.value;
};

/**
 * 新增
 */
const add = () => {
  todoStore.addTodo(text.value);
  text.value = "";
};

/**
 * 全选
 */
const toggleChecked = () => {
  allChecked.value = !allChecked.value;
  todos.value.forEach((item) => {
    item.status = allChecked.value;
  });
};
</script>

<template>
  <div class="todo-conainter">
    <div class="header">
      <!-- TODO 回车键添加 -->
      <input
        autofocus
        class="input-class"
        type="text"
        v-model="text"
        placeholder="代办项"
        @input="onInput"
      />
      <button class="btn" @click="add" :disabled="!text.trim().length">添加</button>
    </div>
    <div class="content" v-if="fiterTodos && fiterTodos.length > 0">
      <h1 class="title">列表</h1>
      <ul>
        <TodoItem
          v-for="(todo, index) in fiterTodos"
          :key="index"
          :todo="todo"
          @on-delete="todoStore.deleteTodo(index)"
        />
      </ul>
    </div>
    <div class="footer" v-if="todos && todos.length > 0">
      <div class="allChecked-container">
        <div class="allChecked-container-left" @click="toggleChecked">
          <input type="checkbox" :checked="allChecked" class="checkbox" />
          <label class="allChecked-label">全部标记为已完成</label>
        </div>
        <div class="allChecked-container-right">
          <span class="clear-all" @click="todoStore.$reset()">清空所有</span>
        </div>
      </div>
      <div>
        剩 <b>{{ leftNum }}</b> / 总 <b> {{ todos.length }} </b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-conainter {
  padding: 20px;
}

.header {
  display: flex;
  flex-wrap: wrap;
}

.input-class {
  margin-right: 20px;
  padding: 10px;
  width: 300px;
  height: 48px;
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid rgba(200, 200, 200);
  border-radius: 5px;
}

.btn {
  padding: 10px;
  height: 48px;
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  color: #fff;
  background: rgba(59, 134, 232);
  border: 1px solid rgba(59, 134, 232);
  border-radius: 5px;
}

.title {
  margin: 20px 0;
}

ul,
li {
  list-style: none;
}

.allChecked-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
}

.allChecked-label {
  margin-left: 10px;
}

.checkbox {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.clear-all {
  font-weight: bold;
  color: red;
}
</style>
