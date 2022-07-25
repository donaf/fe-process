# 引入 Vue Router 官方路由
## 安装
### npm
```cmd
npm install vue-router@4
```

### yarn
``` cmd
yarn add vue-router@4
```

在`src`根目录下创建`router`文件夹，新建`index.ts`文件夹
``` typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/about', component: () => import('../views/About.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```
在`views`目录下，创建`Home.vue`、`About.vue`两个文件，初始化文件
``` vue
<!-- src/views/Home.vue -->
<template>
  <div>
    Home
  </div>
</template>
```
在浏览器中访问以下链接，可跳转到不同页面
``` cmd
http://127.0.0.1:5173
http://127.0.0.1:5173/about
```

接下来，开始编写todolist