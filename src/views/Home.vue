<script lang="ts" setup>
import { ref, reactive, computed } from "vue";

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
const onClickInput = (item: Todo, e: any) => {
  item.editable = true;
};

/**
 * 确认修改
 * @param item
 */
const onConfirm = (item: Todo, index: number) => {
  // list[index].editable = true;
  if (!item.text.trim()) {
    list.splice(index, 1);
  }
  item.editable = false;
};

/**
 * input失焦
 * @param item
 * @param index
 * @param e
 */
const onBlurEdit = (item: Todo, index: number, e: any) => {
  if (!e.target.value.trim()) {
    list.splice(index, 1);
  }
  item.editable = false;
};

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
        <li class="li" v-for="(item, index) in list" :key="index">
          <span class="li-left">
            <input type="checkbox" class="checkbox" v-model="item.status" />
            <b>
              <input
                :ref="`liText[${index}]`"
                class="li-text"
                :class="{ 'li-text_done': item.status }"
                type="text"
                v-model="item.text"
                @click="onClickInput(item, $event)"
                @blur="onBlurEdit(item, index, $event)"
              />
              <button
                class="btn-confirm"
                @click="onConfirm(item, index)"
                v-if="item.editable"
              >
                确认
              </button>
            </b>
          </span>
          <span class="delete" @click="onDelete(index)">删除</span>
        </li>
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
.li-text {
  padding: 8px 10px;
  font-size: 16px;
  background: none;
  border: none;
}
.li-text_done {
  text-decoration: line-through;
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
.allChecked-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.allChecked-label {
  margin-left: 10px;
}
</style>
