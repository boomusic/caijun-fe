/**
 * @file ${FILE_NAME}. Created by PhpStorm.
 * @desc ${FILE_NAME}.
 *
 * @author yangjunbao
 * @since 15/10/29 上午10:30
 * @version 1.0.0
 */

(function ($) {
    /**
     * 重构$.ajax, 如果需要验证, 强制跳转
     */
    var ajax = $.ajax;
    $.ajax = function (settings) {
        var fn = settings.error;
        settings.error = function (xhr, errorType, error) {
            if (xhr.status === 401) {
                _.go('/login');
            } else {
                fn.call(settings.context, xhr, errorType, error);
            }
        };
        ajax.call($, settings);
    };

    /**
     * @type {Object}
     *
     * the namespace for global library
     */
    window._ = window._ || {};

    /**
     * body元素, 事件委托
     * @type {Zepto}
     */
    _.$body = $(document.body);

    /**
     * 链接跳转
     *
     * @param {string|int} [url]
     *
     * redirect to the url
     *      if url is int, use history.go(url)
     *      else use location.href=url
     *
     *      the default value is -1, (go back)
     */
    _.go = function (url) {
        if (url === undefined) {
            url = -1;
        }
        if (typeof url === 'number') {
            history.go(url);
        } else {
            location.href = url;
        }
    };

    /**
     * 搜索接口
     *
     * @param {string} word
     *
     * TODO: finish this by RD give relative api
     */
    _.search = function (word) {
        location.href = '/search?wd=' + word;
    };

    /**
     * 弹层
     *      content水平垂直居中
     *
     * TODO ios弹层调起输入法BUG
     * TODO Firefox|WindowsPhone|Opera适配
     *
     * popup overlay constructor
     * use: overlay = new _.Overlay({
     *      content: 'some content'
     *  });
     *
     *  overlay.show()
     *      .hide()
     *      .on()
     *      .off()
     *      .destroy()
     */
    _.Overlay = (function () {
        var BEFORE_FADE_IN = 0,
            ONSHOW = 1,
            AFTER_FADE_OUT = 2;

        /**
         * 浮层，居中显示
         * @constructor
         * @alias module:overlay
         * @param {Object} [option]
         * @param {string|HTMLElement|Zepto} [option.content] 内容
         * @param {boolean} [option.destroyOnMaskClicked] 点击遮罩层时是否销毁实例
         */
        var Overlay = function (option) {
            option = $.extend({
                content: '',
                hasMask: true,
                destroyOnMaskClicked: false
            }, option);
            var that = this;
            this._overlay = $('<div class="overlay-content"></div>');
            var contentContainer = $('<div class="overlay-content-container"></div>');
            this._container = $('<div class="overlay-container beforeFadeIn"></div>');
            //动画结束事件，hide方法在动画结束时才真正hide元素
            this._container.on('webkitTransitionEnd.overlay', function () {
                if (that._status === AFTER_FADE_OUT) {
                    that._status = BEFORE_FADE_IN;
                    that._container.hide().removeClass('afterFadeOut').addClass('beforeFadeIn');
                }
            });
            if (option.hasMask) {
                //阻止页面滚动
                this._container.on('touchmove', function (e) {
                    e.preventDefault();
                });
                if (option.destroyOnMaskClicked) {
                    //点击遮罩层destroy实例
                    this._container.on('touchend', _.bind(function (e) {
                        if ($(e.target).is('.overlay-container')) {
                            this.destroy();
                        }
                    }, this));
                }
            }
            else {
                this._container.addClass('unmasked');
            }
            this.content(option.content);
            this._container.append(contentContainer.append(this._overlay)).appendTo(document.body);
            this._status = BEFORE_FADE_IN; //标记动画状态
            this.show();
        };
        Overlay.prototype = {
            /**
             * 显示浮层
             * @return {Overlay} this
             */
            show: function () {
                this._status = ONSHOW;
                this._container.show().removeClass('beforeFadeIn');
                return this;
            },
            /**
             * 隐藏浮层
             * @return {Overlay} this
             */
            hide: function () {
                if (this._status === ONSHOW) {
                    this._status = AFTER_FADE_OUT;
                    this._container.addClass('afterFadeOut');
                } else {
                    this._status = BEFORE_FADE_IN;
                }
                return this;
            },
            /**
             * 销毁
             */
            destroy: function () {
                this.off();
                if (this._status !== ONSHOW) {
                    this._container.remove();
                } else {
                    this._container.off('webkitTransitionEnd.overlay').on('webkitTransitionEnd', _.bind(function () {
                        this._container.remove();
                    }, this));
                    this.hide();
                }
            },
            /**
             * 绑定事件，所有事件将会委托在浮层的容器上
             * 参数同{@link http://zeptojs.com/#on|zepto.fn.on}
             * @return {Overlay} this
             */
            on: function () {
                $.fn.on.apply(this._overlay, arguments);
                return this;
            },
            /**
             * 取消事件绑定
             * 参数同{@link http://zeptojs.com/#off|zepto.fn.off}
             * @return {Overlay} this
             */
            off: function () {
                $.fn.off.apply(this._overlay, arguments);
                return this;
            },
            /**
             * get/set浮层内容
             * @param {string|HTMLElement|Zepto} [content] 设置的内容，该参数为空时为get
             * @return {Object} 参数为空时返回内容$dom，否则返回当前实例
             */
            content: function (content) {
                if (content === null) {
                    return this._overlay.children();
                } else {
                    this._overlay.html(content);
                    return this;
                }
            }
        };
        return Overlay;
    })();

    /**
     * 添加购物车
     */
    _.$navbar = $('#navbar');
    _.addCart = function (foodId, callback) {
        $.post('?foodId=' + foodId, function (data) {
            if (1 || data.status === 0) { // success
                var $dom = _.$navbar.find('.cart-num');
                $dom.html(+$dom.html() + 1).cssAnimateOnce('pulse fast');
                callback && callback();
            }
        });
    };

    _.touchEnd = 'touchend MSPointerUp pointerup';
    /**
     * CSS动画模块
     */
    _.cssAnimateEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $.fn.cssAnimateOnce = function (type, callback) {
        this.each(function () {
            $(this).addClass('animated ' + type).one(_.cssAnimateEnd, function () {
                $(this).removeClass('animated ' + type);
                callback && callback.call(this);
            });
        });
        return this;
    };

    /**
     * tips
     */
    $.fn.tipsBox = function (content, type) {
        type = type || 'zoomOutUp';
        this.each(function () {
            var $this = $(this),
                pos = $this.offset(),
                width = $this.width();
            $(content).appendTo(_.$body).css({
                position: 'absolute',
                top: pos.top - 15,
                left: pos.left + width / 2
            }).cssAnimateOnce(type, function () {
                $(this).remove();
            });
        });
        return this;
    };
})(Zepto);

