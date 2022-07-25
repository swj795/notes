

![image-20220107002019936](/Users/swj/Library/Application Support/typora-user-images/image-20220107002019936.png)



**快捷键**

**在普通模式下** 

yy复制光标所在行  3yy 复制光标以下的3hang

dd 删除 3dd

G跳转到尾行 gg回到首行

u是撤销操作

20 shift + g 跳转到第20行

**在命令行模式下**

 /（关键词）   查找关键词

：set nu 设置行号 ：set nonu 取消行号 



### 指令

**添加用户**

useradd xxx

Useradd  -d  [xxx]  xxx 指定添加用户的目录

userdel xxx 删除用户 要求在root下操作（文件夹还存在）

userdel -r xxx 删除用户同时删除了该文件

**修改密码**

passwd xxx  给xxx用户设置密码

**pwd 显示当前文件的绝对路径**



**查看用户信息**

id xxx

**切换用户**

su - xxx

**查看当前用户**

who am i （第一次登入的用户）

~~~bash
// 添加用户
useradd 用户名
// 添加用户时若没有给组 那么自成一组 

// 添加用户指定组
useradd -g 组名 用户名

// 修改用户组
usermod -g 组名 用户名

// 给文件修改组
chgrp 组名 文件名
~~~

![image-20220608144010694](/Users/swj/Library/Application Support/typora-user-images/image-20220608144010694.png)



![image-20220608144952259](/Users/swj/Library/Application Support/typora-user-images/image-20220608144952259.png)

**0位：确定文件类型**

d：表示目录

-： 普通文件

l：链接文件

c：字符设备文件 鼠标 键盘

b：块设备 硬盘

**1-3位确定文件的所有者拥有该文件的权限**

**4-6位确定文件的所在组拥有该文件的权限**

**7-9位确定文件的其他组拥有该文件的权限**

**rwx权限**

对于文件：

r：（read）读取可查看

w：（write）可修改，不一定可以删除，前提对该文件所在目录拥有写的权限

x：（execute）可以被执行

对于目录：

r：可以读取 使用ls  八进制表示4

w：可以修改，创建+ 删除+重命名 八进制表示2

x： 可以进入该目录 使用cd   八进制表示1

 数字代表子目录的总和

普通文件就是1

![image-20220608170742025](/Users/swj/Library/Application Support/typora-user-images/image-20220608170742025.png)

**查看当前运行级别**

systemctl get-default 

**设置当前运行级别**

systemctl set-default TARGET.target

TARGET.target ：multi-user.target  / graphical.target

**.文件表示隐藏文件**

**ls指令**

~~~bash
ls -a // 显示隐藏文件
ls -l // 以列表的方式显示文件的详细信息
~~~

**mkdir指令**

~~~bash
mkdir -p /people/man
// 创建多级目录 -p 
~~~

**rmdir指令**

~~~bash
rm -rf 强制删除 可以删除非空文件夹

rmdir 文件夹 删除空的文件夹
// 只能用来删除文件夹
~~~

**rm指令**

~~~bash
// 可以删除文件或者文件夹
-r 递归删除整个文件夹
-f 强制删除不提示
~~~

**cp指令**

~~~bash
cp 文件1 文件夹 
// 将文件1拷贝到文件2中
cp -r 文件夹1 文件夹2
// 将文件夹1整个拷贝到文件夹2中
-r // 递归复制整个文件夹
\cp -r 文件1 文件2 
// 强制覆盖不提示
~~~

**mv指令**

~~~bash
mv 文件1 文件2  // 重命名
mv 文件1 文件夹 // 将文件1 移动到文件夹下
mv 文件1 文件夹/文件2 // 将文件1 移动到文件夹下且重重命名
~~~

**cat指令**

~~~bash
cat /etc/profile
// 查看文件的内容
~~~

**more指令**

可以和cat结合使用通过管道符｜

![image-20220607231041859](/Users/swj/Library/Application Support/typora-user-images/image-20220607231041859.png)

**echo指令**

~~~bash
echo $HOSTNAME // 输出环境
echo "hello" // 输出内容
~~~

