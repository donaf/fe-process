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
  <div class="container mx-auto p-4 py-10 text-lg">
    <div class="">
      <!-- TODO 回车键添加 -->
      <input
        autofocus
        class="form-input w-100 border-1 rounded-md border-gray-300 p-2 px-3"
        type="text"
        v-model="text"
        placeholder="代办项"
        @input="onInput"
      />
      <button
        class="mx-4 p-2 px-4 bg-blue-600 rounded-md text-light-50 text-base"
        @click="add"
        :disabled="!text.trim().length"
      >
        添加
      </button>
    </div>
    <section
      class="border p-4 pb-1 my-6 rounded-md shadow-lg"
      v-if="fiterTodos && fiterTodos.length > 0"
    >
      <h1 class="text-2xl font-bold text-gray-500">
        <span>列表</span>
        <span class="text-lg ml-2">({{ leftNum }}/{{ todos.length }})</span>
      </h1>

      <ul class="list-none divide-y">
        <TodoItem
          v-for="(todo, index) in fiterTodos"
          :key="index"
          :todo="todo"
          @on-delete="todoStore.deleteTodo(index)"
        />
      </ul>
    </section>
    <footer class="pl-4 pr-4" v-if="todos && todos.length > 0">
      <div class="flex flex-wrap justify-between">
        <div class="cursor-pointer" @click="toggleChecked">
          <input
            type="checkbox"
            :checked="allChecked"
            class="form-checkbox w-6 h-6 rounded-1"
          />
          <label class="mx-5 text-lg">全部标记</label>
        </div>
        <div class="">
          <span class="text-red-500 cursor-pointer" @click="todoStore.$reset()"
            >清空所有</span
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
