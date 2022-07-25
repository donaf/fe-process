# 抽离Component组件
每一项Item可单独抽离，确定好抽离代码块。
在 `src` 目录下新建 `TodoItem.vue` 组件。
``` vue
<script lang="ts" setup></script>

<template>
  <div>
    TodoItem
  </div>
</template>
```
在 `src/views/Home.vue` 里添加如下代码，将TodoItem组件引入。
``` vue
<script>
import TodoItem from "../components/TodoItem.vue";
</script>

<template>
  <div>
    <TodoItem></TodoItem>
  </div>
</template>
```

将 `src/views/Home.vue` 里的需提取的代码复制一份至 `TodoItem.vue` 中。