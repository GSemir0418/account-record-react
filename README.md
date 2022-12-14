##1 初始化

1. 创建项目

```bash
pnpm create vite@3.1.0 account-record-react -- --template react-ts
```

2. 删除静态资源及 css

##2 依赖版本管理

1. 先把项目现有的版本锁定
   - 删除 package.json 文件依赖版本中的`^`字符
   - 安装 npm Intellisense 插件，检查已安装的版本与 package.json 的差异
   - 以已经安装的版本为准
1. 锁定后续安装依赖的版本

   - 修改 npm 配置，在安装依赖时不会自动加`^`字符

   - ```bash
     npm config set save-prefix=""
     ```

## 0 其他

- vim 删除至某处 `dt'x'`
