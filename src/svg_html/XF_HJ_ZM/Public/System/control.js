//控制命令下发POST
function SendPostCmd(CommandString){
	console.log('SendPostCmd CommandString='+CommandString);
	$.ajax({
		contentType: 'application/json',
		url: WEBAPIURL + '/api/ctl',
		type: 'post',
		data: CommandString,
		timeout: 5000,
		success: function (data, status) {
			console.log('SendPostCmd success!!!');
		},
		error: function (xhr, status) {
			console.log('SendPostCmd error:'+xhr);
		}
	});
}