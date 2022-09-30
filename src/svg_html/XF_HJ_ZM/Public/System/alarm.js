//报警接口，获取三行报警栏数据
function GetAlarmBarData(){
	var almJsonString=MCI_AlarmAdapter.GetAlmBarDataJson();
	var almJson=JSON.parse(almJsonString);
	
	return almJson;
}

//报警接口，获取报警管理器数据
function GetAlarmManagerData(){
	var almJsonString=MCI_AlarmAdapter.GetAlmManagerDataJson();
	var almJson=JSON.parse(almJsonString);

	return almJson;
}

//报警接口，报警控制
function SendPostAlarmCommand(JsonAlmCmd){
	var AlmCmdString=JSON.stringify(JsonAlmCmd);
	var ret=MCI_AlarmAdapter.SendPostAlmCommandJson(AlmCmdString);

	return ret;
}