//加载
$(function () {
    window.RESTFULIP = '';
    //高度设置
    var h = 500;
    //末端节点设置
    var maxLevel = 3;
    //组合
    var treeData = [
        {
            id: 'deviceList',
            level: 0,
            state: 'open',
            name: '设备列表',
            children: []
        }
    ];
    //数据读取
    $.ajax({
        type: "get",
        url: "../../../../../mci_config.xml",
        dataType: "xml",
        timeout: 1000,
        cache: false,
        success: function (xml) {
            $(xml).find("Restful").each(function (i) {
                let ip = $(this).children("Ip");
                let port = $(this).children("Port");
                RESTFULIP = ip.text() + ':' + port.text();
                //创建树形
                createViewer(h, maxLevel, treeData);
            });
        }
    });
    //初始数据查询
    var deviceList = [
        {
            id: 'grounp1',
            level: 1,
            state: 'close',
            name: '温湿度数据分析',
            children: [
                {
                    id: 'list1',
                    name: '车站1',
                    level: 2,
                    state: 'close',
                    columns: [
                        {
                            checkbox: true,
                        },
                        {
                            field: 'id',
                            title: '设备编码',
                            visible: false
                        }, {
                            field: 'device',
                            title: '设备名'
                        },
                        {
                            field: 'WD',
                            title: '温度'
                        },
                        {
                            field: 'SD',
                            title: '湿度'
                        }
                    ],
                    children: [
                        {
                            id: 'Z01_BAS_TH_1',
                            name: 'TH1',
                            device: '温湿度传感器(TH1)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_2',
                            name: 'TH2',
                            device: '温湿度传感器(TH2)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_3',
                            name: 'TH3',
                            device: '温湿度传感器(TH3)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_4',
                            name: 'TH4',
                            device: '温湿度传感器(TH4)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_5',
                            name: 'TH5',
                            device: '温湿度传感器(TH5)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_6',
                            name: 'TH6',
                            device: '温湿度传感器(TH6)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_7',
                            name: 'TH7',
                            device: '温湿度传感器(TH7)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_8',
                            name: 'TH8',
                            device: '温湿度传感器(TH8)',
                            deviceType: 'TH'
                        },
                        {
                            id: 'Z01_BAS_TH_10',
                            name: 'TH10',
                            device: '温湿度传感器(TH10)',
                            deviceType: 'TH'
                        }
                    ]
                }
            ]
        }
    ];
    treeData[0].children = deviceList;
    $('#DeviceTree').tree('loadData', treeData);
    //数据刷新
    window.devicePanelValuedefine = [];
    setInterval(function () {
        upDateDeviceViewerTable();
    }, 3000);
});

//创建视图
function createViewer(h, maxLevel, data) {
    //高度设置
    $('#DeviceTreePanl').css('height', h + 'px');
    $('#DeviceTreePanl').css('max-height', h + 'px');
    //创建树形
    $('#DeviceTree').tree({
        data: data,                           //显示数据
        autoOpen: 0,                          //默认打开第一级
        dragAndDrop: false,                   //节点拖放功能
        keyboardSupport: false,               //键盘支持
        selectable: false,                    //节点多选
        onCreateLi: function (node, $li, is_selected) {
            //$li.find('.jqtree-title').before('<span class="icon"></span>');
        }
    });
    //单击事件
    $('#DeviceTree').bind(
        'tree.click',
        function (e) {
            //小于末端节点数的节点根据当前状态打开或关闭节点
            var node = e.node;
            if (node.level < maxLevel) {
                if (node.state == 'close') {
                    $('#DeviceTree').tree('openNode', node);
                    node.state = 'open';
                } else if (node.state == 'open') {
                    $('#DeviceTree').tree('closeNode', node);
                    node.state = 'close';
                }
                //加载设备区域表格数据
                if (node.level == maxLevel - 1) {
                    loadDeviceTable(h, node);
                }
            }
        }
    );
    //创建表格
    $('#DeviceTable').bootstrapTable({height: h, toolbar: '#toolbar'});
    //按钮单击事件
    $('#charts').click(function () {
        //点位数据
        var tableColumns = $('#DeviceTable').bootstrapTable('getVisibleColumns');
        if (tableColumns != null) {
            for (var colnum in tableColumns) {
                if (tableColumns[colnum].checkbox == false && tableColumns[colnum].field != 'device') {
                    console.log(tableColumns[colnum].field);
                }
            }
        }
        //表格数据
        var tableData = $('#DeviceTable').bootstrapTable('getSelections');
        if (tableData != null) {
            for (var rownum in tableData) {
                console.log(tableData[rownum].id);
            }
        }

    });
}

