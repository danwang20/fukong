//初始化
$(function(){
    //创建时间选择器
    $('#beginDatePicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',              //日期格式化，只显示日期
        minView: 0,                        		 //选择到的最小单位（0-分钟）
		minuteStep: 1,							 //时间间隔
		autoclose: 1,							 //自动关闭
		pickerPosition: 'bottom-left',
        language: 'zh-CN'                  		 //中文化
    }).on('changeDate', function(e){
        ShowTrend();
    });
    $('#endDatePicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',              //日期格式化，只显示日期
        minView: 0,                              //选择到的最小单位（0-分钟）
		minuteStep: 1,							 //时间间隔
		autoclose: 1,
		pickerPosition: 'bottom-left',
        language: 'zh-CN'                        //中文化
    }).on('changeDate', function(e){
        ShowTrend();
    });
});