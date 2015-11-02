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
    var $mEmpty = $('#m-empty'),
        $mFoods = $('#m-foods'),
        $totalPrice = $mFoods.find('.total-price');

    function init() {
        if ($mFoods.find('li').length === 0) {
            $mFoods.remove();
            $mEmpty.forceShow();
            return false;
        }
        return true;
    }
    if(!init()) {
        return;
    }

    function changePrice(delta) {
        $totalPrice.html(+$totalPrice.html() + delta);
        if ($mFoods.find('.input-checked:not([value="on"])').length === 0) {
            $mFoods.find('.check-all>i').addClass('checked');
        } else {
            $mFoods.find('.check-all>i').removeClass('checked');
        }
    }

    $mFoods.on(_.touchEnd, '.checkbox', function () {
        var $this = $(this),
            $food = $this.parent(),
            $checkbox = $this.find('i'),
            price,
            checked = $checkbox.hasClass('checked');
        checked ? $checkbox.removeClass('checked') : $checkbox.addClass('checked');
        $food.find('.input-checked').val(checked ? 'off' : 'on');
        price = $food.find('.input-unit-price').val() * $food.find('.input-num').val();
        changePrice(checked ? -price : price);
    }).on(_.touchEnd, '.icon-subtract', function () {
        var $this = $(this),
            $food = $this.closest('li'),
            $foodNum = $food.find('.food-num-val'),
            unitPrice = -$food.find('.input-unit-price').val(),
            foodNum = +$foodNum.html() - 1,
            checked = $food.find('.input-checked').val() === 'on';
        if (foodNum <= 0) {
            $food.find('.delete>.icon').trigger(_.touchEnd.split(' ')[0]);
            return;
        }
        $food.find('.input-num').val(foodNum);
        $foodNum.html(foodNum);
        checked && changePrice(unitPrice);
    }).on(_.touchEnd, '.icon-add', function () {
        var $this = $(this),
            $food = $this.closest('li'),
            $foodNum = $food.find('.food-num-val'),
            unitPrice = +$food.find('.input-unit-price').val(),
            foodNum = +$foodNum.html() + 1,
            checked = $food.find('.input-checked').val() === 'on';
        $food.find('.input-num').val(foodNum);
        $foodNum.html(foodNum);
        checked && changePrice(unitPrice);
    }).on(_.touchEnd, '.delete', function () {
        var $this = $(this),
            $food = $this.closest('li'),
            foodId = $food.data('id'),
            $foodNum = $food.find('.food-num-val'),
            unitPrice = -$food.find('.input-unit-price').val(),
            foodNum = +$foodNum.html(),
            checked = $food.find('.input-checked').val() === 'on';
        _.confirm('确定删除吗?', function () {
            $.post('', {
                foodId: foodId
            }, function (data) {
                if (1 || data) {
                    $food.remove();
                    checked && changePrice(unitPrice * foodNum);
                    init();
                }
            })
        })
    }).on(_.touchEnd, '.check-all', function () {
        var $this = $(this),
            $i = $this.find('i'),
            checked = $i.hasClass('checked');
        if (checked) {
            $mFoods.find('.checkbox>i.checked').trigger('touchend');
        } else {
            $mFoods.find('.checkbox>i:not(.checked)').trigger('touchend');
        }
    });
});