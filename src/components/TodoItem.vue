<script lang="ts" setup>
const props = defineProps({
  todo: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["on-delete"]);

/**
 * 删除
 */
const onDelete = () => {
  emit("on-delete");
};

/**
 * 编辑
 */
const onClickInput = () => {
  props.todo.editable = true;
};

/**
 * 确认修改
 */
const onConfirmEdit = () => {
  if (!props.todo.text.trim()) {
    emit("on-delete");
  }
  props.todo.editable = false;
};
</script>

<template>
  <li class="li">
    <span class="li-left">
      <input type="checkbox" class="checkbox" v-model="props.todo.status" />
      <b>
        <input
          class="li-text"
          :class="{ 'li-text_done': props.todo.status }"
          type="text"
          v-model="props.todo.text"
          @click="onClickInput"
          @blur="onConfirmEdit"
        />
        <button class="btn-confirm" @click="onConfirmEdit" v-if="props.todo.editable">
          确认
        </button>
      </b>
    </span>
    <span class="delete" @click="onDelete">删除</span>
  </li>
</template>

<style scoped>
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
</style>
