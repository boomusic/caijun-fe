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
    var date = new Date(),
        startYear = date.getFullYear(),
        startMonth = date.getMonth() + 1,
        startDay = date.getDate(),
        startHour = date.getHours(),
        onClock = 7,
        offClock = 22,
        config = {
            columns: [{
                id: 'year',
                items: []
            }, {
                id: 'month',
                items: []
            }, {
                id: 'day',
                items: []
            }, {
                id: 'clock',
                items: []
            }],
            position: 'middle',
            confirmText: '完成',
            hide: false,
            showFocusBorder: true,
            onChange: function (id, value, column, index) {
                switch (column) {
                    case 0: // change year
                        break;
                    case 1: // change month
                        break;
                    case 2: // change date
                        break;
                    case 3: // change clock
                        break;
                }
            },
            confirmCallback: function (values) {
                $('#m-result').find('.result').html(values.join('-'));
            }
        },
        i;

    function maxDay(year, month) {
        var bigs = [1, 3, 5, 7, 8, 10, 12];
        return month == 2 ? ((year % 100 && year % 400) || ((!year % 100) && year % 4) ? 29 : 28)
            : (bigs.indexOf(month) === -1 ? 30 : 31);
    }

    for (i = startYear - 5; i < startYear + 5; i++) {
        config.columns[0].items.push({
            value: i,
            label: i,
            disabled: false//i < startYear
        })
    }
    for (i = 1; i <= 12; i++) {
        config.columns[1].items.push({
            value: i,
            label: i,
            disabled: false//i < startMonth
        })
    }
    for (i = 1; i <= 31; i++) {
        config.columns[2].items.push({
            value: i,
            label: i,
            disabled: false//i < startDay || i > maxDay(startYear, startMonth)
        })
    }
    for (i = onClock; i <= offClock; i++) {
        config.columns[3].items.push({
            value: i + ':00',
            label: i + ':00',
            disabled: false//i < startHour
        })
    }
    var scroller = new _.Scroller(config);
    $('.show-overlay').on('click', function () {
        scroller._content.show();
    })
});