
//--------------------------------------------《原始数据接口-开始》--------------------------------------------
//===实时库访问接口-开始===
//单个设备的实时json
function GetRTDevInfo(DeviceName){
	var devJsonString=MCI_DataAdapter.GetRTDeviceInfo(DeviceName);
	var devJson=JSON.parse(devJsonString);
	
	return devJson;
}

//多个设备的实时json
function GetMultiRTDevInfo(arrDeviceName){
	var devJsonString=MCI_DataAdapter.GetMultiRTDeviceInfo(arrDeviceName);
	var devJson=JSON.parse(devJsonString);
	
	return devJson;
}

//实时值（不带时间戳）
function GetRTValue(DeviceName,PointCode){
	var val;
	var devJsonString=MCI_DataAdapter.GetRTDeviceInfo(DeviceName);
	var devJson=JSON.parse(devJsonString);
	
	if (devJson==null || devJson.length==0)
	{
		return null;
	}
	
	var pts=devJson.points;
	
	if (pts==null || pts.length==0)
	{
		return null;
	}

	for (var j = 0; j < pts.length; j++){
		var pt=pts[j];
		if (pt.point==PointCode){
			val=pt.value;
			break;
		}
	}
	
	return val;
}

//带时间戳的实时值
function GetRTValueTS(DeviceName,PointCode){
	var val;
	var devJsonString=MCI_DataAdapter.GetRTDeviceInfo(DeviceName);
	var devJson=JSON.parse(devJsonString);
	
	if (devJson==null || devJson.length==0)
	{
		return {"val":null,"ts":null};
	}
	
	var pts=devJson.points;
	
	if (pts==null || pts.length==0)
	{
		return {"val":null,"ts":null};
	}

	for (var j = 0; j < pts.length; j++){
		var pt=pts[j];
		if (pt.point==PointCode){
			val=pt.value;
			break;
		}
	}
	
	return {"val":val,"ts":devJson.t};
}
//===实时库访问接口-结束===

//===历史库访问接口-开始===
function GetHISValues(DeviceName,PointCode,BeginDate,EndDate,Count){
	var pointJson=GetHISDeviceInfo(DeviceName,PointCode,BeginDate,EndDate,Count);

	return pointJson;
}

//将InfluxDB格式转成{ts:xxx,val:xxx}格式
function ConvertJsonTimeValue(dbJson){
	var jsonTV=[];
	if (dbJson.results[0].hasOwnProperty("series")){
		var arrVal=dbJson.results[0].series[0].values;
		var len=arrVal.length;
		
		for (var i=0;i<len;i++){
			var oVal=arrVal[i];
			var t=GetDateTimeMilli(oVal[3]);//TransTimestamp(oVal[0]); //TransTimestamp(oVal[0]); //时间戳
			var v=oVal[7]; //值
			var tv={ts:t,val:v};
			jsonTV.push(tv);
		}
	}
	
	return jsonTV;
}

//InfluxDB通用访问接口
function GetTSData(SQL){
	var pointJsonString=MCI_DataAdapter.GetTimeSeriesData(SQL);
	var pointJson=JSON.parse(pointJsonString);
	
	return pointJson;
}

function GetHISDeviceInfo(DeviceName,PointCode,BeginDate,EndDate,Count) {
    var ret;
    //string bDate = bDT.ToString("yyyy-MM-dd HH:mm:ss");
    //string eDate = eDT.ToString("yyyy-MM-dd HH:mm:ss");
    var bDate = DateTimeToUTCMilli(BeginDate);
    var eDate = DateTimeToUTCMilli(EndDate);

    var sDb = "mci";
    var sBaseAddr = "http://127.0.0.1:8086/";
    var sUsername = "root";
    var sPass = "root";

    if(Count==null)
    {
        Count = "0";
    }

    //此处不能用 ORDER BY InsertTime，因为influxdb支持time排序
    var sQuery = "select * from analog where PointTag = '"+DeviceName+"/"+PointCode+"' AND (InsertTime > "
		+bDate+" AND InsertTime < "+eDate+") ORDER BY time ASC LIMIT "+Count;

    var sUrl=sBaseAddr+"query?db="+sDb+"&u="+sUsername+"&p="+sPass+"&q="+sQuery;

    $.ajax({
        contentType: 'application/json',
        url: sUrl,
        type: 'get',
        timeout: 5000,
        async:false,
        success: function (data, status) {
            ret=data;
        },
        error: function (xhr, status) {
            console.log('GetHISDeviceInfo error:'+JSON.stringify(xhr));
        }
    });

    return ret;
}
//===历史库库访问接口-结束===

//===关系库访问接口-开始===
function GetSQLDataSet(SQL){
	var dataJsonString=MCI_DataAdapter.GetDataSet(SQL);
	var dataJson=JSON.parse(dataJsonString);
	
	return dataJson;
}
//===关系库访问接口-结束===
//--------------------------------------------《原始数据接口-结束》--------------------------------------------

//获取某个设备下的点的实时值（带时间戳）
function GetRTDataTS(DeviceName,PointCode) {
	var oVal=GetRTValueTS(DeviceName,PointCode);
	var dt=GetLocalTime(oVal.ts);
	now = new Date(dt);
	var ts=now.Format("yyyy/MM/dd hh:mm:ss");
	var val=oVal.val;
	return {
		name:ts,
		value:val
	}
}

//获取某个设备下的点的实时值（带时间戳）
function GetHISDataTSArray(DeviceName,PointCode,BeginDate,EndDate) {
	//var sToday=GetTodayDateString();
	//var sNow = new Date().Format("yyyy/MM/dd hh:mm:ss");
	var sbDate=BeginDate.Format("yyyy/MM/dd hh:mm:ss");
	var seDate=EndDate.Format("yyyy/MM/dd hh:mm:ss");
	
	var arrVal=GetHISValues(DeviceName,PointCode,sbDate,seDate,10000);
	
	var jsonTV=ConvertJsonTimeValue(arrVal);
	
	return jsonTV
}

//--------------------------------------------《控制命令接口-开始》--------------------------------------------

//控制命令下发POST
function SendPostCommand(CommandString){
	var resultString=MCI_DataAdapter.DASendPostCommand(CommandString);
	
	return resultString;
}

//--------------------------------------------《控制命令接口-开始》--------------------------------------------