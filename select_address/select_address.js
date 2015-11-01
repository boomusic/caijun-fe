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
    var $mAddresses = $('#m-addresses'),
        $mNewAddress = $('#m-new-address');
    $mAddresses.on(_.touchEnd, '.icon-radio', function () {
        $mAddresses.find('.icon-radio.checked').removeClass('checked');
        $(this).addClass('checked')
    }).on('click', '.modify-address', function () {
        _.alert('没有UE图');
    }).on('click', '.delete-address', function () {
        var $this = $(this);
        _.alert('删除成功', function () {
            $this.closest('.address').remove();
        })
    });
    $mNewAddress.on('click', '.btn', function () {
        _.alert('没有UE图');
    })
});