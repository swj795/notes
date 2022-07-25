# 项目配置Eslint

```bash
npm install eslint --save-dev

yarn install eslint --save-dev

yarn create @eslint/config
```

安装prettier

```bash
yarn add --dev --exact prettier
// 创建.prettier文件
// 文件中配置
```

解决prettier和eslint冲突

```bash
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
npm install --save-dev eslint-config-prettier
```

最终的配置图

Eslintrc.js

![image-20220308235753227](/Users/swj/Library/Application Support/typora-user-images/image-20220308235753227.png)

prettier

![image-20220308235818230](/Users/swj/Library/Application Support/typora-user-images/image-20220308235818230.png)

Package.json

![image-20220308235839726](/Users/swj/Library/Application Support/typora-user-images/image-20220308235839726.png)

当修改prettier文件后，重启一下vscode