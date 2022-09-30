//根据设备json数组，更新整个屏幕上的设备状态（图层、文本等）
function UpdateScreen(arrDeviceJsonString){
	try {
		var arrDeviceJson=JSON.parse(arrDeviceJsonString);
		if (typeof(arrDeviceJson) == "undefined"){ 
			return; 
		}

		for (var index = 0; index < arrDeviceJson.length; index++){
			var dj=arrDeviceJson[index];//获取单个设备json对象
			
			//更新设备状态（状态更新+字符串显示）
			UpdateDevice(dj);
			
			////动态调用设备类里的动作函数，调用方式：JSCallback(函数名,[参数1,参数2,参数...]);
			//var StructFuncName=dj.dtcode.toLowerCase();
			//JSCallback(StructFuncName,[dj]);
		}
	} catch(e) {
		//console.log('UpdateScreen Error,arrDeviceJsonString='+arrDeviceJsonString+',Error='+e);
		console.log('UpdateScreen Error='+e);
	}
}

//根据设备json对象，更新单个设备
function UpdateDevice(DeviceJson){
    try {
        if (isOwnEmpty(DeviceJson)) {
            return;
        }

        //根据DeviceJson中的devname字段查找本流程图页面的global_json_objectmap，得到状态显示层和文本字符串的HTML DOMID
        var DevName = DeviceJson.devname;

		//FoundMapByDevID 根据的DevID，查找本流程图页面的global_json_objectmap，找到此设备的map映射对象
        var DevMap = FoundMapByDevID(DevName);
        var devType = DeviceJson.dtcode.toLowerCase();//从后端获取的类型值
        var devPoints = DeviceJson.points;//从后端获取的点位值


        //刷新状态层
        //根据字符串得到存储状态设置的json的变量
        eval("json_action_g=json_action_" + devType + ".act_g");
        var arrDOMID_g = DevMap.dommap.type_g;
        if (arrDOMID_g != null) {
            var arrELEID_g = arrDOMID_g.eleid;
            var arrUSEID_g = arrDOMID_g.useid;
            UpdateDevice_g(arrELEID_g, arrUSEID_g, json_action_g, devPoints);
        }

        //刷新字符串
        //根据字符串得到存储状态设置的json的变量
        eval("json_action_text=json_action_" + devType + ".act_text");
        var arrDOMID_Text = DevMap.dommap.type_text;
        UpdateDevice_text(arrDOMID_Text, json_action_text, devPoints);
    } catch(e) {
        console.log('UpdateDevice Error='+e);
    }
}

//更新设备的状态
function UpdateDevice_g(arrELEID,arrUSEID,arrActSetting,arrDevPoints){
	if (arrELEID==null || arrUSEID==null || arrActSetting.length==0)
	{
		return;
	}
	
	try{
		//依次计算每个元件
		for (var i=0;i< arrELEID.length;i++){
			var eid=arrELEID[i];
			var arrAct=FindElementExpressionArray(arrActSetting,eid);
			
			//依次计算哪个表达式先成立，则显示此图层
			var Display_gid=FetchExpression_g(arrAct,arrDevPoints);
			
			if (Display_gid!="")
			{
				//遍历domid的设备
				for (var j = 0; j < arrUSEID.length; j++) {
					var domid=arrUSEID[j]+".element."+eid;//获取单个domid
					
					var dev=document.getElementById(domid);
					if(dev!=null){
						if (dev.nodeName.toLowerCase()=="use"){
							var id=dev.getAttribute("id");
							var attr=dev.getAttribute("xlink:href");

							var attrarr=attr.split("#");
							var oldgid=attrarr[1];
							if (Display_gid!=oldgid)
							{
								dev.setAttributeNS(SVG_XLINK, "xlink:href",attrarr[0]+"#"+ Display_gid);
							}
						}
					}
				}
			}
		}
	} catch(e) {
		console.log('UpdateDevice_g Error='+e);
	}
}