//加载设备表格数据
function loadDeviceTable(h, list) {
    devicePanelValuedefine = [];
    var columns = list.columns;
    var devices = list.children;
    for (var i in devices) {
        var deviceName = devices[i].id;
        var deviceTypeCode = devices[i].deviceType;
        //输入列表
        var diList = null;
        var aiList = null;
        var eiList = null;
        $.ajax({
            contentType: 'application/json',
            url: 'http://' + RESTFULIP + '/api/data',
            type: 'post',
            data: '{"SQL":"Select * From mci_v_pvd_di_valuedefine Where DeviceTypeCode=\'' + deviceTypeCode + '\'"}',
            timeout: 5000,
            success: function (data, status) {
                if (typeof(data.results) != 'undefined') {
                    diList = JSON.parse(data).results[0].series[0].values;
                    $.ajax({
                        contentType: 'application/json',
                        url: 'http://' + RESTFULIP + '/api/data',
                        type: 'post',
                        data: '{"SQL":"Select * From mci_v_pvd_ai_limit Where DeviceTypeCode=\'' + deviceTypeCode + '\'"}',
                        timeout: 5000,
                        success: function (data, status) {
                            if (typeof(data.results) != 'undefined') {
                                aiList = JSON.parse(data).results[0].series[0].values;
                                $.ajax({
                                    contentType: 'application/json',
                                    url: 'http://' + RESTFULIP + '/api/data',
                                    type: 'post',
                                    data: '{"SQL":"Select * From mci_v_pvd_ei_valuedefine Where DeviceTypeCode=\'' + deviceTypeCode + '\'"}',
                                    timeout: 5000,
                                    success: function (data, status) {
                                        if (typeof(data.results) != 'undefined') {
                                            eiList = JSON.parse(data).results[0].series[0].values;
                                            //组成输入数组
                                            devicePanelValuedefine.push({
                                                "deviceName": deviceName,
                                                "di": diList,
                                                "ai": aiList,
                                                "ei": eiList
                                            });
                                        }
                                    },
                                    fail: function (err, status) {
                                        console.log(err);
                                    }
                                });
                            }
                        },
                        fail: function (err, status) {
                            console.log(err);
                        }
                    });
                }
            },
            fail: function (err, status) {
                console.log(err);
            }
        });
    }
    //添加列
    $('#DeviceTable').bootstrapTable('destroy');
    $('#DeviceTable').bootstrapTable({
        striped: true,                      //是否显示行间隔色
        height: h,                          //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        toolbar: '#toolbar',                //工具按钮用哪个容器
        columns: columns,
    });
    //添加设备
    $('#DeviceTable').bootstrapTable('load', devices);
}

//数据刷新
function upDateDeviceViewerTable() {
    //表格列数据
    var tableColumns = $('#DeviceTable').bootstrapTable('getVisibleColumns');
    //列不为空
    if (tableColumns != null) {
        //获取表格数据，组成设备串
        var tableData = $('#DeviceTable').bootstrapTable('getData');
        var deviceName = null;
        for (var rownum in tableData) {
            if (rownum == 0) {
                deviceName = tableData[rownum].id;
            } else {
                deviceName += ':' + tableData[rownum].id;
            }
        }
        //设备串不为空
        if (deviceName != null) {
            //获取实时数据
            $.ajax({
                contentType: 'application/json',
                url: 'http://' + RESTFULIP + '/api/rt',
                type: 'post',
                data: '{"DeviceName":"' + deviceName.replaceAll('_', '/') + '"}',
                timeout: 5000,
                success: function (data, status) {
                    for (var devicenum in data) {
                        //返回数值不为空
                        if (typeof(deviceValue[devicenum].points) != 'undefined') {
                            var devname = deviceValue[devicenum].devname;
                            var points = deviceValue[devicenum].points;
                            //依据列名查找实时数据
                            for (var colnum in tableColumns) {
                                if (tableColumns[colnum].checkbox == false && tableColumns[colnum].field != 'device') {
                                    for (var pointnum in points) {
                                        if (points[pointnum].point == tableColumns[colnum].field) {
                                            var pointCode = points[pointnum].point;
                                            var pointType = points[pointnum].ptype;
                                            var pointValue = points[pointnum].value;
                                            //翻译数值
                                            for (var valuenum in devicePanelValuedefine) {
                                                if (devicePanelValuedefine[valuenum].deviceName == devname) {
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
                                                    }
                                                    //查找对应行
                                                    for (var rownum in tableData) {
                                                        if (tableData[rownum].id == devname) {
                                                            //更新界面值
                                                            $('#DeviceTable').bootstrapTable('updateCell',
                                                                {
                                                                    index: rownum,
                                                                    field: tableColumns[colnum].field,
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
                        }
                    }
                },
                fail: function (err, status) {
                    console.log(err);
                }
            });
            for (var devicenum in deviceValue) {
                //返回数值不为空
                if (typeof(deviceValue[devicenum].points) != 'undefined') {
                    var devname = deviceValue[devicenum].devname;
                    var points = deviceValue[devicenum].points;
                    //依据列名查找实时数据
                    for (var colnum in tableColumns) {
                        if (tableColumns[colnum].checkbox == false && tableColumns[colnum].field != 'device') {
                            for (var pointnum in points) {
                                if (points[pointnum].point == tableColumns[colnum].field) {
                                    var pointCode = points[pointnum].point;
                                    var pointType = points[pointnum].ptype;
                                    var pointValue = points[pointnum].value;
                                    //翻译数值
                                    for (var valuenum in devicePanelValuedefine) {
                                        if (devicePanelValuedefine[valuenum].deviceName == devname) {
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
                                            }
                                            //查找对应行
                                            for (var rownum in tableData) {
                                                if (tableData[rownum].id == devname) {
                                                    //更新界面值
                                                    $('#DeviceTable').bootstrapTable('updateCell',
                                                        {
                                                            index: rownum,
                                                            field: tableColumns[colnum].field,
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
                }
            }
        }
    }
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
    var res = value;
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
