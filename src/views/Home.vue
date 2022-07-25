<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import TodoItem from "../components/TodoItem.vue";

// TODO interface抽离
interface Todo {
  status: boolean;
  text: string;
  editable: boolean; //是否可编辑
}

let text = ref("");

const allChecked = ref(false); // 全选
const list: Todo[] = reactive([
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
]);

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
  let todo = {
    status: false,
    editable: false,
    text: text.value,
  };
  list.push(todo);
  text.value = "";
};

const leftNum = computed(() => list.filter((item) => !item.status).length);


/**
 * 全选
 */
const toggleChecked = () => {
  allChecked.value = !allChecked.value;
  list.forEach((item) => {
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
      <button class="btn" @click="add" :disabled="!text.trim().length">
        添加
      </button>
    </div>
    <div class="content" v-if="list && list.length > 0">
      <h1 class="title">列表</h1>
      <ul>
        <TodoItem v-for="(todo, index) in list" :key="index" :todo="todo" />
      </ul>
    </div>
    <div class="footer" v-if="list && list.length > 0">
      <div class="allChecked-container">
        <input
          type="checkbox"
          :checked="allChecked"
          class="checkbox"
          @change="toggleChecked"
        />
        <label class="allChecked-label">全部标记为已完成</label>
      </div>
      <div>
        剩 <b>{{ leftNum }}</b> / 总 <b> {{ list.length }} </b>
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
  align-items: center;
  margin-bottom: 20px;
}

.allChecked-label {
  margin-left: 10px;
}
</style>
