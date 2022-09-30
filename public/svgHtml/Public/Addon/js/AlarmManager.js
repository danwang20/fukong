//初始化
$(function () {
    //创建表格
    $('#AlarmManager').bootstrapTable({
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
        showColumns: false,                    //是否显示所有的列
        showRefresh: false,                    //是否显示刷新按钮
        minimumCountColumns: 2,                //最少允许的列数
        clickToSelect: true,                   //是否启用点击选中行
        height: 600,                           //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "aid",                       //每一行的唯一标识，一般为主键列
        showToggle: false,                     //是否显示详细视图和列表视图的切换按钮
        cardView: false,                       //是否显示详细视图
        detailView: false,                     //是否显示父子表
        showExport: true,                      //是否显示导出
        exportDataType: "all",             	  //basic', 'all', 'selected'.
		exportTypes: ['csv','excel'],
        rowStyle: function (row, index) {
            return {classes: isAlarm(row, index)};
        },
        columns: [{
            align : 'center',
            checkbox: true,//显示复选框
            formatter: function (i,row) {//每次加载checkbox时判断当前row的id是否已经存在全局Set()里
                if(overAllIds.has(row.aid)){//因为Set是集合,需要先转换成数组  
                    return {
                        checked : true //存在则选中
                    }
                }
            }
        }, {
            field: 'crt',
            title: '报警时间',
            formatter:
                function (value, row, index) {
                    return isDate(value, row, index);
                }
        }, {
            field: 'aid',
            title: '报警id',
            visible: false
        }, {
            field: 'lv',
            title: '报警级别'
        }, {
            field: 'ad',
            title: '区域'
        }, {
            field: 'sc',
            title: '子系统'
        }, {
            field: 'dn',
            title: '设备类型'
        }, {
            field: 'lb',
            title: '设备名'
        }, {
            field: 'pt',
            title: '点类型',
        }, {
            field: 'ms',
            title: '报警描述'
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
    //绑定右键事件
    $.contextMenu({
        selector: "#AlarmManager tr",
        items: {
            confirm: {
                name: "确认报警",
                callback:
                    function (key, options) {
                        console.log(options);
                        //获取报警id
                        var tmp = options.$trigger[0].outerHTML.split('data-uniqueid="');
                        var almId = tmp[1].split('"');
						//alert(almId[0]);
                        //获取unix时间
                        var unixTime=new Date().getTime();
                        var almJsonString = {
                            "ptype": "DI",
                            "almid": almId[0],
                            "value": "1",
                            "optype": "confirm",
                            "optime": unixTime + "",
                            "opuser": "admin"
                        };
                        console.log(almJsonString);
                        console.log(SendPostAlarmCommand(almJsonString));
                    }
            },
        }
    });
    //加载数据
    $('#AlarmManager').bootstrapTable('load', GetAlarmManagerData().pts);
    //响应复选框按钮
	$('#AlarmManager').on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e, rows){
		var datas = $.isArray(rows) ? rows : [rows];//点击时获取选中的行或取消选中的行
        examine(e.type,datas);//保存到全局Set()里
	});
	
	//设置定时器
    setInterval(LoadAlarmManager,1000);
});
//循环加载数据
function LoadAlarmManager(){
	var pxcur = $('#AlarmManager').bootstrapTable('getScrollPosition');//刷新数据后滚轮回到之前位置
    $('#AlarmManager').bootstrapTable('load', GetAlarmManagerData().pts);
	$('#AlarmManager').bootstrapTable('scrollTo', pxcur);
}

//报警确认按钮响应函数,批量确认
var btnconfirm = document.getElementById("btn_confirm");
btnconfirm.onclick = function(){ 
	var rowsel= $('#AlarmManager').bootstrapTable('getSelections');
	if(rowsel.length > 0){
		var res = confirm("确定要确认报警吗？");
		if (res == true)
		{			
			var unixTime=new Date().getTime();
			//间隔150毫秒下发
			for(var row=0;row<rowsel.length;row++){
			  setTimeout((function(row){
			   return function(){
					var almJsonString = {
						"ptype": rowsel[row].pt,
						"almid": rowsel[row].aid,
						"value": "1",
						"optype": "confirm",
						"optime": unixTime + "",
						"opuser": "admin"
					};
				console.log(almJsonString);
				console.log(SendPostAlarmCommand(almJsonString));					
			   }
			  })(row),(function(row){
				return row*150;
			  })(row));
			}			
		}		
	}
	else {
		alert('请选中要确认的行!');
	}
};

var overAllIds = new Set();//全局保存选中行的对象
function examine(type,datas){//操作类型，选中的行
    if(type.indexOf('uncheck')==-1){    
        $.each(datas,function(i,v){     
            overAllIds.add(v.aid);//如果是选中则添加选中行的id
        });
    }else{
        $.each(datas,function(i,v){        
            overAllIds.delete(v.aid);//删除取消选中行的id
        });
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
        var unixTimestamp = new Date(parseInt(value));
		return unixTimestamp.getFullYear() + '-' + (unixTimestamp.getMonth() + 1) + '-' + unixTimestamp.getDate() + ',' + unixTimestamp.getHours()+ ':' + unixTimestamp.getMinutes()+ ':' + unixTimestamp.getSeconds();
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