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
    $('.gender>.content').on('click', '.radio', function() {
        $(this).find('i').removeClass('gray').addClass('checked');
        $(this).siblings().find('i').removeClass('checked').addClass('gray');
    });
    $('.age').on('click', function() {
        // TODO select year
    })
});