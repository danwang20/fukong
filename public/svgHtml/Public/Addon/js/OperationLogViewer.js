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
	
	/*WEBAPIURL = 'http://127.0.0.1:8083';
	createView();*/
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
        showExport: true,                      //是否显示导出
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
            field: 'LogContent',
            title: '事件'
        }, {
            field: 'User',
            title: '用户名'
        }],
    });
	
	//get filter list
	var stationMap = new Map();
	var subsystemMap = new Map();
	var devicetypeMap = new Map();
	var UserNameMap = new Map();
	var logTypeMap = new Map();
	$.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/log',
        type: 'post',
		data: '{"SQL":"SELECT b.AreaDesc,c.SubsystemDesc,d.DeviceTypeDesc,f.LogDesc,e.UserName    \
        FROM mci_log_table AS a,mci_area AS b,mci_subsystem AS c,mci_devicetype AS d,mci_user AS e,mci_log AS f LIMIT 50"}',
        timeout: 5000,
        success: function (data, status) {
			data = JSON.parse(data);
            for (var i = 0; i < data.length; i++){
				
				if(data[i].AreaDesc != '' && !stationMap.has(data[i].AreaDesc)){	
					stationMap.set(data[i].AreaDesc,i);
					$("#Area").append("<option value='" + data[i].AreaDesc + "'>" + data[i].AreaDesc + "</option>");
				}
				if(data[i].SubsystemDesc != '' && !subsystemMap.has(data[i].SubsystemDesc)){
					subsystemMap.set(data[i].SubsystemDesc,i);
					$("#Subsystem").append("<option value='" +data[i].SubsystemDesc + "'>" + data[i].SubsystemDesc + "</option>");
				}
				if(data[i].DeviceTypeDesc != '' && !devicetypeMap.has(data[i].DeviceTypeDesc)){
                    devicetypeMap.set(data[i].DeviceTypeDesc,i);
					$("#Devicetype").append("<option vlaue ='" + data[i].DeviceTypeDesc + "'>" + data[i].DeviceTypeDesc + "</option>");
				}
                if(data[i].UserName != '' && !UserNameMap.has(data[i].UserName)){
                    UserNameMap.set(data[i].UserName,i);
					$("#User").append("<option value ='" + data[i].UserName + "'>" + data[i].UserName + "</option>"); 
				}
                if(data[i].LogDesc != '' && !logTypeMap.has(data[i].LogDesc)){
                    logTypeMap.set(data[i].LogDesc,i);
                    $("#LogType").append("<option value ='" + data[i].LogDesc + "'>" + data[i].LogDesc + "</option>");
                }
            }
        }
    });

	var series = new Array();
	series[0] = "time";
	series[1] = "AreaDesc";
	series[2] = "SubsystemDesc";
	series[3] = "DeviceTypeDesc";
	series[4] = "LogContent";
	series[5] = "User";
	
	var row = [];
	window.tableData = [];
	$('#LogViewer').bootstrapTable('removeAll');
	$.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/log',
        type: 'post',
		data: '{"SQL":"SELECT a.DateTime,b.AreaDesc,c.SubsystemDesc,d.DeviceTypeDesc,a.LogContent,e.UserName    \
        FROM ((((mci_log_table AS a LEFT OUTER JOIN mci_area As b ON a.AreaCode = b.AreaCode)                   \
        LEFT OUTER JOIN mci_subsystem AS c ON a.SubSystemCode = c.SubSystemCode)                                \
        LEFT OUTER JOIN mci_devicetype AS d ON a.DeviceTypeCode = d.DeviceTypeCode)                             \
        LEFT OUTER JOIN mci_user AS e ON a.UserId = e.UserId)                                                   \
        LEFT OUTER JOIN mci_log AS f ON a.LogType = f.LogType LIMIT 50"}',
        timeout: 5000,
        success: function (data, status) {
			data = JSON.parse(data);
			console.log(data);
			
            for (var i = 0; i < data.length; i++){
            
                row = [];
				row.push(convertTimeFormat(data[i].DateTime));
				row.push(data[i].AreaDesc);
				row.push(data[i].SubsystemDesc);
				row.push(data[i].DeviceTypeDesc);
				row.push(data[i].LogContent);
				row.push(data[i].UserName);
				
				var tableRow = {};
				for(var j in series){
					tableRow[series[j]] = row[j];
				}		
                tableData.push(tableRow);
            }
            $('#LogViewer').bootstrapTable('load', tableData);
        }
    });
};

