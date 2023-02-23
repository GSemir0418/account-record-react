## 1 初始化

### 1.1 创建项目

```bash
pnpm create vite@3.1.0 account-record-react -- --template react-ts
```

同时删除静态资源及 css

### 1.2 依赖版本管理

1. 先把项目现有的版本锁定
   - 删除 package.json 文件依赖版本中的`^`字符
   - 安装 npm Intellisense 插件，检查已安装的版本与 package.json 的差异
   - 以已经安装的版本为准
1. 锁定后续安装依赖的版本

   - 修改 npm 配置，在安装依赖时不会自动加`^`字符

   - ```bash
     npm config set save-prefix=""
     ```
### 1.3 部署到Github Page

1. 打包项目（注意配置github的base）
2. 进入dist，初始化github仓库，提交代码
3. 在远端仓库中配置Page，设置好分支即可
4. 已将以上命令整合为自动化脚本，因此执行`bin/deploy_github.sh`即可
- 访问https://gsemir0418.github.io/account-record-react-preview

### 1.4 配置 Snippets

1. `ctrl+shift+p`打开命令窗口
2. 输入 snippet，选择`Snippets: Configure User Snippets`
3. 选择 `typescriptreact`，在 json 文件中添加如下内容

   ```json
   "React.FC": {
      "prefix": "fc",
      "body": [
         "import * as react from 'react'",
         "export const $1 = () => {",
         "  return <div>$1 $2</div>",
         "}"
      ]
   },
   ```

   注意换行及缩进

### 1.5 配置 Eslint

- google `eslint antfu` 或者

  - > https://github.com/antfu/eslint-config

- 先装依赖，再写配置`.eslintrc`、`settings.json`和`scripts`命令即可
- VSCode 的`Eslint`插件可以使其具有错误提示功能，否则只能使用命令行进行代码校验
   - 记录一个小插曲：ESLint失效——命令行可以使用但编辑器没有提示
   - 解决方案：在终端的OUTPUT窗口，切换到ESLint，发现pnpm报错
   ```
   Error: Command failed: pnpm root -g
   ``` 
   - 输入pnpm root -g，提示先运行pnpm setup
   ```sh
   pnpm setup
   source ~/.zshrc
   ```
   - 然后重启vscode即可
   - 还有一种可能是配置项添加
   ```json
   "eslint.enable": true,
   "eslint.packageManager": "pnpm",
   ```
- 如果对某些默认规则不习惯，可以在`.eslintrc`的`rules`属性将其设置为`off`

## 2 React Router 6实践

> https://reactrouter.com/en/main

### 2.1 初始化路由

安装 `react-router-dom`

main.tsx 引入：
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// 定义 router
const router = createBrowserRouter([
  { path: '/', element: <div>root</div> }, {
    path: '/1', element: <div>11</div>,
  },
])
// ...
```
与 React 关联
```tsx
// ...
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

### 2.2 错误处理

配置路由表时，设置`errorElement`属性来处理路由报错
```tsx
// main.tsx
{
  path: '/',
  element: <div>root</div>,
  errorElement: <ErrorPage/>,
},
// ...
```
```tsx
// components/ErrorPage.tsx
import { useRouteError } from 'react-router-dom'
export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.error(error)

  return <div>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occured.</p>
    <p>
      <i>{error.statusText || error.message}</i>
    </p>
  </div>
}
```

### 2.3 嵌套路由

配置 children 属性，实现嵌套路由：
```tsx
// main.tsx
const router = createBrowserRouter([
  {
    path: '/',
    // Outlet 表示子路由出口
    // 当只有 Outlet 元素时，此属性可以省略
    element: <Outlet/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        // 仅在根路由展示的内容
        index: true,
        element: <div>index 1 2 3</div>,
      },
      {
        path: '1',
        element: <div>1</div>,
      },
      {
        path: '2',
        element: <div>2</div>,
      },
      {
        path: '3',
        element: <div>3</div>,
      },
    ],
  },
  // 优先级要高于定义在 children 属性中的路由
  {
    path: '/4',
    element: <div>4</div>,
  },
])
```

