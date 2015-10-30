/**
 * @file ${FILE_NAME}. Created by PhpStorm.
 * @desc ${FILE_NAME}.
 *
 * @author yangjunbao
 * @since 15/10/29 上午11:05
 * @version 1.0.0
 */

/**
 *   Unslider by @idiot and @damirfoy
 *   Contributors:
 *   - @ShamoX
 *
 */
(function ($) {
    var Unslider = function () {
        //  Object clone
        var _ = this;

        //  Set some options
        _.o = {
            speed: 500,     // animation speed, false for no transition (integer or boolean)
            delay: 3000,    // delay between slides, false for no autoplay (integer or boolean)
            init: 0,        // init delay, false for no delay (integer or boolean)
            loop: true,       // infinitely looping (boolean)
            dots: false,        // display dots pagination (boolean)
            arrows: false,      // display prev/next arrows (boolean)
            prev: '&larr;', // text or html inside prev button (string)
            next: '&rarr;', // same as for prev option
            fluid: false,       // is it a percentage width? (boolean)
            starting: false,    // invoke before animation (function with argument)
            complete: false,    // invoke after animation (function with argument)
            items: 'ul',   // slides container selector
            item: 'li',    // slidable items selector
            easing: 'swing',// easing function to use for animation
            autoplay: true,  // enable autoplay on initialisation
            swipe: true // swipe gesture
        };

        _.init = function (el, o) {
            //  Check whether we're passing any options in to Unslider
            _.o = $.extend(_.o, o);
            o = _.o;

            _.el = el;
            _.ul = el.children(_.o.items);
            _.max = [el.width() || 0, el.height() || 0];
            _.li = _.ul.children(_.o.item).each(function () {
                var me = $(this),
                    width = me.width(),
                    height = me.height();

                //  Set the max values
                if (width > _.max[0]) _.max[0] = width;
                if (height > _.max[1]) _.max[1] = height;
            });


            //  Cached vars
            var ul = _.ul,
                li = _.li,
                len = li.length;

            //  Current indeed
            _.i = 0;

            //  Set the main element
            el.css({width: _.max[0], height: li.first().height(), overflow: 'hidden'});

            //  Set the relative widths
            ul.css({position: 'relative', left: 0, width: (len * 100) + '%'});
            if (o.fluid) {
                li.css({'float': 'left', width: (100 / len) + '%'});
            } else {
                li.css({'float': 'left', width: (_.max[0]) + 'px'});
            }

            //  Autoslide
            o.autoplay && setTimeout(function () {
                if (o.delay) {
                    _.play();
                }
            }, o.init || 0);

            //  Dot pagination
            o.dots && nav('dot');

            //  Arrows support
            o.arrows && nav('arrow');

            //  Patch for fluid-width sliders. Screw those guys.
            o.fluid && $(window).resize(function () {
                _.r && clearTimeout(_.r);

                _.r = setTimeout(function () {
                    var styl = {height: li.eq(_.i).height()},
                        width = el.width();

                    ul.css(styl);
                    styl['width'] = Math.min(Math.round((width / el.parent().width()) * 100), 100) + '%';
                    el.css(styl);
                    li.css({width: width + 'px'});
                }, 50);
            }).resize();

            function touchPos(e) {
                var owner = e.touches ? e.touches[0] : (e.targetTouches ? e.targetTouches[0] : e);
                return {
                    x: owner.pageX,
                    y: owner.pageY
                };
            }

            function smoothScroll(difference, duration) {
                var perTick = difference / duration * 10;
                Math.abs(perTick) > 8 && setTimeout(function () {
                    if (!isNaN(parseInt(perTick, 10))) {
                        window.scrollBy(0, perTick);
                        smoothScroll(difference - perTick, duration);
                    }
                }, 10);
            }

            if (o.swipe) {
                el.on('touchmove', function (e) {
                    e.preventDefault();
                }).on('swipeLeft', function () {
                    _.next();
                }).on('swipeRight', function () {
                    _.prev();
                }).on('swipeUp', function () {
                    setTimeout(function () {
                        smoothScroll(300, 50);
                    }, 0);
                }).on('swipeDown', function () {
                    setTimeout(function () {
                        smoothScroll(-300, 50);
                    }, 0);
                });
            }
            return _;
        };

        //  Move Unslider to a slide index
        _.to = function (index, callback) {
            if (_.t) {
                _.stop();
                _.play();
            }
            var o = _.o,
                el = _.el,
                ul = _.ul,
                li = _.li,
                current = _.i,
                target = li.eq(index);

            $.isFunction(o.starting) && !callback && o.starting(el, li.eq(current));

            //  To slide or not to slide
            if ((!target.length || index < 0) && o.loop === false) return;

            //  Check if it's out of bounds
            if (!target.length) index = 0;
            if (index < 0) index = li.length - 1;
            target = li.eq(index);

            var speed = callback ? 5 : o.speed | 0,
                easing = o.easing,
                obj = {height: target.height()},
                running = false;

            if (!running) {
                running = true;
                //  Handle those pesky dots
                el.find('.dot').eq(index).addClass('active').siblings().removeClass('active');

                el.animate(obj, speed, easing) && ul.animate($.extend({left: '-' + index + '00%'}, obj), speed, easing, function (data) {
                    _.i = index;
                    running = false;
                    $.isFunction(o.complete) && !callback && o.complete(el, target);
                });
            }
        };

        //  Autoplay functionality
        _.play = function () {
            _.t = setInterval(function () {
                _.to(_.i + 1);
            }, _.o.delay | 0); // force to number
        };

        //  Stop autoplay
        _.stop = function () {
            _.t = clearInterval(_.t);
            return _;
        };

        //  Move to previous/next slide
        _.next = function () {
            return _.to(_.i + 1);
        };

        _.prev = function () {
            return _.to(_.i - 1);
        };

        //  Create dots and arrows
        function nav(name, html) {
            if (name == 'dot') {
                html = '<ol class="dots">';
                $.each(_.li, function (index) {
                    html += '<li class="' + (index === _.i ? name + ' active' : name) + '">' + ++index + '</li>';
                });
                html += '</ol>';
            } else {
                html = '<div class="';
                html = html + name + 's">' + html + name + ' prev">' + _.o.prev + '</div>' + html + name + ' next">' + _.o.next + '</div></div>';
            }

            _.el.addClass('has-' + name + 's').append(html).find('.' + name).click(function () {
                var me = $(this);
                me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prev') ? _.prev() : _.next();
            });
        }
    };

    //  Create a jQuery plugin
    $.fn.unslider = function (o) {
        var len = this.length;

        //  Enable multiple-slider support
        return this.each(function (index) {
            //  Cache a copy of $(this), so it
            var me = $(this),
                key = 'unslider' + (len > 1 ? '-' + ++index : ''),
                instance = (new Unslider).init(me, o);

            //  Invoke an Unslider instance
            me.data(key, instance).data('key', key);
        });
    };

    Unslider.version = "1.0.0";
})(Zepto);