$(document).ready(function () {
    // banner module
    // TODO: add swipe support
    $.fn.unslider && $('.banner.banner-default').each(function () {
        var $this = $(this);
        $this.unslider({
            speed: 500,
            delay: 3000,
            dots: !$this.hasClass('no-dot'),
            swipe: !$this.hasClass('no-swipe'),
            fluid: false
        });
    });

    // header
    var $header = $('#header');
    // search module
    var $searchInputWrapper = $header.find('.search-input'),
        $searchInput = $searchInputWrapper.find('input'),
        $logo = $header.find('.logo');
    $header.find('.search').on('click', function () {
        if ($searchInputWrapper.hasClass('hidden')) {
            $searchInputWrapper.removeClass('hidden');
            $logo.hide();
            $searchInput.focus();
        } else {
            $searchInputWrapper.addClass('hidden');
            $logo.show();
        }
    });
    $searchInput.on('keyup', function (e) {
        if (e.keyCode === 13) {
            _.search(this.value);
        }
    });
    // message, TODO
    $header.find('.message').on(_.touchEnd, function () {

    });

    // add cart
    _.$body.on(_.touchEnd, '.btn-add-cart', function () {
        var $this = $(this);
        _.addCart($this.data('id'), function () {
            $this.tipsBox('<span class="tipsNum col-red fz-14 bold">+1</span>');
        });
    });
});