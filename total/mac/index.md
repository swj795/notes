#### 修改host文件

```bash
sudo vim etc/host
```



#### 用brew安装东西

![image-20220105175930738](/Users/swj/Library/Application Support/typora-user-images/image-20220105175930738.png)

出现这种问题时，重新安装一下报错的东西，可能就能解决问题



#### 解决找不到nvm命令

```bash
cd ~/.nvm
open .bash_profile
// 如果没有此文件
touch .bash_profile
// 在此文件下添加
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
// 修改文件后
source .bash_profile
```



####  关闭终端 重启都需要重新执行 source .bash_profile

```bash
open ~/.zshrc
// 在/.zshrc文件中添加配置
export NVM_DIR=~/.nvm
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

source ~/.zshrc
```

