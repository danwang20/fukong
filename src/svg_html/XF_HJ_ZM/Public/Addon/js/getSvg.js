//加载
window.onload=function(){
	var path = '../Symbol/';
	$('script').each(function (i){
		var id = $(this).attr('src').replace(path,"").replace(".js","").toLowerCase();
		if(id.indexOf("_")==-1&&id.indexOf("/")==-1&&id.indexOf("main")==-1){
			var url=path+id+'.svg';
	        ReadXml(url,id);
		}
    });
};
//读取xml
function ReadXml(url,id){
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'xml',
		timeout: 1000,
		cache: false,
		error: function(xml){
			console.log('加载XML文档出错');
		},
		success: function(xml){
			$('#' + id).append($(xml).find("svg").children());
			console.log(url + '文件注入成功！');
		}
	});
}