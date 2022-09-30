//初始化
$(function () {
    //创建时间选择器
    $('#beginDatePicker').datetimepicker({
        format: 'yyyy-mm-dd',              //日期格式化，只显示日期
        minView: 2,                        //选择到的最小单位（2-天）
        language: 'zh-CN'                  //中文化
    });
    $('#endDatePicker').datetimepicker({
        format: 'yyyy-mm-dd',              //日期格式化，只显示日期
        minView: 2,                        //选择到的最小单位（2-天）
        language: 'zh-CN'                  //中文化
    });
    //创建表格
    $('#AlarmViewer').bootstrapTable({
        url: '',                              //请求后台的URL（*）
        method: 'get',                        //请求方式（*）
        toolbar: '#toolbar',                  //工具按钮用哪个容器
        striped: false,                       //是否显示行间隔色
        cache: false,                         //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                     //是否显示分页（*）
        sortable: false,                      //是否启用排序
        sortOrder: "asc",                     //排序方式
        sidePagination: "client",             //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                        //初始化加载第一页，默认第一页
        pageSize: 10,                         //每页的记录行数（*）
        pageList: [10, 25, 50, 100],          //可供选择的每页的行数（*）
        search: true,                         //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showColumns: true,                     //是否显示所有的列
        showRefresh: false,                    //是否显示刷新按钮
        minimumCountColumns: 2,                //最少允许的列数
        clickToSelect: true,                   //是否启用点击选中行
        height: 600,                             //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "alarmid",                   //每一行的唯一标识，一般为主键列
        showToggle: false,                     //是否显示详细视图和列表视图的切换按钮
        cardView: false,                       //是否显示详细视图
        detailView: false,                     //是否显示父子表
        showExport: true,                      //是否显示导出
        exportDataType: "selected",            //basic', 'all', 'selected'.
        rowStyle: function (row, index) {
            return {classes: isAlarm(row, index)};
        },
        columns: [{
            field: 'createtime',
            title: '报警时间',
            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }, {
            field: 'alarmid',
            title: '报警id',
            visible: false
        }, {
            field: 'level',
            title: '报警级别',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'areadesc',
            title: '区域',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'subsystemdesc',
            title: '子系统',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'devicetypedesc',
            title: '设备类型',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'label',
            title: '设备名',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'message',
            title: '报警描述',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'isconfirm',
            title: '确认状态',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'isclear',
            title: '报警状态',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'issound',
            title: '抑制状态',
            visible: false,
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'confirmtime',
            title: '确认时间',
            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }, {
            field: 'confirmuser',
            title: '操作员',
            formatter:
                function (value, row, index) {
                    return isNull(value, row, index);
                }
        }, {
            field: 'cleartime',
            title: '消失时间',
            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }],
    });
    //获取筛选列表
    $.ajax({
        contentType: 'application/json',
        url: 'http://172.20.31.22:5001/api/data',
        type: 'post',
        data: '{"SQL":"Select * From mci_area"}',
        timeout: 5000,
        success: function (data, status) {
            var AreaList = JSON.parse(data).results[0].series[0].values;
            for (var i in AreaList) {
                $("#Area").append("<option value='" + AreaList[i][2] + "'>" + AreaList[i][3] + "</option>");
            }
        }
    });
    $.ajax({
        contentType: 'application/json',
        url: 'http://172.20.31.22:5001/api/data',
        type: 'post',
        data: '{"SQL":"Select * From mci_subsystem"}',
        timeout: 5000,
        success: function (data, status) {
            var SubsystemList = JSON.parse(data).results[0].series[0].values;
            for (var i in SubsystemList) {
                $("#Subsystem").append("<option value='" + SubsystemList[i][2] + "'>" + SubsystemList[i][3] + "</option>");
            }
        }
    });
    $.ajax({
        contentType: 'application/json',
        url: 'http://172.20.31.22:5001/api/data',
        type: 'post',
        data: '{"SQL":"Select * From mci_devicetype"}',
        timeout: 5000,
        success: function (data, status) {
            var DevicetypeList = JSON.parse(data).results[0].series[0].values;
            for (var i in DevicetypeList) {
                $("#Devicetype").append("<option value='" + DevicetypeList[i][2] + "'>" + DevicetypeList[i][3] + "</option>");
            }
        }
    });
    //加载数据
    $.ajax({
        contentType: 'application/json',
        url: 'http://172.20.31.22:5001/api/his',
        type: 'post',
        data: '{"SQL":"Select * From alarms order by time desc"}',
        timeout: 5000,
        success: function (data, status) {
            if (DataChangeForInfluxdb.DataChange(JSON.parse(data)) == 1) {
                //注入数据
                $('#AlarmViewer').bootstrapTable('load', DataChangeForInfluxdb.getTableData());
            } else {
                $('#AlarmViewer').bootstrapTable('removeAll');
                console.log(DataChangeForInfluxdb.getErrorCode());
            }
        },
        fail: function (err, status) {
            console.log(err);
        }
    });
});

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
    if (value == '-1') {
        return '';
    }else{
        var unixTimestamp = new Date(value * 1000);
        return unixTimestamp.toLocaleString();
    }
}

//报警等级
function isAlarm(row, index) {
    var alarmStyle = null;
    if (row.level == '1') {
        alarmStyle = 'firstlevelStyle_His';
    } else if (row.level == '2') {
        alarmStyle = 'secondlevelStyle_His';
    } else if (row.level == '3') {
        alarmStyle = 'thirdlevelStyle_His';
    } else if (row.level == '4') {
        alarmStyle = 'fourthlevelStyle_His';
    }
    return alarmStyle;
}

//条件查询
function selectLog() {
    var selectSQL = "select * from alarms where time > '2000-01-01'";
    var endSQL = "order by time desc";
    var beginDate = $('#beginDateIn').val();
    var endDate = $('#endDateIn').val();
    var areaDesc = $('#Area').val();
    var subsystemDesc = $('#Subsystem').val();
    var devicetypeDesc = $('#Devicetype').val();
    if (beginDate != '') {
        selectSQL += " and time > '" + beginDate + "'";
    }
    if (endDate != '') {
        selectSQL += " and time < '" + endDate + "'";
    }
    if(areaDesc != '全部区域'){
        selectSQL += " and AreaDesc = '" + areaDesc + "'";
    }
    if(subsystemDesc != '全部子系统'){
        selectSQL += " and SubsystemDesc = '" + subsystemDesc + "'";
    }
    if(devicetypeDesc != '全部设备类'){
        selectSQL += " and DeviceTypeDesc = '" + devicetypeDesc + "'";
    }
    var sql = selectSQL + endSQL;
    console.log(sql);
    //加载数据
    $.ajax({
        contentType: 'application/json',
        url: 'http://172.20.31.22:5001/api/his',
        type: 'post',
        data: '{"SQL":"' + sql + '"}',
        timeout: 5000,
        success: function (data, status) {
            if (DataChangeForInfluxdb.DataChange(JSON.parse(data)) == 1) {
                //注入数据
                $('#AlarmViewer').bootstrapTable('load', DataChangeForInfluxdb.getTableData());
            } else {
                $('#AlarmViewer').bootstrapTable('removeAll');
                console.log(DataChangeForInfluxdb.getErrorCode());
            }
        },
        fail: function (err, status) {
            console.log(err);
        }
    })
}