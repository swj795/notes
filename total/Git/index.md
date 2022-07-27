# Git

~~~bash
git init 
// 初始化一个项目作为仓库
~~~

~~~bash
git remote add oigin 仓库名
// 添加或者连接到远程仓库
~~~

~~~bash
git remote
// 查看连接的远程仓库
~~~

~~~bash
git status
// 在本地仓库查看文件的状态
~~~

~~~bash
git add 文件名
// 存储修改或未跟踪文件
git add -a 
git add . 
// 存储所有未存储的文件
~~~

~~~bash
git reset 
// 取消暂存文件
~~~

~~~bash
git commit 
// 提交暂存文件
git commit -m ''
// 给提交的文件一个解释说明
~~~

~~~bash
git push -u origin master
// 初次使用git push
~~~

~~~bash
git fetch 
// 获取最新的远程仓库分支上的内容
~~~

~~~
git merge 
// 合并两个分支
git merge --abort 
// 中止合并
~~~

~~~bash
git pull 
// 更新本地仓库为远程仓库最新的版本
// 相当于git fetch + git pull
~~~

~~~bash
git rm -r --cached 文件名
// 从远程仓库删除某个文件但是本地不删除
~~~

~~~bash
git branch 
// 预览当前所在分支
git branch -a 
// 预览所有分支
// git branch -r
// 预览所有本地分支
git branch 分支名
// 在本地仓库新建一个分支
~~~

~~~bash
git checkout --track origin/分支名
// 在远程创建一个分支
git checkout 分支名
// 切换分支

~~~

~~~
git reset --hard HEAD
// 删除本地仓库做出的修改，并更新到最后一次提交到远程仓库的代码
~~~

~~~bash
git clean -f 
// 删除在本地未跟踪的文件
git clean -d
// 删除本地未跟踪的文件夹
~~~

~~~bash
git rebase
// 移除最新的一次提交
// 为了重组你的提交
git rebase -i HEAD ~N
// 回退到第几次提交前
~~~





































