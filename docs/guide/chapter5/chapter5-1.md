# Vitest测试
由 `Vite` 提供支持的激素单元测试框架。
## 安装
```cmd
# 使用 npm
npm install -D vitest
# 使用 yarn
yarn add -D vitest
# 使用 pnpm
pnpm add -D vitest
```

## 配置
文件根目录新建 `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    // ...
  },
})

```

## 命令行
``` json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

```

## Vitest UI
``` cmd
npm i -D @vitest/ui
```
``` cmd
vitest --ui
```

## 对象模拟
支持使用 `happy-dom` 或 `jsdom` 来模拟DOM和浏览器API。Vitest不内置它们，需要安装。
```cmd
$ npm i -D happy-dom
# or
$ npm i -D jsdom
```
更改配置文件
```typescript
// vite.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'happy-dom', // or 'jsdom', 'node'
  },
})
```

## 覆盖率
`Vitest` 通过 `c8` 来输出代码测试覆盖率。
``` json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

```
``` typescript
// vite.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
```