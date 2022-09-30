//加载
$(function () {
    //依据defs中的图元id开始注入
    $('symbol').each(function (i) {
        var id = $(this).attr('id').toLowerCase();
        console.log(id);
        let def = document.getElementsByTagName('defs')
        let defsid = def[0].id;
        console.log(defsid);
        getSvg('../Symbol/' + id + '.svg', defsid);
    });
    //加载设备面板模板
    getDevicePanel();
    //创建控制面板列表
    window.devicePanelList = [];
    window.devicePanelValuedefine = [];
    window.WEBAPIURL = '';
    $.ajax({
        type: "get",
        url: "../../../../mci_config.xml",
        dataType: "xml",
        timeout: 1000,
        cache: false,
        success: function (xml) {
            $(xml).find("Restful").each(function (i) {
                let url = $(this).children("URL");
                WEBAPIURL = url.text();
                InitMQCtrl();
            });
        }
    });
    //创建数据刷新
    setInterval(function () {
        upDateDeviceInTable();
    }, 1000);

});

//设备图元点击事件
function DeviceOnClick(deviceName) {
    //面板数量上限
    var devicePanelNum = 1;
    //获取设备名
    // var json = $.parseJSON(Params);
    // var deviceName = json.src.replaceAll('/','_');
    deviceName = deviceName.replaceAll('/', '_');
    var devicePanel = $('#' + deviceName);
    if (!devicePanel[0]) {
        //上限判断
        if (devicePanelList.length >= devicePanelNum) {
            //关闭第一个面板
            closeDevicePanel(devicePanelList.shift());
            //打开设备面板
            openDevicePanel(deviceName);
        } else {
            //直接打开设备面板
            openDevicePanel(deviceName);
        }
    }
}

//普通图形（非设备图元）的点击事件
function ElementOnClick(Params) {
    console.log(Params);
    MCI_EventAdapter.EventProcessor("onclick", Params);
    //SendPostCmd(Params);
}

//打开设备面板
function openDevicePanel(deviceName) {
    var device = null;
    //检测是否存在相同配置
    for (var num in devicePanelValuedefine) {
        if (devicePanelValuedefine[num].deviceName == deviceName) {
            device = devicePanelValuedefine[num];
        }
    }
    //不存在则去数据库查找
    if (device == null) {
        device = selectInfo(deviceName);
    }
    //空值判断
    if (typeof (device.deviceName) != 'undefined') {
        //创建控制面板
        createDevicePanel(device);
    }
    //Do选项绑定点击事件
    $("[name='Storage']").bind("click", function () {
        if ($(this).prop("checked")) {
            var r = $(this).parent(".RadioStyle");
            $(r).children("input").prop("checked", false);
            $(r).children("label").removeAttr("class");
            $(this).prop("checked", true);
            var id = $(this).prop("id");
            $("[for=" + id + "]").addClass("act");
        } else {
            var r = $(this).parent(".RadioStyle");
            $(r).children("input").prop("checked", false);
            $(r).children("label").removeAttr("class");
        }
        var btn = $(this).siblings("button");
        var flag = false;
        var inputs = $(btn).siblings("input");
        $.each(inputs, function (index, domEle) {
            if (domEle.checked) {
                flag = true;
            }
        })
        if (flag) {
            btn.prop("disabled", false);
        } else {
            btn.prop("disabled", "disabled");

        }
    });

    //LO输入框选项绑定点击事件，弹出软键盘
    $("[name='LOInput']").bind("click", function () {
        //普遍电脑
        MCI_KeyBoardAdapter.ShowKeyBoard("osk.exe");
        //触摸屏
        //MCI_KeyBoardAdapter.ShowKeyBoard("C:\\Program Files\\Common Files\\Microsoft Shared\\ink\\tabtip.exe");
        /*
		//备用方案
		var senddata='osk.exe';//程序名称
		var url='http://127.0.0.1:8089/v1/startexe';//url地址
		var sendType='application/json';//数据类型
		
        console.log('调用软键盘');
		$.ajax({
		  type: 'POST',
		  url: url,
		  data: senddata,
		  dataType: sendType,
		  timeout : 1000, //超时时间设置，单位毫秒
		  success: function (data) {
			}
		});
		*/
    });
}

