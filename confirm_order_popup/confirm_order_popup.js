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
        year = startYear,
        month = startMonth,
        day = startDay,
        max,
        disabledClock = [],
        dateLabels = ['今天', '明天', '后天'],
        config = {
            columns: [{
                id: 'date',
                items: []
            }, {
                id: 'time',
                items: []
            }],
            position: 'middle',
            confirmText: '完成',
            hide: false,
            showFocusBorder: true,
            onChange: function (id, value, column, index) {
                switch (column) {
                    case 0: // change date
                        if (index === 0) {
                            this.disable(1, disabledClock)
                        } else {
                            this.enable(1, disabledClock)
                        }
                        break;
                    case 1: // change time
                        if(disabledClock.indexOf(index) === -1) {
                            this.enable(0, 0)
                        } else {
                            this.disable(0, 0)
                        }
                        break;
                }
            },
            confirmCallback: function (values) {
                values.forEach(function(d) {
                    d.forEach(function(v, i) {
                        d[i] = _.lpad(v, 2, '0')
                    })
                });
                $('#m-result').find('.result').html(values[0].join('-') + ' ' + values[1].join(':'));
            }
        },
        i;

    function maxDay(year, month) {
        var bigs = [1, 3, 5, 7, 8, 10, 12];
        return month == 2 ? ((year % 100 && year % 400) || ((!year % 100) && year % 4) ? 29 : 28)
            : (bigs.indexOf(month) === -1 ? 30 : 31);
    }

    for (i = 0; i < 30; i++) {
        max = maxDay(year, month);
        if (day + 1 > max) {
            year = month === 12 ? year + 1 : year;
            month = month === 12 ? 1 : month + 1;
            day = 1
        } else {
            day += 1;
        }

        config.columns[0].items.push({
            value: [year, month, day],
            label: dateLabels[i] || (month + '月' + day + '日'),
            disabled: false
        })
    }

    for (i = onClock; i <= offClock; i++) {
        startHour > i && disabledClock.push(i - onClock);
        config.columns[1].items.push({
            value: [i, 0, 0],
            label: _.lpad(i, 2, '0') + ':00',
            disabled: startHour > i
        })
    }
    var scroller = new _.Scroller(config);
    $('.show-overlay').on('click', function () {
        scroller._content.show();
    })
});