**head指令**

~~~bash
head 文件 // 读取文件前10行的内容
head -n 5 文件 // 用-n来设置读取行数 
~~~

**tail指令**

读取文件尾部内容同head

~~~bash
tail -f 文件
// 实时监控文件 观察文件是否有变化
~~~

~~~bash
>指令
重定向 （覆盖写入）
echo "hello" > 文件
// 输出hello 重定向到文件中

>>
追加写入
~~~

**ln指令**

~~~bash
ln -s 原文件 软连接名
ln -s /root /home/myroot // 给root创建一个软连接
~~~

**history指令**

~~~bash
history // 显示所有的历史命令
history 10 // 显示过去的10指令
!5 // 执行第5条指令 
~~~

**date指令**

~~~bash
date // 显示当前时间
date "+%y-%m-%d %H:%M:%s" // 显示当前年月日 时间
date -s '时间' // 设置时间
~~~

**cal指令**

~~~bash
cal // 显示当前日历
cal 2022 // 显示2022的全部日历
~~~

**find指令**

~~~bash
find 搜索范围 选项

find 	home -size +200M 
// + 大于 -小于 没有符号等于 单位 k M G
~~~

![image-20220608010536802](/Users/swj/Library/Application Support/typora-user-images/image-20220608010536802.png)

**locate指令**

~~~bash
locate // 快速定位到文件位置
// 第一次执行需要使用updatedb指令创建locate数据库
~~~

**which指令**

~~~bash
which ls
// 查找指令存放的目录
~~~

**grep指令**

~~~bash
grep 选项 查找内容 原文件
// 查找hello.text文件中yes所在行号
// 写法1
cat hello.text | grep -n yes
// 写法2
grep -n yes hello.text
~~~

![image-20220608012327945](/Users/swj/Library/Application Support/typora-user-images/image-20220608012327945.png)

**gzip/gunzip指令**

~~~bash
gzip 文件 // 压缩文件 .gz文件
gunzip 文件 // 解压文件
~~~

**zip/unzip指令**

~~~bash
zip [选项] 文件.zip
-r 压缩目录
-d 指定解压后存放的目录
unzip [选项] 文件.zip

zip -r myHome.zip /home // 将home下面的子目录全部打包到myhome.zip中
unzip -d /opt/tmp home/myHome.zip // 将myhome解压到/opt/tmp文件夹中
~~~

**tar指令**

~~~bash
tar [选项] xxx.tar.gz 打包的内容
// 压缩后的文件格式 .tar.gz

// 压缩多个文件
tar -zcvf pc.tar.gz /home/cat.text /home/pig.text

// 将home的文件夹压缩成myhome.tar.gz
tar -zcvf myhome.tar.gz /home

// 将myhome.tar.gz文件解压到/opt/tmp
tar -zxvf myhome.tar.gz -C /opt/tmp
// -C 指定解压到的位置
~~~

![image-20220608140803786](/Users/swj/Library/Application Support/typora-user-images/image-20220608140803786.png)

**chown指令**

~~~bash
chown 用户名 文件名
// 为文件修改所有者
chown swj apple.text
chown newown:newgroup 文件 更改文件的所有者和所在组
-R 代表目录及以下的子目录
~~~

**chmod指令**

~~~bash
// 修改文件或者目录的权限
// 通过+ - = 变更权限
// u所有者 g所在组 o其他人 a所有人

// 给abc文件的所有组读写执行、所在组读执行权限、其他组读执行权限
chmod u=rwx,g=rx,o=rx abc

// 通过数字更改权限
~~~

**chgrp指令**

~~~bash
chgrp newgroup 文件/目录 // 修改文件所在组
-R 目录及以下所有子目录
~~~



![image-20220609094321476](/Users/swj/Library/Application Support/typora-user-images/image-20220609094321476.png)

~~~bash
groupadd polic 
groupadd bandit

useradd -g police jack
useradd -g police jerry
useradd -g bandit xh
useradd -g bandit xq

