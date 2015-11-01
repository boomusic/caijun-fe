/**
 * @file ${FILE_NAME}. Created by PhpStorm.
 * @desc ${FILE_NAME}.
 *
 * @author yangjunbao
 * @since 15/10/29 上午10:31
 * @version 1.0.0
 */
// 页面js文件
$(function () {
    var _module = 'login',
        $mTab = $('#m-tab'),
        $mLogin = $('#m-login'),
        $mRegister = $('#m-register');

    function changeModule() {
        _module = _module === 'login' ? 'register' : 'login';
        _.$header.find('.' + _module).removeClass('force-hidden').siblings().addClass('force-hidden');
        $mTab.find('.' + _module).addClass('col-red').siblings().removeClass('col-red');
        if (_module === 'login') {
            $mLogin.removeClass('force-hidden');
            $mRegister.addClass('force-hidden');
        } else {
            $mLogin.addClass('force-hidden');
            $mRegister.removeClass('force-hidden');
        }
    }

    $mTab.on('click', 'a', changeModule);

    function popupObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return [i, obj[i]];
            }
        }
    }

    // login
    $mLogin.on('click', '.btn-submit', function () {
        var error = $mLogin.validate();
        if (error !== true) {
            _.alert({
                content: popupObject(error)[1][0],
                callback: function () {
                    $mRegister.find('[name=' + popupObject(error)[0] + ']').focus();
                }
            });
            return;
        }
        $.post('', $mLogin.find('form').serialize(), function () {
            _.alert('登陆失败');
            _.alert('密码输入有错误, 请重新输入', function () {
                _.go(_.location.search('redirect', '../home/home.html'));
            });
        });
    });

    // register
    var captchaStatus = 0;
    $mRegister.on(_.touchEnd, '.icon-accept', function () {
        $(this).hasClass('gray')
            ? $(this).removeClass('gray').addClass('red')
            : $(this).addClass('gray').removeClass('red');
    }).on('click', '#form-group-register-captcha>a', function () {
        var $this = $(this);
        if (captchaStatus === 0) {
            $.get('', function (captcha) {
                if (!captcha) {
                    _.alert('获取验证码失败');
                } else {
                    var max = +new Date + 3e3;
                    captchaStatus = 1;
                    $this.countDown(max, 'ss\\s后重新获取', 900, function () {
                        $this.html('重新获取验证码');
                        captchaStatus = 0;
                    })
                }
            })
        }
    }).on('click', '.btn-submit', function () {
        var error = $mRegister.validate();
        if (error !== true) {
            _.alert({
                content: popupObject(error)[1][0],
                callback: function () {
                    $mRegister.find('[name=' + popupObject(error)[0] + ']').focus();
                }
            });
            return;
        }
        if (!$mRegister.find('.icon-accept').hasClass('red')) {
            _.alert({content: '请阅读用户协议'});
            return;
        }
        $.post('', $mRegister.find('form').serialize(), function () {
            _.alert('手机号码已注册, 请登录或找回密码');
            _.alert('注册失败');
            _.toast('恭喜您, 注册成功', 3e3, 'icon-success');
        });
    });
});