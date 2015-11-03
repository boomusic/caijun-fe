# 基本less库文档

## 约定

1. `base.less`文件中只添加变量定义和`mixin`
2. `common.less`文件中实现`base.less`中添加的`mixin`, 定义其它公共类
3. 这样做可以在其它页面中`@import "../lib/base"`而不产生冲突

## 颜色定义

| 名称 | 值 | 说明 |
| --- | --- | --- |
| black | #222 | 黑色, 默认字体颜色 |
| white | #fff | 白色, 默认背景颜色 |
| red | #e34c0b | 大红, 高亮状态颜色 |
| gray | #a0a0a0 | 灰色, 边框颜色 |
| bg_header | #383838 | 顶部条背景色 |
| bg_body | #ededed | 页面背景色 |
| miao | #fe912c | `秒`特效字颜色 |
| tao | #7e00ff | `套`特效字颜色 |
| te | red | `特`特效字颜色 |
| xian | #4fc1e9 | `限`特效字颜色 |
| shou | #ffce54 | `首`特效字颜色 |
| aaa | #aaa | 另一个边框颜色? |

## `mixin`列表

| 名称 | 描述 |
| --- | --- |
| .fz(@size) | 字体大小 |

## 公共类

| 名称 | 是否有mixin | 依赖 | 描述 |
| --- | --- | --- | --- |
| fz\-10 ~.fz\-20 | 是 | \- | 字体大小, 从10px到20px |
| col\-*xxx* | 是 | \- | 字体颜色, *xxx*包括颜色列表中所有 |
| bg\-*xxx* | 是 | \- | 背景颜色, *xxx* 包括... |
| bold | 是 | \- | 加粗字体 |
| ln\-15 | 是 | \- | 行高1.5em |
| bt\-10 | 是 | \- | padding-bottom: 10px |
| force\-hidden | 否 | \- | 强制`hidden` |
| clearfix | 否 | \- | 清除浮动 |
| vc-wrapper | 是 | \- | 内容垂直居中容器 |
| pull\-{left\|right} | 是 | \- | 向左/右浮动 |
| text\-{left\|center\|right} | 是 | \- | 文字居左/中/右 |
| text\-overflow | 是 | \- | 单行文字, 超出自动截取隐藏多余 |
| text\-{delete\|underline} | 是 | \- | 文字删除/下划线 |
| inline-\block | 是 | \- | box类型为`inline-block`, 垂直居中 |
| block | 是 | \- | box模型为`block` |
| with-padding | 是 | \- | `padding: 0 .25em` |
| img\-wrapper | 否 | \- | 图片容器, 自身`inline-block`, 内部`img`标签`width:100%;height:auto` |
| round | 是 | \- | `border-radius: 50%` |
| horizontal-scroll | 是 | \- | 水平滚动容器 |
| | | | |
| btn-add-cart.in-banner | 否 | btn\-img | 添加到购物车按钮(参考首页banner) |
| btn-add-cart.in-list | 否 | btn\-img | 添加到购物车按钮(参考首页食品列表) |
| | | | |
| btn\-block | 否 | btn | 块状按钮, 参考登录页 |
| btn\-red | 否 | btn | 大红按钮, 参考登录页 |
| | | | |
| icon\-del | 否 | i.icon | 倒三角形按钮, 参考首页筛选 |
| icon\-tri | 否 | i.icon | 三角形按钮, 参考首页筛选 |
| icon\-accept | 否 | i.icon | 未选中复选框, 参考注册页 |
| icon\-accept.red | 否 | i.icon | 选中复选框, 参考注册页 |
| icon\-success | 否 | i.icon | 成功按钮, 参考注册成功弹窗 |
| | | | |
| miao | 否 | i.icon-word | `秒`特效文字 |
| te | 否 | i.icon-word | `特`特效文字 |
| shou | 否 | i.icon-word | `首`特效文字 |
| xian | 否 | i.icon-word | `限`特效文字 |
| tao | 否 | i.icon-word | `套`特效文字 |
| form-group, input-group, input-group-addon | 否 | \- | 表单控件, DOM结构同bootstrap |
| user, password | 否 | input-group-addon | 表单元素icon |
| | | | |
| animated.xxx | 否 | \- | 动画模块, 参考animate.css, 动画按需要添加, 公共库只有pulse和fadeOut, fadeIn, zoomOutUp |
| | | | |
| text-indent-2 | 是 | \- | 首行缩进2em |