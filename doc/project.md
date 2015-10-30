# 项目管理文档

## 目录结构

```bash
-caijun-fe
 |
 +--doc # 文档目录
 |
 +--lib # 基础库目录
 |
 +--template # 页面模板目录
 |
 +--home # 首页页面目录
 |
 +--.... # 以及若干页面目录
```

## 新建页面

```bash
cp -r template/ xxx
cd xxx
mv template.html xxx.html
```

## 约定

1. 如果页面所在文件夹为`xxx`, 那么页面文件名就为`xxx.html`