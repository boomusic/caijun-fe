/**
 * @file ${FILE_NAME}. Created by PhpStorm.
 * @desc ${FILE_NAME}.
 *
 * @author yangjunbao
 * @since 15/10/31 下午7:05
 * @version 1.0.0
 */
(function ($) {
    /**
     * @private
     * @type {{}}
     * 存放注册的验证方式
     */
    var validators = {};
    /**
     * validate命名空间
     * 提供一些实用方法
     * @namespace {{}}
     */
    $.validation = $.validation || {};
    /**
     * 注册验证方法
     * @param {string} name 方法名称
     * @param {Function} validator 验证方法: function(value, params...), 无错误返回true, 有错误返回false或者错误替换array
     * @param {string} msg 默认错误消息
     * @param {boolean} [force] 是否强制注册
     */
    $.validation.register = function (name, validator, msg, force) {
        if (!validators.hasOwnProperty(name) || force) {
            validators[name] = {
                name: name,
                validator: validator,
                msg: msg
            }
        }
    };
    /**
     * 按注册名称获取验证方法信息, 不存在返回undefined
     * @param {string} name
     * @returns {{}|undefined}
     */
    $.validation.getByName = function (name) {
        return validators[name];
    };
    /**
     * 格式化错误信息
     * @param {string} msg
     * @param {[]|*} params
     * @returns {string}
     */
    $.validation.formatError = function (msg, params) {
        if (!Array.isArray(params)) {
            return msg;
        }
        return msg.replace(/\$\d+/g, function (name) {
            return params[name.substr(1)] || name;
        });
    };

    // 手机号
    $.validation.register('phone', function (value) {
        return /^1[34578]\d{9}$/.test(value);
    }, '手机号格式不正确, 请重新输入');
    // 长度验证
    $.validation.register('length', function (value, min, max) {
        return (!min || value.length >= min) && (!max || value.length <= max);
    }, '长度不符合要求');
    // 模式匹配
    $.validation.register('pattern', function (value, pattern, options) {
        return new RegExp(pattern, options).text(value);
    }, '不符合规则');

    /**
     *
     */
    $.fn.validate = function () {
        var attr,
            validators,
            validator,
            temp,
            name,
            params,
            msg,
            id,
            $this,
            value,
            error,
            errors = {};

        function each(index) {
            $this = $(this);
            id = $this.attr('name') || $this.attr('id') || index;
            value = $this.val();
            attr = $this.attr('data-validate');
            validators = attr.split(';');
            validators.forEach(function (validateStr) {
                temp = validateStr.split(':');
                name = temp[0];
                params = temp[1] || '';
                params = params.split(',');
                params.unshift(value);
                msg = temp[2] || '';
                validator = $.validation.getByName(name);
                if (validator) {
                    error = validator.validator.apply($this, params);
                    if (error !== true) {
                        error = $.validation.formatError(msg || validator.msg, error);
                        if (!errors[id]) {
                            errors[id] = [];
                        }
                        errors[id].push(error);
                    }
                }
            });
        }

        this.filter('[data-validate]').each(each);
        this.find('[data-validate]').each(each);
        return $.isEmptyObject(errors) || errors;
    };
})(Zepto);