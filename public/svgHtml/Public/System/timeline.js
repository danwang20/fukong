//生成日期时间轴，默认值为0
//StartDate、EndDate字符串时间格式，Interval单位秒
function CreateTimeLine(StartDate,EndDate,Interval){
	var DateFormat="hh:mm";  //yyyy/MM/dd hh:mm:ss
	var timeLine=[];
	var count=Math.ceil(parseInt(EndDate-StartDate)/1000/Interval);
	var d=new Date(StartDate);
	var sd=d.Format(DateFormat);
	for (var i=0;i<count;i++){
		var timeLoop={ts:sd,val:0};
		timeLine.push(timeLoop);
		//步进
		var sec=d.getSeconds();
		d.setSeconds(sec+Interval);
		sd=d.Format(DateFormat);
	}
	return timeLine;
}

//填充日期时间轴
//timeLineMain主轴，arrTimeVal需要叠加的轴
function FillTimeLine(timeLineMain,arrTimeVal){
	var lenMain=timeLineMain.length;
	var lenarr=arrTimeVal.length;
	var valKeep;
	
	for (var i=0;i<lenMain-1;i++){
		var tL=timeLineMain[i].ts; //左时间
		var tR=timeLineMain[i+1].ts; //右时间
		
		for (var j=0;j<lenarr;j++){
			var oTV=arrTimeVal[j];
			var t=oTV.ts;
			var v=oTV.val;
			if (tL<=t && t<=tR){
				timeLineMain[i].val+=v;
				valKeep=v;
			}
			else{
				timeLineMain[i].val+=valKeep;
			}
		}
	}
	return timeLineMain;
}

//得到时间轴的时间数组
function GetTimeLineTimeArray(timeLineMain){
	var timeArr=[];
	var lenMain=timeLineMain.length;
	
	for (var i=0;i<lenMain;i++){
		var t=timeLineMain[i].ts; //时间戳
		timeArr.push(t);
	}
	return timeArr;
}

//得到时间轴的值数组
function GetTimeLineValueArray(timeLineMain){
	var valArr=[];
	var lenMain=timeLineMain.length;
	
	for (var i=0;i<lenMain;i++){
		var v=timeLineMain[i].val; //值
		valArr.push(v);
	}
	return valArr;
}

//influxdb时间戳转常规 
function TransTimestamp(ifxTime){
	var t0=ifxTime.toString();
	var t1=t0.replaceAll("-","/");
	var t2=t1.replaceAll("T"," ");
	var p=t2.indexOf(".");
	var t3=t2.substring(0,p);
	
	var d=new Date(t3);
	d.setHours(d.getHours()+0);
	return d;
}

function GetLocalTime(unixtime){
	var unixTimestamp = new Date(unixtime * 1000);
	var commonTime = unixTimestamp.toLocaleString();
	return commonTime;
}

function GetDateTimeMilli(unixtimeMilli){
	var dttime = new Date(unixtimeMilli);
	return dttime;
}

//DateTime转UTC时间（毫秒）
function DateTimeToUTCMilli(vDate)
{
    var d=new Date(vDate);
    var utc=Number(d);
    return utc;
}

//得到当天的时间戳（年-月-日 0:00:00）
function GetTodayDateString(){
	var date=new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	//var hour = date.getHours();
	//var minute = date.getMinutes();
	//var second = date.getSeconds();
	
	var sd=year+"/"+month+"/"+day+" 0:00:00";
	
	return sd;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}