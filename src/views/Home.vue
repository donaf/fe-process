<script lang="ts" setup>
import { ref, reactive, computed } from "vue";

interface Todo {
  status: boolean;
  text: string;
  editable: boolean; //是否可编辑
}

let text = "";

const list: Todo[] = reactive([
  {
    status: true,
    editable: true,
    text: "初始化",
  },
  {
    status: false,
    editable: false,
    text: "编写html",
  },
]);

const onInput = (e: any) => {
  text = e.target.value;
};

/**
 * 新增
 */
const add = () => {
  let todo = {
    status: false,
    editable: false,
    text,
  };
  list.push(todo);
  text = "";
};

/**
 * 删除
 */
const onDelete = (index: number) => {
  list.splice(index, 1);
};

const leftNum = computed(() => list.filter((item) => !item.status).length);

/**
 * 编辑
 * @param item
 */
//TODO 双击聚焦输入框
const onClickInput = (item: Todo) => {
  item.editable = true;
};

/**
 * 确认修改
 * @param item
 */
// TODO 点击确认按钮，内容才保存
const onConfirm = (item: Todo) => {
  //
};
</script>

<template>
  <div class="todo-conainter">
    <div class="header">
      <input
        class="input-class"
        type="text"
        v-model="text"
        placeholder="代办项"
        @input="onInput"
      />
      <button class="btn" @click="add">添加</button>
    </div>
    <div class="content" v-if="list && list.length > 0">
      <h1 class="title">列表</h1>
      <ul>
        <li class="li" v-for="(item, index) in list" :key="index">
          <span class="li-left">
            <input type="checkbox" class="checkbox" v-model="item.status" />
            <b
              :class="{ 'text-done': item.status }"
              @click="onClickInput(item)"
            >
              <input
                class="li-text"
                :class="{ 'li-text_active': item.editable }"
                type="text"
                v-model="item.text"
                :disabled="!item.editable"
              />
              <button class="btn-confirm" @click="onConfirm(item)">确认</button>
            </b>
          </span>
          <span class="delete" @click="onDelete(index)">删除</span>
        </li>
      </ul>
    </div>
    <div class="footer" v-if="list && list.length > 0">
      <div>剩余：{{ leftNum }}项</div>
      <div>总共：{{ list.length }}项</div>
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
.li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding-bottom: 16px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
}
.li-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.checkbox {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}
.text-done {
  text-decoration: line-through;
}

.li-text {
  padding: 8px 10px;
  font-size: 16px;
  background: none;
  border: none;
}
.li-text_active {
  border: 1px solid #ddd;
  border-radius: 3px;
}
.delete {
  color: red;
  cursor: pointer;
}

.btn-confirm {
  margin-left: 10px;
}
</style>
