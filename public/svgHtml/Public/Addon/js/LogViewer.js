//初始化
$(function () {
    window.WEBAPIURL = '';
    //数据读取
    $.ajax({
        type: "get",
        url: "../../../../../mci_config.xml",
        dataType: "xml",
        timeout: 1000,
        cache: false,
        success: function (xml) {
            $(xml).find("Restful").each(function (i) {
                let url = $(this).children("URL");
                WEBAPIURL = url.text();

                createView();
            });
        }
    });
});
function createView(){
    //创建时间选择器
    $('#beginDatePicker').datetimepicker({
        format: 'yyyy-mm-dd',              //日期格式化，只显示日期
        minView: 2,                        //选择到的最小单位（2-天）
        autoclose: true,                   //选择之后，自动关闭时间弹框 Boolean类型 默认值：false
        language: 'zh-CN'                  //中文化
    });
    $('#endDatePicker').datetimepicker({
        format: 'yyyy-mm-dd',              //日期格式化，只显示日期
        minView: 2,                        //选择到的最小单位（2-天）
        autoclose: true,                   //选择之后，自动关闭时间弹框 Boolean类型 默认值：false
        language: 'zh-CN'                  //中文化
    });
    //创建表格
    $('#LogViewer').bootstrapTable({
        url: '',                              //请求后台的URL（*）
        method: 'get',                        //请求方式（*）
        striped: true,                        //是否显示行间隔色
        cache: false,                         //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                     //是否显示分页（*）
        sortable: false,                      //是否启用排序
        sortOrder: "asc",                     //排序方式
        sidePagination: "client",             //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                        //初始化加载第一页，默认第一页
        pageSize: 10,                         //每页的记录行数（*）
        pageList: [10, 25, 50, 100],          //可供选择的每页的行数（*）
        search: false,                         //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showColumns: false,                     //是否显示所有的列
        showRefresh: false,                    //是否显示刷新按钮
        minimumCountColumns: 2,                //最少允许的列数
        clickToSelect: true,                   //是否启用点击选中行
        height: 600,                           //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "time",                      //每一行的唯一标识，一般为主键列
        showToggle: false,                     //是否显示详细视图和列表视图的切换按钮
        cardView: false,                       //是否显示详细视图
        detailView: false,                     //是否显示父子表
        showExport: false,                      //是否显示导出
        exportDataType: "selected",            //basic', 'all', 'selected'.
        columns: [{
            field: 'time',
            title: '时间',
            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }, {
            field: 'AreaDesc',
            title: '区域'
        }, {
            field: 'SubsystemDesc',
            title: '子系统'
        }, {
            field: 'DeviceTypeDesc',
            title: '设备类'
        }, {
            field: 'EventDesc',
            title: '事件'
        }, {
            field: 'Label',
            title: '标签'
        }, {
            field: 'PointTag',
            title: '点位'
        }, {
            field: 'Value',
            title: '数值'
        }],
    });
    //获取筛选列表
    $.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/data',
        type: 'post',
        data: '{"SQL":"Select * From mci_area"}',
        timeout: 5000,
        success: function (data, status) {
            var AreaList = JSON.parse(data).results[0].series[0].values;
            for (var i in AreaList) {
                $("#Area").append("<option value='" + AreaList[i][3] + "'>" + AreaList[i][3] + "</option>");
            }
        }
    });
    $.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/data',
        type: 'post',
        data: '{"SQL":"Select * From mci_subsystem"}',
        timeout: 5000,
        success: function (data, status) {
            var SubsystemList = JSON.parse(data).results[0].series[0].values;
            for (var i in SubsystemList) {
                $("#Subsystem").append("<option value='" + SubsystemList[i][3] + "'>" + SubsystemList[i][3] + "</option>");
            }
        }
    });
    $.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/data',
        type: 'post',
        data: '{"SQL":"Select * From mci_devicetype"}',
        timeout: 5000,
        success: function (data, status) {
            var DevicetypeList = JSON.parse(data).results[0].series[0].values;
            for (var i in DevicetypeList) {
                $("#Devicetype").append("<option value='" + DevicetypeList[i][4] + "'>" + DevicetypeList[i][4] + "</option>");
            }
        }
    });
    //加载数据
    $.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/his',
        type: 'post',
        data: '{"SQL":"Select * From digit order by time desc limit 1000"}',
        timeout: 5000,
        success: function (data, status) {
            var jsonData=JSON.parse(data);
            if (DataChangeForInfluxdb.DataChange(jsonData) == 1) {
                //注入数据
                var tableData=DataChangeForInfluxdb.getTableData();
                $('#LogViewer').bootstrapTable('load', tableData);
            } else {
                $('#LogViewer').bootstrapTable('removeAll');
                console.log(DataChangeForInfluxdb.getErrorCode());
            }
        },
        fail: function (err, status) {
            console.log(err);
        }
    });
};

//转换时间
function isDate(value, row, index) {
    return value.replace('T', ',');
}

//条件查询
function selectLog() {
    var selectSQL = "select * from digit where time > '2000-01-01'";
    var endSQL = " order by time desc limit 1000";
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
    if (areaDesc != '全部区域') {
        selectSQL += " and AreaDesc = '" + areaDesc + "'";
    }
    if (subsystemDesc != '全部子系统') {
        selectSQL += " and SubsystemDesc = '" + subsystemDesc + "'";
    }
    if (devicetypeDesc != '全部设备类') {
        selectSQL += " and DeviceTypeDesc = '" + devicetypeDesc + "'";
    }
    var sql = selectSQL + endSQL;
    console.log(sql);
    //加载数据
    $.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/his',
        type: 'post',
        data: '{"SQL":"' + sql + '"}',
        timeout: 5000,
        success: function (data, status) {
            var jsonData=JSON.parse(data);
            if (DataChangeForInfluxdb.DataChange(jsonData) == 1) {
                //注入数据
                var tableData=DataChangeForInfluxdb.getTableData();
                $('#LogViewer').bootstrapTable('load', tableData);
            } else {
                $('#LogViewer').bootstrapTable('removeAll');
                console.log(DataChangeForInfluxdb.getErrorCode());
            }
        },
        fail: function (err, status) {
            console.log(err);
        }
    })
}