chmod u=rwx,g=r jack.text
chmod g=rw,o=r jack.text

usermod -g police xh
~~~

xh不能读写，**若要对目录中的文件进行操作，需要有对该目录的相应的权限**

![image-20220609100711288](/Users/swj/Library/Application Support/typora-user-images/image-20220609100711288.png)

~~~bash
groupadd sx
groupadd yg

useradd -g yg wukong
useradd -g yg bajie
useradd -g sx tangsen
useradd -g sx shasen

echo 'i am monkey' >> monkey.java
chmod g=rw monkey.java
usermod -g yg shasen
~~~



### 任务调度

系统在某个时间执行特定的命令或者程序

![image-20220609204112069](/Users/swj/Library/Application Support/typora-user-images/image-20220609204112069.png)

~~~bash
crontab [选项]
*/1 * * * * ls -l /etc > /tmp/to.text
~~~

![image-20220609204356762](/Users/swj/Library/Application Support/typora-user-images/image-20220609204356762.png)

![image-20220609212544819](/Users/swj/Library/Application Support/typora-user-images/image-20220609212544819.png)

![image-20220609212917173](/Users/swj/Library/Application Support/typora-user-images/image-20220609212917173.png)

**at定时任务**

~~~bash
ps -ef // 检测当前在运行的进程
at [选项] [时间]
// ctrl + D 结束at指令的输入 得输入两次
// atq 查询系统中没有执行的工作
// atrm【编号】 删除任务
~~~

at命令是定时执行一次的任务，at的守护进程atd在后台运行 每隔60s

![image-20220609215852204](/Users/swj/Library/Application Support/typora-user-images/image-20220609215852204.png)

![image-20220609220042309](/Users/swj/Library/Application Support/typora-user-images/image-20220609220042309.png)

###  linux分区

~~~bash
lsblk // 查看硬盘挂载情况
~~~

硬盘的分区挂载到每一个目录中

对硬盘进行分区操作

~~~bash
fdisk /dev/sdb
m 显示命令列表
n 新增分区
p 显示磁盘分区（可设置分为几区）
d 删除分区
w 写入并退出

mkfs -t ext4 /dev/sdb1 // 格式化硬盘
mount	设备名称 挂载目录 // 挂载
umount 设备名称或挂载目录 // 卸载
~~~

**用命令行挂载重启会失效**

永久挂载：

1、修改/etc/fstab文件

查询磁盘情况

~~~bash
df -h // 查看整体磁盘情况
du -h /目录 // 查询指定目录的磁盘情况

~~~

![image-20220609234730691](/Users/swj/Library/Application Support/typora-user-images/image-20220609234730691.png)

~~~bash
// 统计目录下的普通文件的个数
ls -l /opt | grep '^-' | wc -l
// wc -l 统计个数
// ‘^-’ 以-开头的文件

// 统计目录中的普通文件及子目录中的普通文件
ls -lR /opt | grep '^-' | wc -l

// 以树状显示
tree /opt 
~~~

### 网络配置

~~~bash
// 测试主机之间网络连通性
ping 网址

// 查看虚拟机的ip
ifcnfig

// 查看主机的ip
ipconfig

~~~



**NAT网络配置**

![image-20220610001212780](/Users/swj/Library/Application Support/typora-user-images/image-20220610001212780.png)

 。。。



设置host映射

windows中

在/system32/drives/etc/hosts文件指定

ip地址 主机名

Hosts: 一个文本文件，用来记录ip和hostname的映射关系

DNS：域名和ip地址相互映射的一个分布式数据库（domain name system）



### 主机名解析机制分析

当用户输入网址：

浏览器先检查浏览器缓存中是否有该域名解析的ip地址，有就调用；

没有，就检查DNS解析器缓存（当电脑第一次访问网站后，浏览器或者操作系统会缓存IP地址），有就用；

没有，就检查系统host文件中有没有配置对应的域名ip映射，有就解析且调用；

没有，进入域名解析服务DNS进行解析域

![image-20220610004628889](/Users/swj/Library/Application Support/typora-user-images/image-20220610004628889.png)

