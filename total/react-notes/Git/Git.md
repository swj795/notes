# Git 

## 提交代码

每做一个需求提交一个，不要一下子全部提交

git add . 

git commit -m  'feat 代表增加' 'fix 代表修改' 'style 修改样式'

git push 



## 同步代码

git pull --all  // 先拉取最新的

git merge origin/master  // 把master分支合到自己的分支

git push // 和远程自己分支同步



**遇到的问题**

![image-20211129183423706](C:\Users\lyh\AppData\Roaming\Typora\typora-user-images\image-20211129183423706.png)

如果git push出现这样的错误，那么说明本地代码和远程仓库的代码有不同

需要先执行git pull 将远程仓库的代码拉取到本地进行统一，然后再执行git push 命令



push之后看一下lint检查是否有错误

确认错误修改后，MR代码

