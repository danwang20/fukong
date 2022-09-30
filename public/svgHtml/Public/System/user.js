//用户信息接口，获取当前登录用户名称
function GetUserName(){
	var userJsonString=MCI_UserAdapter.LoginUserName();
	var userJson=JSON.parse(userJsonString);
	
	return userJson;
}