# 基本js库文档

## 约定

1. 所有自定义的公共库方法暴露在`window._`下
2. `Zepto`占用`window.$`, 对`Zepto`的扩展放到`window.$`下
3. 类型为`Zepto`的变量命名以`$`开头

## 公共库 `window._`

### 全局变量

| name | type | desc |
| --- | --- | --- |
| $body | Zepto | `body`元素 |
| $header | Zepto | `#header`元素 |
| $navbar | Zepto | `#navbar`元素 |
| | | |
| touchStart | string | 触摸开始事件 |
| touchMove | string | 触摸移动事件 |
| touchEnd | string | 触摸结束事件 |
| cssAnimateEnd | string | css动画结束事件 |

### 方法列表

#### `window._`

- *static* `go` *`void`*

链接跳转

| name | type | desc |
| --- | --- | --- |
| \*url | string\|int | 如果类型为`int`, 调用`history.go(url)`, 否则调用`location.href=url`, 默认值为`-1` |

**参数表中加\*表示此字段可空**

- *static* `search` *`void`*

搜索接口(需要后端提供搜索接口), 入参待定

- *static* `addCart` *`void`*

添加食品到购物车(需要后端提供接口), 入参待定

- *constructor* `Overlay` *`Overlay`*

构建一个浮层, 居窗口正中

| name | type | desc |
| --- | --- | --- |
| option | Object | 选项 |

**option**

| name | type | desc |
| --- | --- | --- |
| content | string|Zepto | 浮屠内容 |
| \*hasMask | boolean | 是否阻止窗口滚动(这是iOS的bug), 默认为`true` |
| \*destroyOnMaskClicked | boolean | 点击背景区是否销毁浮屠, 默认`false` |
| \*hide | boolean | 构建后是否隐藏, 默认`false` |
| \*className | string | 浮屠类名, 如果提供, 则浮屠根DOM会添加相应类名 |

- *static* `alert` *`Overlay`*

构建警告浮屠, 单个点击按钮, 点击时销毁

- *static* `confirm` *`Overlay`*

构建确认浮屠, 两个点击按钮, 点击时均销毁

- *static* `toast` *`Overlay`*

构建Toast浮屠, 点击内容区时销毁

#### `_.Overlay`

- `show` *`Overlay`*

显示浮屠

- `hide` *`Overlay`*

隐藏浮屠

- `destroy` *`Overlay`*

销毁浮屠

- `on` *`Overlay`*

绑定事件

- `off` *`Overlay`*

取消绑定事件

- `content` *`Overlay`*

获取或设置浮屠内容

#### `_.location`

- *static* `search` *`string|Array|undefined`*

返回当前`href`中搜索字段

## `Zepto`扩展

- *static* `ajax` *`XMLHttpRequest`*

重构`ajax`方法, 如果返回错误码为`401`, 则跳转到登录页

- `cssAnimateOnce` *`Zepto`*

执行单次css动画

- `tipsBox` *`Zepto`*

弹起小浮屠, 参考首页点击购物车效果

- `forceShow` *`Zepto`*

强制显示, 通过取消类`force-hidden`

- `forceHide` *`Zepto`*

强制隐藏, 通过添加类`force-hidden`

- `validate` *`boolean|map[string][]string`*

表单验证, 使用方法

1. 在需要添加验证的输入控件上添加`data-validate`标签, 内容格式为
`validator1:param1,param2:msg;validator2::msg```
2. 在输入控件或者其父类元素上执行本函数, 如果符合要求, 则返回`true`, 否则 
返回`map[string][]string`, 其`key`为输入控件的`name`或`id`或`index`

例子:

DOM
```html
<form>
    <input type="text" name="username" data-validate="length:6:用户名过短"/>
    <input type="number" name="phone" data-validate="phone"/>
</form>
```
Javascript
```js
var $form = $('form');
var error = $form.validate();
if(error === true) {
    alert('no problem');
} else {
    alert(error);
}
```

现在支持的`validator`有`phone`(手机号), `length(min, max)`(长度限制), `pattern(options)`(模式匹配)

可以通过调用`$.validation.register(name, validator, msg, force)方法来注册新的验证函数

- `unslider` *`Zepto`*

图片轮播组件, 使用方法参考<https://github.com/acrazing/zepto.unslider>

- `cookie` *`string|null`*

`cookie`操作组件, 使用方法:

```js
// 获取cookie
$.cookie(cookieName)

// 设置cookie
$.cookie(cookieName, value, options)
```

- `data`, `animate`, `touch`

`zepto`的标准组件, 使用方法请看官方文档, 可以按需引入