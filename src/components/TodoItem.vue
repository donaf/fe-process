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
  <li class="flex flex-wrap items-center justify-between mb-3 pt-3">
    <span class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox w-6 h-6 rounded-1"
        v-model="props.todo.status"
      />
      <b class="mx-3">
        <input
          class="form-input p-2 pl-3 pr-3 rounded border-0 text-lg"
          :class="{ 'line-through': props.todo.status }"
          type="text"
          v-model="props.todo.text"
          @click="onClickInput"
          @blur="onConfirmEdit"
        />
        <button
          class="mx-4 p-2 text-base cursor-pointer bg-blue-600 rounded-md text-light-50"
          @click="onConfirmEdit"
          v-if="props.todo.editable"
        >
          确认
        </button>
      </b>
    </span>
    <div class="text-red-500 cursor-pointer" @click="onDelete">删除</div>
  </li>
</template>

<style scoped></style>