//更新设备的模拟量
function UpdateDevice_text(arrDOMID,arrActSetting,arrDevPoints){
	if (arrDOMID==null)
	{
		return;
	}
	
	//遍历domid的设备字符串
	for (var i = 0; i < arrDOMID.length; i++) {
		var objDomid=arrDOMID[i];//获取单个domid对象
		var domid=objDomid.domid;//获取单个domid
		var txtid=objDomid.textid;//获取单个textid
		
		var dispExpression=FindDisplayExpression(arrActSetting,txtid);
		var realText=RealTimeExpression(dispExpression,arrDevPoints);
		
		if (typeof(realText) != "undefined"){
			var devtxt=document.getElementById(domid);
			if (typeof(devtxt) != "undefined"){
				if(devtxt.hasChildNodes){
					//遍历text节点，找到第一个tspan节点
					var nds = devtxt.childNodes;
					if (typeof(nds) != "undefined"){
						for (var j = 0; j < nds.length; j++){
							var nd = nds.item(j);
							if(nd.nodeName.toLowerCase()=="tspan"){
								nd.innerHTML=realText;
								break;
							}
						}
					}
				}  
			}
		}
	}
}


//根据的DevID，查找本流程图页面的global_json_objectmap，找到此设备的map映射对象
function FoundMapByDevID(DevName){
	var DevMap;
	
	for (var i = 0; i < global_json_objectmap.length; i++){
		var map=global_json_objectmap[i];//获取单个映射json对象
		if (map.devname==DevName){
			DevMap=map;
			break;
		}
	}
	
	return DevMap;
}

//（状态显示）遍历找到第一个执行成功的表达式，返回对应的图层Symbol ID,如果没有找到，则默认返回第一个
function FetchExpression_g(arrExpression,arrDevPoints){	
	if (arrExpression.length==0)
	{
		return "";
	}
	
	try{
		var DisplayID=arrExpression[0].display_gid;//默认返回第一个
		
		for (var i = 0; i < arrExpression.length; i++){
			var exp=arrExpression[i].expression;//获取单个表达式
			var realExp=RealTimeExpression(exp,arrDevPoints);//最终生成的表达式
			
			//计算表达式，如果表达式返回1，则代表成立
			var ExpResult=CalcExpression(realExp);
			
			if (ExpResult){
				DisplayID=arrExpression[i].display_gid;
				break;
			}
		}
	} catch(e) {
		console.log('FetchExpression_g Error='+e);
	}
	
	return DisplayID;
}

//返回带实时库值的表达式字符串
function RealTimeExpression(ExpressionString,arrDevPoints){
	if (typeof(ExpressionString) == "undefined"){ 
		return; 
	}
	
	var realExp=ExpressionString;
	
	//得到表达式后，遍历里面的每个变量，并转成实际的值，生成最终的表达式去计算结果
	var arrExp=realExp.split(VAR_EXP_POINTSTART);
	for (var j = 0; j < arrExp.length; j++){
		var sExp=arrExp[j];
		
		if (sExp.indexOf("}")>0){
			var ptName=sExp.split(VAR_EXP_POINTEND)[0];
			
			var ptVal=GetPointValue(arrDevPoints,ptName);
			
			var ptString=VAR_EXP_POINTSTART+ptName+VAR_EXP_POINTEND;
			
			//把表达式里的全部${ptString}替换成真实的值ptVal
			realExp=realExp.replaceAll(ptString,ptVal);
		}
	}
	
	return realExp;
}


//根据点的属性名，获取相应的值
function GetPointValue(arrDevPoints,sPropertyName){
	var val;
	for (var i = 0; i < arrDevPoints.length; i++) {
		var tag=arrDevPoints[i].point;
		if (tag==sPropertyName){
			val=arrDevPoints[i].value;
			break;
		}
	}
	
	return val;
}

//计算表达式最后的结果
function CalcExpression(ExpressionString){
	try{
		if (typeof(ExpressionString) == "undefined" || ExpressionString==null || ExpressionString==""){ 
			return false; 
		}
		eval("var rtn=("+ExpressionString+")");
		return rtn;
	} catch(e) {
		console.log('CalcExpression ExpressionString='+ExpressionString+', Error='+e);
		return false;
	}
}

