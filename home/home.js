/**
 * @file ${FILE_NAME}. Created by PhpStorm.
 * @desc ${FILE_NAME}.
 *
 * @author yangjunbao
 * @since 15/10/29 上午10:31
 * @version 1.0.0
 */
$(function () {
    var $foodFilterOverlay = $('#food-filter-overlay');
    $foodFilterOverlay.tags = $foodFilterOverlay.find('.filter>div');
    $foodFilterOverlay.lists = $foodFilterOverlay.find('.list-wrapper>div');
    $foodFilterOverlay.init = function (index) {
        this.removeClass('hidden');
        this.tags.eq(index).trigger('touchend', [index]);
    };
    $foodFilterOverlay.tags.on('touchend', function (e, index) {
        var $this = $(this);
        index = index || $this.index();
        $this.find('i').removeClass('icon-del').addClass('icon-tri');
        $this.siblings().find('i').removeClass('icon-tri').addClass('icon-del');
        $foodFilterOverlay.lists.eq(index).show().siblings().hide();
    });
    $foodFilterOverlay.on('touchend', function(e) {
        if(e.target.className.indexOf('overlay-container') > -1) {
            $foodFilterOverlay.addClass('hidden');
        }
    });
    $('#m-week').find('.filter>div').on('click', function () {
        $foodFilterOverlay.init($(this).index());
    });
});