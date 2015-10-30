# github使用

## 注册github

地址<https://github.com>, 过程略

## 安装git

1. windows
- 下载安装包, 地址<http://git-scm.com/download/win>
- 点击安装, 一路下一步就好了

2. mac

```bash
brew install git
```

3. ubuntu, debian, etc

```bash
apt-get install git
```

4. fedora, centos, etc

```bash
yum install git
```

## 添加SSH Key到github

**参考<https://help.github.com/articles/generating-ssh-keys/>**

1. 生成ssh key pair **如果已经有就不用再生成了**

- 打开一个终端, 如果是`windows`, 用`git bash`, (win7开始里面搜就有, 以下的终端对windows都指这个)
- `ssh-keygen -t rsa`, 一路回车完成

2. 打开<https://github.com/settings/ssh>, 点击`Add SSH Key`, `Title`随便写, 
`Key`填本机的`~/.ssh/id_rsa.pub`文件的内容(如果是以前生成的, 就用以前生成的那个文件的). 保存

3. 测试, 终端内`ssh -T git@github.com`, 如果出现以下内容表示成功
```
Hi acrazing! You've successfully authenticated, but GitHub does not provide shell access.
```

## 初始化仓库

1. 获取代码权限, 这一步有两种方式, 一种是把你的github的`username`告诉我, 我把你加到项目的
`collaborator`里面去; 另一种是先访问<https://github.com/acrazing/caijun-fe>, 点击右上角的
`Fork`. (建议用第一种, 这样`push`比较方便)

2. 克隆到本地, 如果第一步用第一种方法, 则终端内`git clone git@github.com:acrazing/caijun-fe.git`;
如果是第二种方法, 则终端内`git clone git@github.com:<username>/caijun-fe.git`, `<username>`是你
的用户名. 这样在终端的当前目录下就产生了一个名为`caijun-fe`的文件夹, 所有的项目文件都在里面

## GIT操作

**终端`cd`到刚才克隆的`caijun-fe`目录**

1. 提交更改

```bash
# 添加文件到缓存
git add .
# 提交更改
git commit -m "comment content" # comment最好写一下本次提交修改的内容
# 推送到服务器, 这是与唯一与svn不同的地方, 只有这一步会产生冲突, 如果有, 需要先合并
git push
```

2. 拉服务器更新

```bash
git pull # 有冲突就合并冲突
```