//根据TextId找到显示的表达式
function FindDisplayExpression(arrActSetting,TextId){
	var txtExp;
	
	for (var i = 0; i < arrActSetting.length; i++) {
		var act=arrActSetting[i];//获取单个映射json对象
		if (act.textid==TextId){
			txtExp=act.display_text;
			break;
		}
	}
	
	return txtExp;
}

//查找元件ID对应的表达式集合
function FindElementExpressionArray(arrActSetting,ElementId){
	var arrExp;
	
	for (var i = 0; i < arrActSetting.length; i++) {
		var act=arrActSetting[i];//获取单个映射json对象
		if (act.eleid==ElementId){
			arrExp=act.display;
			break;
		}
	}
	
	return arrExp;
}

//--------------------------------------------《全局变量-开始》--------------------------------------------
var SVG_XLINK="http://www.w3.org/1999/xlink";
var VAR_EXP_POINTSTART="@{";
var VAR_EXP_POINTEND="}";

//--------------------------------------------《全局变量-结束》--------------------------------------------

//--------------------------------------------《全局函数-开始》--------------------------------------------
//动态调用函数
function ApplyCallback(fn,args){
    fn.apply(this, args);
}
function JSCallback(fn,args){
	ApplyCallback(eval(fn),args);
}

//往String对象里加入去空格函数
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
	return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
}
//往String对象里加入替换全部函数
String.prototype.replaceAll = function(oldString,newString){ 
	return this.replace(new RegExp(oldString,"gm"),newString); 
}

function isOwnEmpty(obj)
{
　　for(var name in obj)
　　{
　　　　if(obj.hasOwnProperty(name))
　　　　{
　　　　　　return false;//返回false，不为空对象
　　　　}
　　}
　　return true;//返回true，为空对象
}

//设置图层是否显示
function ShowLayer(LayerID,Visible){
	var sVisible="visible";
	if (Visible.toLowerCase()=="show"){
		sVisible="visible";
	}
	else{
		sVisible="hidden";
	}

	document.getElementById(LayerID).style.visibility=sVisible;
}
//--------------------------------------------《全局函数-结束》--------------------------------------------


//--------------------------------------------《通用事件响应-开始》--------------------------------------------
function EventHandler(EventName,Params){
	//MCI_EventAdapter.EventProcessor(EventName,Params);
	if(EventName='onclick'){
		ScreenOnClick(Params);
	}
}

function EventOnClickDevicePicker(DomID){
	MCI_EventAdapter.EventShowDevicePicker(DomID);
}

function EventOnClickDevicePickerCallback(DomID,Text){
	var obj=document.getElementById(DomID);
	if (obj!=null){
		obj.value=Text;
	}
}
//--------------------------------------------《通用事件响应-结束》--------------------------------------------

//--------------------------------------------《MQTT实时数据变送-开始》--------------------------------------------
var MQ_IP="127.0.0.1";
var MQ_Port="8083";

$.ajax({
    type: "get",
    url: "../../../../mci_config.xml",
    dataType: "xml",
    timeout: 1000,
    cache: false,
    success: function (xml) {
        $(xml).find("MQ").each(function (i) {
            let IP = $(this).children("IP");
            let Port = $(this).children("Port");
            MQ_IP = IP.text();
            MQ_Port=Port.text();
            InitMQ();
        });
    }
});

function InitMQ() {
	// Create a client instance
    client = new Paho.MQTT.Client(MQ_IP, Number(MQ_Port), "MCI_HMI_CLIENT_" + Date.now());

	// set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

	// connect the client
    client.connect({onSuccess: onConnect});
}

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("MQTT onConnect");
    client.subscribe("MCIDEV/#");  //数据量较少的时候，可以全量订阅，此处后期可优化
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("MQTT onConnectionLost:"+responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    //console.log("MQTT onMessageArrived");
    var devjson= '['+ message.payloadString + ']';
    UpdateScreen(devjson);
}

//--------------------------------------------《MQTT实时数据变送-结束》--------------------------------------------