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
    var now = +new Date,
        $mStatus = $('#m-status').find('div'),
        $mFoods = $('#m-foods'),
        startTime = +$mStatus.data('start-time'),
        endTime = +$mStatus.data('end-time');
    if (startTime > now) {
        $mStatus.countDown(startTime, '距离活动开始：hh:mm:ss', 900, function () {
            location.reload()
        });
        $mFoods.find('.add-cart').hide();
    } else if (endTime > now) {
        $mStatus.countDown(endTime, '距离活动结束：hh:mm:ss', 900, function () {
            location.reload()
        });
        $mFoods.find('[data-remain="0"]').find('.add-cart').hide();
    } else {
        $mStatus.html('活动已结束').removeClass('bg-red col-white').addClass('bg-body');
        $mFoods.find('.add-cart').hide();
    }
});