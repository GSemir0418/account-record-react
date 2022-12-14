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

### 1.3 配置 snippets

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

### 1.4 配置 Eslint

- google `eslint antfu` 或者

  - > https://github.com/antfu/eslint-config

- 先装依赖，再写配置`.eslintrc`、`settings.json`和`scripts`命令即可
- VSCode 的`Eslint`插件可以使其具有错误提示功能，否则只能使用命令行进行代码校验
- 如果对某些默认规则不习惯，可以在`.eslintrc`的`rules`属性将其设置为`off`

## 0 其他

- vim 删除至某处 `dt'x'`