### 2.4 实现重定向

改造 ErrorPage 为 RedirectToWelcome1，利用 useNavigate API 实现手动重定向：
```tsx
// components/RedirectToWelcome1
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const RedirectToWelcome1: React.FC = () => {
  const nav = useNavigate()
  useEffect(() => {
    nav('/welcome/1')
  }, [])
  return null
}
```
```tsx
// main.tsx
// ...
{
  path: '/',
  element: <Outlet/>,
  errorElement: <RedirectToWelcome1/>,
}
// ...
```
重构代码:
```
src
├── App.tsx
├── components
│   └── RedrectToWelcome1.tsx
├── layouts
│   ├── MainLayout.tsx
│   └── WelcomeLayout.tsx
├── main.tsx
├── pages
│   ├── Welcome1.tsx
│   ├── Welcome2.tsx
│   ├── Welcome3.tsx
│   └── Welcome4.tsx
├── routes
│   ├── router.tsx
│   └── welcomeRoutes.tsx
└── vite-env.d.ts
```
```tsx
// layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom'
export const MainLayout = () => {
  return <Outlet />
}
```
```tsx
// routes/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { RedirectToWelcome1 } from '../components/RedrectToWelcome1'
import { MainLayout } from '../layouts/MainLayout'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    errorElement: <RedirectToWelcome1/>,
    children: [
      welcomeRoutes,
    ],
  },
])

// routes/welcomeRoutes.tsx
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'

export const welcomeRoutes = {
  path: 'welcome',
  element: <WelcomeLayout/>,
  children: [
    {
      path: '1',
      element: <Welcome1/>,
    },
    {
      path: '2',
      element: <Welcome2/>,
    },
    {
      path: '3',
      element: <Welcome3/>,
    },
    {
      path: '4',
      element: <Welcome4/>,
    },
  ],
}
```

### 2.5 路由动画库 react-spring

> https://www.react-spring.dev/docs/getting-started

过渡动画的全程包括三种状态：*稳定*状态、*进入*状态和*退出*状态

利用 react-spring 库提供的功能，结合当前 location 信息与 Outlet 组件渲染视图，制作路由切换的过渡动画。

改写 WelcomeLayout：
```tsx
// layouts/WelcomeLayout.tsx
import { animated, useTransition } from '@react-spring/web'
import { Outlet, useLocation } from 'react-router-dom'
export const WelcomeLayout: React.FC = () => {
  // 获取当前地址栏的信息
  const location = useLocation()
  const transitions = useTransition(location.pathname, {
    // 进入状态 (屏幕右边进入)
    from: { transform: 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态（屏幕左边退出）
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 5000 },
  })
  // 会根据location自动返回对应的组件
  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        <Outlet />
      </div>
    </animated.div>
  })
}
```
目前存在一个bug：在过渡动画过程中，当 welcome1 和 welcome2 两个视图同时存在于页面中时，会发现 welcome1 变成了 welcome2。
这是由于 path 改变后，Outlet 会匹配渲染对应的组件。
此时需要缓存旧的组件，从而在切换路由时保持住旧组件的渲染，同时渲染新组件：
```tsx
// 过渡动画的全程包括三种状态：稳定状态、进入状态和退出状态
import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

const renderCache: Record<string, ReactNode> = {}
export const WelcomeLayout: React.FC = () => {
  // ...
  // 获取当前路由渲染出口
  const outlet = useOutlet()
  // 缓存当前路由与 Outlet 组件
  renderCache[location.pathname] = outlet
  // ...
  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        {/* 渲染缓存中的 outlet，而不是最新的 <Outlet /> */}
        {renderCache[pathname]}
      </div>
    </animated.div>
  })
}
```
第一次是不需要动画的，在 from 状态中添加判断：
```tsx
const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    // ...
  })
```
map定义在组件外，与组件生命周期不同步，存在内存泄漏的问题，因此改用Ref

