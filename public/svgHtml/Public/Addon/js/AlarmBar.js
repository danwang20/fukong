//初始化
$(function () {
    //设置样式
    var h = $(document).height();
    var buttonSize = 18;
    var size = (h-8)/8.7;
    var buttomRow = (h-8-buttonSize*4)/6
    $("table").css("font-size",size + "px");
    $("table").css("white-space","nowrap");
    $("button").css("font-size",buttonSize + "px");
    $(".buttomRow").css("height",buttomRow + "px");
    //创建表格
    $('#AlarmBar').bootstrapTable({
        url: '',                              //请求后台的URL（*）
        method: 'get',                        //请求方式（*）
        striped: false,                       //是否显示行间隔色
        cache: false,                         //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                    //是否显示分页（*）
        sortable: false,                      //是否启用排序
        sortOrder: "asc",                     //排序方式
        sidePagination: "client",             //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                        //初始化加载第一页，默认第一页
        pageSize: 10,                         //每页的记录行数（*）
        pageList: [10, 25, 50, 100],          //可供选择的每页的行数（*）
        search: false,                        //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showHeader: false,                    //是否显示列头
        showColumns: false,                   //是否显示所有的列
        showRefresh: false,                   //是否显示刷新按钮
        showPaginationSwitch: false,          //是否显示数据条数选择框
        minimumCountColumns: 2,               //最少允许的列数
        clickToSelect: true,                  //是否启用点击选中行
        height: h-8,                         //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "aid",                      //每一行的唯一标识，一般为主键列
        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                      //是否显示详细视图
        detailView: false,                    //是否显示父子表
        showExport: false,                    //是否显示导出
        exportDataType: "selected",           //basic', 'all', 'selected'.
        rowStyle: function (row, index) {
            return {classes: isAlarm(row, index)};
        },
        columns: [{
            field: 'crt',
            title: '报警时间',

            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }, {
            field: 'aid',
            title: '报警id',
            visible: false,
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'lv',
            title: '报警级别',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'ad',
            title: '区域',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'sc',
            title: '子系统',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'dn',
            title: '设备类型',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'lb',
            title: '设备名',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'ms',
            title: '报警描述',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'icf',
            title: '确认状态',
            formatter:
                function (value, row, index) {
                    return isConfirm(value, row, index);
                }
        }, {
            field: 'ic',
            title: '报警状态',
            formatter:
                function (value, row, index) {
                    return isClear(value, row, index);
                }
        }, {
            field: 'is',
            title: '抑制状态',
            visible: false,
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'cft',
            title: '确认时间',
            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }, {
            field: 'cfu',
            title: '操作员',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'clt',
            title: '消失时间',
            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }],
    });
    //设置定时器
    setInterval(LoadAlarmBar,3000);
});
//循环加载数据
function LoadAlarmBar(){
    console.log("调用报警");
    var alarmInfo = GetAlarmBarData();
    console.log("报警回调");
    if(alarmInfo.length > 0){
        $('#AlarmBar').bootstrapTable('load', alarmInfo.pts);
    }
}

//确认
function isConfirm(value, row, index) {
    if (value == '1') {
        return '已确认';
    }else{
        return '未确认';
    }
}

//消失
function isClear(value, row, index) {
    if (value == '1') {
        return '已消失';
    }else{
        return '未消失';
    }
}
//-1为空
function isNull(value, row, index) {
    if (value == '-1') {
        return '';
    }else{
        return value;
    }
}

//转换时间
function isDate(value, row, index) {
    if (value == '') {
        return '';
    }else{
        var unixTimestamp = new Date(value * 1000);
        return unixTimestamp.toLocaleString();
    }
}

//报警等级
function isAlarm(row, index) {
    var alarmStyle = null;
    if (row.lv == '1') {
        alarmStyle = 'firstlevelStyle';
    } else if (row.lv == '2') {
        alarmStyle = 'secondlevelStyle';
    } else if (row.lv == '3') {
        alarmStyle = 'thirdlevelStyle';
    } else if (row.lv == '4') {
        alarmStyle = 'fourthlevelStyle';
    }
    return alarmStyle;
}