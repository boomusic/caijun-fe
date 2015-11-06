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
    var years = ['2015', '2016', '2017', '2018'],
        months = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        column,
        i,
        config = {};
    config.title = '日期选择插件';
    config.columns = [];
    column = {
        id: 'year',
        items: []
    };
    for (i in years) {
        if (years.hasOwnProperty(i)) {
            column.items.push({
                value: +years[i],
                label: years[i],
                disabled: i === 3
            })
        }
    }
    config.columns.push(column);
    column = {
        id: 'month',
        items: []
    };
    for (i in months)
        if (months.hasOwnProperty(i)) {
            column.items.push({
                value: +i + 1,
                label: months[i] + '月',
                disabled: i > 10 || i < 5
            })
        }
    config.columns.push(column);
    column = {
        id: 'day',
        items: []
    };
    for (i = 1; i < 32; i++) {
        column.items.push({
            value: i,
            label: i,
            disabled: i < 10
        })
    }
    config.columns.push(column);
    config.onChange = function() {
        console.log(this, arguments);
    };
    config.cancelCallback = function() {
        console.log('cancel', arguments);
    };
    config.confirmCallback = function() {
        console.log('confirm', arguments);
    };
    config.hide = false;
    new _.Scroller(config);
});