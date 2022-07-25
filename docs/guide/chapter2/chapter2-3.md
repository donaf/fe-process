# 编码
## 增加 `input` 输入框

> 点击确定，添加到列表

在`Home.vue`页面中编写代码，需要输入框可输入
``` vue
<!-- src/views/Home.vue -->
<template>
  <div>
    <div class="header">
      <input type="text" placeholder="代办项" />
      <button>添加</button>
    </div>
  </div>
</template>
```
## 展示列表

> 用`list`存储代办项
> 当`list.length > 0`时才显示列表

## 删除功能

> 每一项增加删除按钮
> 点击删除按钮，从list中删除该项