~~~bash
 ipconfig displaydns // DNS 域名解析缓存
 ipconfig flushdns  // 清除DNS缓存
~~~

### 进程管理

在linux中，每一个执行的程序都称为一个进程，每一个进程都分配一个ID号（pid，进程号）

**程序和进程的关系：**

程序—>run 在内存中，程序就转化成一个进程

每个进程分为两种方式：前台与后台。

前台：用户目前屏幕上可操组的

后台：在运行，但不会在屏幕上无法看到的进程

系统的服务都是以后台进程的方式存在，会常驻在系统中，直到关机

![image-20220610211339505](/Users/swj/Library/Application Support/typora-user-images/image-20220610211339505.png)

![image-20220610212535021](/Users/swj/Library/Application Support/typora-user-images/image-20220610212535021.png)

![image-20220610211512310](/Users/swj/Library/Application Support/typora-user-images/image-20220610211512310.png)

~~~bash
ps -ef | grep sshd
// 查看sshd进程
~~~

![image-20220611160614912](/Users/swj/Library/Application Support/typora-user-images/image-20220611160614912.png)

父进程1 (系统的)-> 7690进程（sshd） -> 8454（xshell）

kill 和 killall

~~~bash
kill [选项] 进程号
killall 进程名

// 踢掉某个用户
kill 进程好
// 终止远程登录服务
kill sshd对应的进程号 
// 重启sshd服务
/bin/systemctl start sshd.service

// 强制杀掉进程
kill -9 bash对应的进程号
~~~

pstree

~~~bash
pstree 
-u 显示进程所属用户
-p 显示进程的pid
~~~

### 服务管理

本质是进程，在后台运行，通常监听某个端口，又称为守护进程

~~~bash
service 服务名 [start | stop | restart | reload | status]

// 查看所有的服务
setup

// 查看用service管理的服务
ls -l /etc/init.d
~~~

**chkconfig指令**

 可以给服务在各个运行级别 设置启动与关闭

~~~bash
chkconfig --list // 查看服务

// 把network在3的运行级别关闭自启动
chkconfig --level 3 network off

// chkconfig 设置后需要重启才能生效
~~~

**systemctl指令**

~~~bash
systemctl [start | stop | restart | status] 服务名

// 查看systemctl管理的服务
ls -l /usr/lib/systemd/system

// 查看服务开机启动状态
systemctl list-ubit-files | grep 服务名

// 设置服务开机启动
systemctl enable 服务名

// 设置服务开机关闭
systemctl disable 服务名

// 查看某个服务是否自启动
systemctl is-enabled 服务名

// 使用stop/start 对于防火墙服务而言是立即生效 但是重启系统，回归以前对服务的设置 
// 想要永久生效 需使用enable/disable

// firewalld.service
防火墙服务

// 查看端口协议
netstat -anp 

// 打开端口
firewall-cmd --permanent --add-port=端口号/协议
// 关闭端口
firewall-cmd --permanent --remove -port=端口号/协议
// 重新载入，才能生效
firewall-cmd --reload
// 查看端口是否开放
firewall-cmd --query-port=端口/协议
~~~

### 动态监控

**top指令**

![image-20220611225943386](/Users/swj/Library/Application Support/typora-user-images/image-20220611225943386.png)

![image-20220611230613628](/Users/swj/Library/Application Support/typora-user-images/image-20220611230613628.png)

### 监控网络状态

~~~bash
// 查看系统网络情况
netstat -anp
// -an 按照一定顺序排列输出
// -p 显示那个进程在调用
~~~



~~~bash
rpm -qa // 查询安装所有的rpm包

rpm -q [软件包名]  // 查询是否安装包

rpm -qi [] // 查看软件包名信息

rpm -qf [文件全路径名]  // 查询文件所属的软件包

rpm -e [软件包]  // 删除软件包

yum list | grep 软件 // 查询yum服务器是否有需要安装的软件
yum install 软件 // 安装指定的yum包
~~~





安老师，有一张专硕实践考核表需要公司的盖章，和您的签名