## 3 CSS in JS 三种方案

表面上，React 的写法是 HTML、CSS、JavaScript 混合在一起。但是，实际上不是。现在其实是用 JavaScript 在写 HTML 和 CSS。

> 相关阅读：CSS Preprocessor
> CSS 预处理器是一个能让你通过预处理器自己独有的语法来生成 CSS 的程序。市面上有很多 CSS 预处理器可供选择，且绝大多数 CSS 预处理器会增加一些原生 CSS 不具备的特性，例如代码混合，嵌套选择器，继承选择器等。这些特性让 CSS 的结构更加具有可读性且易于维护。
—— 《MDN / CSS 预处理器》

React 在 JavaScript 里面实现了对 HTML 和 CSS 的封装，我们通过封装去操作 HTML 和 CSS。也就是说，网页的结构和样式都通过 JavaScript 操作。
- React 对 HTML 的封装是 JSX 语言 ，这个在各种 React 教程都有详细介绍，本文不再涉及了，下面来看 React 对 CSS 的封装。

- React 对 CSS 封装非常简单，就是沿用了 DOM 的 style 属性对象，这个在前面已经看到过了。

由于 CSS 的封装非常弱，导致了一系列的第三方库，用来加强 React 的 CSS 操作。它们统称为 CSS in JS，意思就是使用 JS 语言写 CSS

### 3.1 CSS Modules

Vite 内置 CSS Modules 支持，约定命名要包含 `.module`。以 Welcome1 组件为例

#### 3.1.1 安装与使用

`pnpm add -D sass` 安装 `sass` 预处理器

默认引入style对象，将其内部属性作为 className 传递给组件
```tsx
// pages/Welcome1.tsx
import style from './Welcome1.module.scss'
export const Welcome1 = () => {
  return (
    <div className={style.container}>
      Welcome1
    </div>
  )
}
// pages/Welcome1.module.scss
.container {
  border: 1px solid red
  &:hover {
    border: 10px solid red
  }
}
```

#### 3.1.2 多个类名

- 多个类名共同作用与单个组件时，可以使用 `join(' ')` 方法处理：
```tsx
<div className={[style.redBd, style.blueBg].join(' ')}>
  Welcome1
</div>
```
也可以使用 `classnames` 库。`pnpm add classnames` 安装：
```tsx
<div className={classnames(style.redBd, style.blueBg)}>
  Welcome1
</div>
```

#### 3.1.3 嵌套样式

可以正常使用 sass 语法的嵌套样式：

```tsx
// pages/Welcome1.tsx
<div className={style.father}>
  <div className={style.child}>子类red</div>
  <div>子类</div>
</div>
// pages/Welcome1.module.scss
.father {
  .child {
    color: red
  }
}
```

#### 3.1.4 固定类名及样式

- 指定固定类名：利用 `classnames` 整合 module 的类名与固定类名字符串即可

  ```tsx
  <div className={classnames(style.random, 'gsq')}>固定类名</div>
  ```
- 指定固定类名的样式：利用 `:global()` 包裹固定类名，即告诉 css modules 不要对该类名添加随机字符串 

  ```css
  :global(.gsq) {
    background: #000;
  }
  ```

#### 3.1.5 总结
TODO

### 3.2 Styled Components
> https://styled-components.com/

- 安装：`pnpm add styled-components @types/styled-components`
- 使用：使用 `styled` 的属性（例如 `styled.div`）定义一个元素，后紧跟样式字符串，支持scss等语法；在函数组件中以组件的形式使用即可。
```tsx
import styled from 'styled-components'
const BlueBox = styled.div`
  background-color: blue;
  color: red;
  // 支持 scss
  &:hover {
    background-color: aliceblue;
  }
`
export const Welcome2 = () => {
  return (
    <div>
      <BlueBox>2</BlueBox>
    </div>
  )
}

```
- 样式复用：将复用的组件样式传入 `styled()` 中，后紧跟新的样式字符串：
  - 无法对 React Component 进行样式复用