//实时数据刷新
function upDateDeviceInTable() {
    for (var i in devicePanelList) {
        var deviceName = devicePanelList[i];
        //检测对象是否存在
        if (!$('#' + deviceName + '_In')[0]) {
            devicePanelList.splice(i, deviceName.length);
        } else {
            //获取实时数据
            //var deviceValue = GetRTDevInfo(deviceName.replaceAll('_', '/'));
            $.ajax({
                contentType: 'application/json',
                url: WEBAPIURL + '/api/rt',
                type: 'post',
                data: '{"DeviceName":["' + deviceName.replaceAll('_', '/') + '"]}',
                timeout: 5000,
                success: function (data, status) {
                    var jsonData = JSON.parse(data)[0];
                    if (typeof (jsonData.points) != 'undefined') {
                        //表格数据
                        var tableData = $('#' + deviceName + '_In').bootstrapTable('getData');
                        //实时数据
                        var points = jsonData.points
                        //循环解析
                        for (var rownum in tableData) {
                            for (var pointnum in points) {
                                if (tableData[rownum].code == points[pointnum].point) {
                                    //获取对应的实时数值
                                    var pointCode = points[pointnum].point;
                                    var pointType = points[pointnum].ptype;
                                    var pointValue = points[pointnum].value;
                                    //翻译数值
                                    for (var valuenum in devicePanelValuedefine) {
                                        if (devicePanelValuedefine[valuenum].deviceName == deviceName) {
                                            if (pointType == 'DI') {
                                                //翻译di
                                                if (devicePanelValuedefine[valuenum].di != null) {
                                                    pointValue = explain_di(pointCode, pointValue, devicePanelValuedefine[valuenum].di);
                                                }

                                            } else if (pointType == 'AI') {
                                                //翻译ai
                                                if (devicePanelValuedefine[valuenum].ai != null) {
                                                    pointValue = explain_ai(pointCode, pointValue, devicePanelValuedefine[valuenum].ai);
                                                }
                                            } else if (pointType == 'EI') {
                                                //翻译ei
                                                if (devicePanelValuedefine[valuenum].ei != null) {
                                                    pointValue = explain_ei(pointCode, pointValue, devicePanelValuedefine[valuenum].ei);
                                                }
                                            } else if (pointType == 'LI') {
                                                //翻译li
                                                if (devicePanelValuedefine[valuenum].li != null) {
                                                    pointValue = explain_li(pointCode, pointValue, devicePanelValuedefine[valuenum].li);
                                                }
                                            }
                                            //更新界面值
                                            if (tableData[rownum].value != pointValue) {
                                                $('#' + deviceName + '_In').bootstrapTable('updateCell', {
                                                    index: rownum,
                                                    field: 'value',
                                                    value: pointValue
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}

//数据查询
function selectInfo(deviceName) {
    var devicename = deviceName.replaceAll('_', '/');
    var res = {};
    var sql = "select d.Label,d.Location,dt.DeviceTypeCode,dt.DeviceTypeDesc,a.AreaDesc,dtp.PointType,dtp.PointCode,dtp.PointDesc" +
        " from mci_devicetypepoint dtp" +
        " inner join mci_devicetype dt on dtp.DeviceTypeId = dt.DeviceTypeId" +
        " inner join mci_device d on dt.DeviceTypeId = d.DeviceTypeId" +
        " inner join mci_area a on d.AreaId = a.AreaId" +
        " inner join mci_subsystem s on dt.SubSystemId = s.SubSystemId" +
        " where a.AreaCode = substring_index('" + devicename + "','/',1) " +
        " and s.SubSystemCode = substring_index(substring_index('" + devicename + "','/',2),'/',-1)" +
        " and dt.DeviceTypeCode = substring_index(substring_index('" + devicename + "','/',3),'/',-1)" +
        " and d.DeviceCode = substring_index('" + devicename + "','/',-1)";
    var devicePoint = GetSQLDataSet(sql);

    if (typeof (devicePoint.results) != 'undefined') {
        var points = devicePoint.results[0].series[0].values;
        var label = points[0][0];
        var location = points[0][1];
        var deviceTypeCode = points[0][2];
        var deviceTypeDesc = points[0][3];
        var areaDesc = points[0][4];
        //输入配置
        var deviceDI = GetSQLDataSet("Select * From mci_v_pvd_di_valuedefine Where DeviceTypeCode='" + deviceTypeCode + "'");
        var deviceAI = GetSQLDataSet("Select * From mci_v_pvd_ai_limit Where DeviceTypeCode='" + deviceTypeCode + "'");
        var deviceEI = GetSQLDataSet("Select * From mci_v_pvd_ei_valuedefine Where DeviceTypeCode='" + deviceTypeCode + "'");
        var deviceLI = GetSQLDataSet("Select * From mci_v_pvd_li_limit Where DeviceTypeCode='" + deviceTypeCode + "'");
        //输出配置
        var deviceDO = GetSQLDataSet("Select * From mci_v_pvd_do_valuedefine Where DeviceTypeCode='" + deviceTypeCode + "'");
        var deviceAO = GetSQLDataSet("Select * From mci_v_pvd_ao_limit Where DeviceTypeCode='" + deviceTypeCode + "'");
        var deviceEO = GetSQLDataSet("Select * From mci_v_pvd_eo_valuedefine Where DeviceTypeCode='" + deviceTypeCode + "'");
        var deviceLO = GetSQLDataSet("Select * From mci_v_pvd_lo_limit Where DeviceTypeCode='" + deviceTypeCode + "'");
        //输入输出列表
        var diList = null;
        var aiList = null;
        var eiList = null;
        var liList = null;
        var doList = null;
        var aoList = null;
        var eoList = null;
        var loList = null;

        //空值判断
        if (typeof (deviceDI.results) != 'undefined') {
            diList = deviceDI.results[0].series[0].values;
        }
        if (typeof (deviceAI.results) != 'undefined') {
            aiList = deviceAI.results[0].series[0].values;
        }
        if (typeof (deviceEI.results) != 'undefined') {
            eiList = deviceEI.results[0].series[0].values;
        }
        if (typeof (deviceLI.results) != 'undefined') {
            liList = deviceLI.results[0].series[0].values;
        }
        if (typeof (deviceDO.results) != 'undefined') {
            doList = deviceDO.results[0].series[0].values;
        }
        if (typeof (deviceAO.results) != 'undefined') {
            aoList = deviceAO.results[0].series[0].values;
        }
        if (typeof (deviceEO.results) != 'undefined') {
            eoList = deviceEO.results[0].series[0].values;
        }
        if (typeof (deviceLO.results) != 'undefined') {
            loList = deviceLO.results[0].series[0].values;
        }
        //组合数据
        var feedbackList = [];
        var commandList = [];
        for (var i in points) {
            if (points[i][5] == 'DI' || points[i][5] == 'AI' || points[i][5] == 'EI' || points[i][5] == 'LI' ||
                points[i][5] == 'VDI' || points[i][5] == 'VAI' || points[i][5] == 'VEI' || points[i][5] == 'VLI') {
                var row = {};
                row['code'] = points[i][6];
                row['point'] = points[i][7];
                row['type'] = points[i][5];
                row['value'] = '';
                feedbackList.push(row);
            } else {
                var row = {};
                row['device'] = deviceName;
                row['code'] = points[i][6];
                row['point'] = points[i][7];
                row['type'] = points[i][5];
                row['value'] = '';
                commandList.push(row);
            }
        }
        //设备名
        res['deviceName'] = deviceName;
        //设备区域
        res['areaDesc'] = areaDesc;
        //设备类
        res['deviceTypeDesc'] = deviceTypeDesc;
        //设备标签
        res['label'] = label;
        //设备所在地
        res['location'] = location;
        //设备输入列表
        res['feedbackList'] = feedbackList;
        //设备输出列表
        res['commandList'] = commandList;
        //设备di
        res['di'] = diList;
        //设备ai
        res['ai'] = aiList;
        //设备ei
        res['ei'] = eiList;
        //设备li
        res['li'] = liList;
        //设备do
        res['do'] = doList;
        //设备ao
        res['ao'] = aoList;
        //设备eo
        res['eo'] = eoList;
        //设备lo
        res['lo'] = loList;
        //存储
        devicePanelValuedefine.push(res);
    }
    return res;
}

//表格构建
function createDevicePanel(device) {
    //生成控制面板
    $.Pop(DevicePanel, {
        Title: device.deviceTypeDesc + '(' + device.label + ')',
        DeviceName: device.deviceName,
        Animation: 'layer-spread',
        BoxBg: false
    })
    //替换显示内容
    $('#AreaDesc').text(device.areaDesc).removeAttr("id");
    $('#Location').text(device.location).removeAttr("id");
    $('#Tab1').attr('href', '#' + device.deviceName + '_TabContentIn').attr('id', device.deviceName + '_TabIn');
    $('#Tab2').attr('href', '#' + device.deviceName + '_TabContentOut').attr('id', device.deviceName + '_TabOut');
    $('#TabContents').attr('id', device.deviceName + '_TabContents');
    $('#TabContent1').attr('id', device.deviceName + '_TabContentIn');
    $('#TabContent2').attr('id', device.deviceName + '_TabContentOut');
    $('#Table1').attr('id', device.deviceName + '_In');
    $('#Table2').attr('id', device.deviceName + '_Out');
    //生成表格
    $('#' + device.deviceName + '_In').bootstrapTable({
        striped: true, //是否显示行间隔色
        height: 200, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "code", //每一行的唯一标识，一般为主键列
        columns: [{
            field: 'code',
            title: '编码',
            visible: false
        }, {
            field: 'point',
            title: '属性点'
        }, {
            field: 'type',
            title: '类型'
        }, {
            field: 'value',
            title: '数值'
        }]
    }).bootstrapTable('load', device.feedbackList);
    $('#' + device.deviceName + '_Out').bootstrapTable({
        striped: true, //是否显示行间隔色
        height: 200, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "code", //每一行的唯一标识，一般为主键列
        columns: [{
            field: 'device',
            title: '设备',
            visible: false
        }, {
            field: 'code',
            title: '编码',
            visible: false
        }, {
            field: 'point',
            title: '控制点',
            valign: 'middle',
        }, {
            field: 'type',
            title: '类型',
            valign: 'middle'
        }, {
            field: 'value',
            title: '操作',
            valign: 'middle',
            events: {
                'click .commandBtn': function (e, value, row, index) {
                    var CommandString = {};
                    var com = [];
                    var comrow = {};
                    comrow['devname'] = row.device.replaceAll('_', '/');
                    comrow['ctrl'] = row.code;
                    if (row.type == 'DO') {
                        var i = $(this).siblings("input");
                        $.each(i, function (index, domEle) {
                            if (domEle.checked) {
                                comrow['value'] = domEle.value;
                            }
                        })
                    } else {
                        comrow['value'] = $('#' + row.device + '_' + row.code).val();
                    }
                    comrow['timeout'] = '15';
                    comrow['sessionid'] = MCI_UserAdapter.SessionId();
                    comrow['operationtype'] = 'mci_ctrl';
                    com.push(comrow);
                    //组成控制命令json
                    CommandString['ctrls'] = com;
                    console.log(JSON.stringify(CommandString));
                    //控制命令下发
                    SendPostCmd(JSON.stringify(CommandString));
                }
            },
            formatter: function (value, row, index) {
                var strHtml;
                if (row.type == 'DO') {
                    strHtml = createOption_do(row, device.do);
                } else if (row.type == 'AO') {
                    strHtml = createOption_ao(row, device.ao);
                } else if (row.type == 'EO') {
                    strHtml = createOption_eo(row, device.eo);
                } else if (row.type == 'LO') {
                    strHtml = createOption_lo(row, device.lo);
                }

                return strHtml;
            }
        }],
    }).bootstrapTable('load', device.commandList);
    //添加刷新列表
    devicePanelList.push(device.deviceName);

}

//翻译DI数值
function explain_di(code, value, list) {
    var res = value;
    for (var i in list) {
        if (list[i][1] == code && list[i][3] == value) {
            res = list[i][4];
        }
    }
    return res;
}

//翻译AI数值
function explain_ai(code, value, list) {
    var res = toNonExponential(value);
    return res;
}

//翻译EI数值
function explain_ei(code, value, list) {
    var res = value;
    for (var i in list) {
        if (list[i][1] == code && list[i][3] == value) {
            res = list[i][4];
        }
    }
    return res;
}

//翻译LI数值
function explain_li(code, value, list) {
    var res = toNonExponential(value);
    return res;
}

//将科学计数法转成普通数，并保留2位小数
function toNonExponential(nume) {
    var num = new Number(nume);
    return num.toFixed(2);
}

//DO选项生成
function createOption_do(row, list) {
    var html = "<div class='RadioStyle'>";
    var device = row.device;
    var code = row.code;
    if (list) {
        for (var i in list) {
            if (list[i][1] == code && list[i][4] != '@disable@') {
                html +=
                    "<input type='checkbox' value='" + list[i][3] + "' name='Storage' id='" + device + '_' + code + i + "' />" +
                    "<label style='font-weight:normal' for='" + device + '_' + code + i + "'>" + list[i][4] + "</label>";
            }
        }
        html +=
            "<button class='commandBtn btn btn-primary' type='button' disabled='disabled'style='float:right' >&nbsp;下发&nbsp;</button>" +
            "</div>";
    }
    return html;
}

//AO选项生成
function createOption_ao(row, list) {
    var html;
    var device = row.device;
    var code = row.code;
    if (list) {
        var option;
        for (var i in list) {
            if (list[i][1] == code) {
                option = list[i];
            }
        }

        html = "<div class='input-group'>" +
            "<input name='LOInput' id='" + device + '_' + code + "' type='text' class='form-control'>" +
            "<span class='input-group-addon'>" + option[7] + "</span>" +
            "<span class='input-group-btn'>" +
            "<button class='commandBtn btn btn-primary' type='button'>&nbsp;下发&nbsp;</button>" +
            "</span>" +
            "</div>";
    }
    return html;
}

//EO选项生成
function createOption_eo(row, list) {
    var html;
    var device = row.device;
    var code = row.code;
    if (list) {
        var option;
        for (var i in list) {
            if (list[i][1] == code) {
                option += "<option value='" + list[i][3] + "'>" + list[i][4] + "</option>"
            }
        }
        html = "<div class='input-group'>" +
            "<select id='" + device + '_' + code + "' class='form-control'>" +
            option +
            "</select>" +
            "<span class='input-group-btn'>" +
            "<button class='commandBtn btn btn-primary' type='button'>&nbsp;下发&nbsp;</button>" +
            "</span>" +
            "</div>";
    }
    return html;
}

//LO选项生成
function createOption_lo(row, list) {
    var html;
    var device = row.device;
    var code = row.code;
    if (list) {
        var option;
        for (var i in list) {
            if (list[i][1] == code) {
                option = list[i];
            }
        }
        html = "<div class='input-group'>" +
            "<input name='LOInput' id='" + device + '_' + code + "' type='text' class='form-control'>" +
            "<span class='input-group-addon'>" + option[7] + "</span>" +
            "<span class='input-group-btn'>" +
            "<button class='commandBtn btn btn-primary' type='button'>&nbsp;下发&nbsp;</button>" +
            "</span>" +
            "</div>";
    }
    return html;
}

//关闭控制面板
function closeDevicePanel(BoxId) {
    $("#" + BoxId).removeClass("showAlert");
    $("#" + BoxId).addClass("hideAlert");
    if ($("#" + BoxId + "bg").length > 0) {
        $("#" + BoxId + "bg").fadeOut(400, function () {
            $(this).remove()
        })
    }
    setTimeout(function () {
        $("#" + BoxId).remove();
    }, 400);

}

//获取设备面板
function getDevicePanel() {
    window.DevicePanel = '';
    var url = '../Public/Addon/DevicePanel.html';
    var panel = '获取设备面板失败';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html',
        timeout: 1000,
        cache: false,
        error: function (html) {
            console.log(url + '获取设备面板失败');
        },
        success: function (html) {
            for (var i = 0; i < $(html).length; i++) {
                var name = $(html)[i].nodeName;
                if (name == 'DIV') {
                    DevicePanel += $(html)[i].outerHTML;
                }
            }
            console.log(url + '获取设备面板成功');
        }
    });
    return panel;
}

//获取svg
function getSvg(filePath, id) {
    console.log(filePath);
    const xhrFile = new XMLHttpRequest();
    xhrFile.open("GET", filePath, true);
    xhrFile.onload = function () {
        const allText = xhrFile.response;
        // console.log(allText);
        var xmobj = $.parseXML(allText);
        // console.log($(xmobj).find("svg").children());
        $('#' + id).append($(xmobj).find("svg").children());
        console.log($('#' + 'defs18042'));
    };
    console.log('加载结束');
    xhrFile.send();
}

//获取use的id
getUseId()
function getUseId() {
    let usename = document.getElementsByTagName('use')
    console.log(usename);
    let useIdArr = [];
    for (let i = 0; i < usename.length; i++) {
        let nodeValue = usename[i].attributes[0].nodeValue;
        console.log(usename[i].attributes[0].nodeValue);
        useIdArr.push(nodeValue)
    }
    console.log(useIdArr);
    for (let i = 0; i < useIdArr.length; i++) {
        // let pid = useIdArr[i].indexOf('.')
        // console.log(pid);
        // if (pid > 0) {
        //     let useId = useIdArr[i].substring(0, pid);
        //     console.log(global_json_objectmap);
        //     console.log(useId);
        //     for(let i = 0 ; i < global_json_objectmap.length; i++) {
        //         if(global_json_objectmap[i].dommap.type_g.useid[0] == useId) {
        //             changeSvg()
        //         }
        //     }
        // } else {
        //     console.log(global_json_objectmap);
        //     console.log(useIdArr[i]);
        // }
        console.log(useIdArr[i]);
        if(useIdArr[i] != 'use11578.element.1' && useIdArr[i] != 'use12044.element.1' && useIdArr[i] != 'use12400') {
            
            changeSvg(useIdArr[i])
        }

    }
}
// 切换svg
// changeSvg()

function changeSvg(useid,symid) {
    var SVG_XLINK = "http://www.w3.org/1999/xlink";
    // var dev = document.getElementById("use12172.element.1")
    var dev = document.getElementById(useid)
    setInterval(() => {
        let rid = Math.random()
        console.log(rid);
        if (rid * 10 > 5) {
            dev.setAttributeNS(SVG_XLINK, "xlink:href", "#" + '__YNDW_SHWS__g31259');
        } else {
            //__YNDW_SHWS__g70590-3
            dev.setAttributeNS(SVG_XLINK, "xlink:href", "#" + '__YNDW_SHWS__g70590-3');
        }
    }, 3000);

}

//系统控件
function MCI_EnterEvent(devicename, paramin) {
    if (event.which == 13) {
        if (devicename != '') {
            var value = event.target.value;
            if (value != '') {
                if (confirm("是否确认下发" + value + "至" + devicename + "设备吗？")) {
                    var CommandString = {};
                    var com = [];
                    var comrow = {};
                    comrow['devname'] = devicename;
                    comrow['ctrl'] = paramin;
                    comrow['value'] = event.target.value;
                    comrow['timeout'] = '15';
                    comrow['sessionid'] = MCI_UserAdapter.SessionId();
                    com.push(comrow);
                    //组成控制命令json
                    CommandString['event'] = 'onclick';
                    CommandString['action'] = 'control';
                    CommandString['ctrls'] = com;
                    console.log(JSON.stringify(CommandString));
                    //控制命令下发
                    SendPostCmd(JSON.stringify(CommandString));
                }
            }
        }
    }
}

//--------------------------------------------《MQTT控制反馈-开始》--------------------------------------------
function InitMQCtrl() {
    // Create a client instance
    clientCtrl = new Paho.MQTT.Client(MQ_IP, Number(MQ_Port), "MCI_HMI_CLIENTCTRL_" + Date.now());

    // set callback handlers
    clientCtrl.onConnectionLost = onConnectionLostCtrl;
    clientCtrl.onMessageArrived = onMessageArrivedCtrl;

    // connect the client
    clientCtrl.connect({
        onSuccess: onConnectCtrl
    });
}

// called when the client connects
function onConnectCtrl() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("MQTT onConnectCtrl");
    clientCtrl.subscribe("Controlserver_Feedback");
}

// called when the client loses its connection
function onConnectionLostCtrl(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("MQTT onConnectionLostCtrl:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrivedCtrl(message) {
    //console.log("MQTT onMessageArrived");
    var sid = MCI_UserAdapter.SessionId();

    var jsonFeedback = JSON.parse(message.payloadString);
    var feedback = jsonFeedback.ctrls;
    for (var index = 0; index < feedback.length; index++) {
        var fb = feedback[index];
        if (fb.sessionid == sid) {
            $(".box-button").text("控制反馈：" + fb.status);
        }
    }
}

//--------------------------------------------《MQTT控制反馈-结束》--------------------------------------------