//转换时间
function isDate(value, row, index) {
    return value.replace('T', ',');
}

function convertTimeFormat(time){
	return new Date(time*1000).toLocaleString();
}

//条件查询
function selectLog() {
    var selectSQL = "SELECT a.DateTime,b.AreaDesc,c.SubsystemDesc,d.DeviceTypeDesc,a.LogContent,e.UserName  \
    FROM ((((mci_log_table AS a LEFT OUTER JOIN mci_area As b ON a.AreaCode = b.AreaCode)                   \
    LEFT OUTER JOIN mci_subsystem AS c ON a.SubSystemCode = c.SubSystemCode)                                \
    LEFT OUTER JOIN mci_devicetype AS d ON a.DeviceTypeCode = d.DeviceTypeCode)                             \
    LEFT OUTER JOIN mci_user AS e ON a.UserId = e.UserId)                                                   \
    LEFT OUTER JOIN mci_log AS f ON a.LogType = f.LogType WHERE a.DateTime > '2000-01-01'";
    var endSQL = " limit 50";
    var beginDate = $('#beginDateIn').val();
    var endDate = $('#endDateIn').val();
    var areaDesc = $('#Area').val();
    var SubsystemDesc = $('#Subsystem').val();
    var DeviceTypeDesc = $('#Devicetype').val();
    var LogTypeDesc = $('#LogType').val();
	var UserName = $('#User').val();
    if (beginDate != '') {
        selectSQL += " and a.DateTime > '" + beginDate + "'";
    }
    if (endDate != '') {
        selectSQL += " and a.DateTime < '" + endDate + "'";
    }
    if (areaDesc != '全部区域') {
        selectSQL += " and b.AreaDesc = '" + areaDesc + "'";
    }
    if (SubsystemDesc != '全部子系统') {
        selectSQL += " and c.SubsystemDesc = '" + SubsystemDesc + "'";
    }
    if (DeviceTypeDesc != '全部设备类') {
        selectSQL += " and d.DeviceTypeDesc = '" + DeviceTypeDesc + "'";
    }
	if (UserName != '全部用户') {
        selectSQL += " and e.UserName = '" + UserName + "'";
    }
    if (LogTypeDesc != '全部日志') {
        selectSQL += " and f.LogDesc = '" + LogTypeDesc + "'";
    }
    
    var sql = selectSQL + endSQL;
    console.log('sql is:',sql);
	
	var series = new Array();
	series[0] = "time";
	series[1] = "AreaDesc";
	series[2] = "SubsystemDesc";
	series[3] = "DeviceTypeDesc";
	series[4] = "LogContent";
	series[5] = "User";
	
	var row = [];
	window.tableData = [];
	
	$('#LogViewer').bootstrapTable('removeAll');
	
	$.ajax({
        contentType: 'application/json',
        url:  WEBAPIURL + '/api/log',
        type: 'post',
		data: '{"SQL":"' + sql + '"}',
        timeout: 5000,
        success: function (data, status) {
			data = JSON.parse(data);
			console.log(data);
			
            for (var i in data) {
				
				row = [];
				row.push(convertTimeFormat(data[i].DateTime));
				row.push(data[i].AreaDesc);
				row.push(data[i].SubsystemDesc);
				row.push(data[i].DeviceTypeDesc);
				row.push(data[i].LogContent);
				row.push(data[i].UserName);
				
				var tableRow = {};
				for(var j in series){
					tableRow[series[j]] = row[j];
				}		
				
				tableData.push(tableRow);
				
				$('#LogViewer').bootstrapTable('load', tableData);
			}
        }
    });
}