```tsx
import styled from 'styled-components'
// 复用组件样式
const BlueBoxWithWhiteText = styled(BlueBox)`
  color: white;
`
export const Welcome2 = () => {
  return (
    <div>
      <BlueBoxWithWhiteText>22</BlueBoxWithWhiteText>
    </div>
  )
}
```
- 传递参数：样式属性可以定义为回调函数，从而获取组件 props 中的数据；同时我们完全可以将 styled components 当作普通组件来使用：
```tsx
import { useState } from 'react'
import styled from 'styled-components'

// 接收参数
const Button = styled.button`
  color: ${props => props.color};
`
export const Welcome2 = () => {
  const [color, setColor] = useState<'red' | 'green'>('red')
  const onClick = () => {
    setColor(color === 'red' ? 'green' : 'red')
  }
  return (
    <div>
      <Button onClick={onClick} color={color}>change my color</Button>
    </div>
  )
}

```
- 安装 vscode-styled-components 插件以获取 VSCode 代码提示支持
- 总结：
  - 类名完全随机
  - 无需新建css文件，符合组件化思想
  - 组件提升可维护性，但可读性较差
  - 适合纯样式组件

### 3.3 Unocss 
原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。
#### 3.3.1 由来

Tailwind Css
写起来很爽
<div class="h-100 w-100 bg-red b-1 b-red"/>
缺点在于它会先加载所有类名对应的样式文件，再去匹配样式，导致CSS文件过于臃肿，造成资源浪费。

Windi Css
属性化模式 使得类名可以作为元素属性传入；
基于 JIT，实现了按需生成样式文件，解决了 Tailwind 最大的缺陷

Unocss
> https://github.com/unocss/unocss
作者 antfu 来自 WindiCss 团队，UnoCSS 是一个原子化CSS引擎，而非一款框架，所有功能可以通过预设和内联配置提供，也就是说，上面提到的两种框架都可以作为插件从而得到兼容。将作为下一代 WindiCss 的引擎

#### 3.3.2 安装与配置

写起来爽，但配置是真的麻烦
1. 安装 `pnpm add -D unocss`
2. 在 `main.tsx` 中引入样式（注意 React 项目引入的名称是不同的）
```tsx
import 'virtual:uno.css'
```
3. 在 `vite.config.ts` 中引入（注意顺序，要在 react 之前）
```ts
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [Unocss(), react()],
})

```
4. 同级目录下创建 `uno.config.ts`
```ts
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerAttributifyJsx } from 'unocss'
export default defineConfig({
  theme: {},
  shortcuts: {},
  safelist: [],
  presets: [
    // 必须引用的
    presetUno(),
    // 支持属性化
    presetAttributify(),
    // 预设图标类样式
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'center' },
    }),
    // 预设板式
    presetTypography(),
  ],
  transformers: [
    // jsx支持属性化
    transformerAttributifyJsx(),
  ],
})
```
5. 安装 `UnoCSS` VSCode 插件

6. 处理类型问题

```ts
// src/uno.d.ts
import type { AttributifyAttributes } from 'unocss/preset-attributify'
declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    flex?: boolean
  }
}
```
   
#### 3.3.3 使用

1. 三栏布局：
   
```tsx
export const Welcome3 = () => {
  return (
  <div flex justify-center items-center after='content-[hi]'>
    <div bg-red hover:bg-blue w-200px h-100px>sider</div>
    <div bg-green flex-1 h-100px>main</div>
    <div bg-yellow w-100px h-100px>sider</div>
  </div>
  )
}
```
1. 修改默认样式

UnoCSS 会有一些预设的样式参数变量，当我们要修改预设样式的属性时，可以在全局 css 文件中修改对应的 css 变量即可
```css
// src/global.scss
:root {
  --un-shadow-color: red
}
```
#### 3.3.4 总结

- 不用创建css文件，不用关心类名
- 写起来爽

## 0 其他

- vim 删除至某处 `dt'x'`
