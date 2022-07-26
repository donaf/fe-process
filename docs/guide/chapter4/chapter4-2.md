# 引入windicss
[windicss官网](https://cn.windicss.org/)

## 安装
### Vite集成
```cmd
npm i -D vite-plugin-windicss windicss
# 或 yarn
yarn add vite-plugin-windicss windicss --dev
```

然后，在你的 Vite 配置中添加插件：
``` typescript
// vite.config.js
import WindiCSS from 'vite-plugin-windicss'

export default {
  plugins: [
    WindiCSS(),
  ],
}
```
最后，在你的 Vite 入口文件中导入 virtual:windi.css：
```typescript
import 'virtual:windi.css'
```

## 支持
### Typescript
```typescript
// tailwind.config.ts
import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  plugins: [formsPlugin],
})
```