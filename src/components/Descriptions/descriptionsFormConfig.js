export default {
    descriptionsConfig1: [{
            type: "input",
            label: "输入框1:",
            value: "",
            inputWidth: 150,
        },
        {
            type: "text",
            label: "信息:",
            mess: "123",
            textWidth: 150,
        },
        // {
        //     type: "empty",
        //     label: "",
        //     mess: "",
        //     emptyWidth: 150,
        // },
        {
            type: "button",
            buttonWidth: 200,
            label: "按钮1:",
            buttonArr: [{
                buttonName: "按钮",
                linkMethods() {
                    console.log('点击了按钮');
                }
            }],

        },
        {
            type: "state",
            label: "状态1:",
            networkStatus: 0,
        },
    ],
    descriptionsConfig2: [{
            type: "input",
            label: "输入框2:",
            value: "",
            inputWidth: 150,
        },
        {
            type: "text",
            label: "信息2:",
            mess: "456",
            textWidth: 150,
        },
        // {
        //     type: "empty",
        //     label: "",
        //     mess: "",
        //     emptyWidth: 150,
        // },
        {
            type: "button",
            label: "按钮2:",
            buttonWidth: 200,
            buttonArr: [{
                buttonName: "按钮",
                linkMethods() {
                    console.log('点击了按钮');
                }
            }],
        },
        {
            type: "state",
            label: "状态2:",
            networkStatus: 0,
        },
    ],
    descriptionsConfig3: [{
            title: "message1"
        }, {
            type: "text",
            label: "信息1:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            label: "信息2:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            label: "信息3:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            label: "信息4:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            label: "信息5:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            label: "信息6:",
            mess: "456789",
            textWidth: 400,
        }, {
            type: "text",
            label: "信息7:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            label: "信息8:",
            mess: "456789",
            textWidth: 150,
        },

    ],
    descriptionsConfig4: [{
        type: "text",
        label: "名称:",
        mess: "火灾报警系统主机",
        textWidth: 200,
    }, {
        type: "text",
        label: "产品型号:",
        mess: "JB-QW-QW-12121",
        textWidth: 200,
    }, {
        type: "text",
        label: "厂家:",
        mess: "xxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        label: "投运日期:",
        mess: "2022-0812",
        textWidth: 200,
    }, {
        type: "text",
        label: "电源电压:",
        mess: "220V AC",
        textWidth: 200,
    }, {
        type: "text",
        label: "频率:",
        mess: "50hz",
        textWidth: 200,
    }, {
        type: "text",
        label: "输出电压:",
        mess: "24V DC",
        textWidth: 200,
    }, {
        type: "text",
        label: "输出电流:",
        mess: "5A",
        textWidth: 200,
    }, {
        type: "text",
        label: "环境温度:",
        mess: "5℃ ~ 30℃",
        textWidth: 200,
    }, {
        type: "text",
        label: "相对湿度:",
        mess: "5% ~ 95%",
        textWidth: 200,
    }, {
        type: "text",
        label: "维保单位:",
        mess: "xxxxxxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        label: "联系电话:",
        mess: "155xxxxxxxx",
        textWidth: 200,
    }, ],
    descriptionsConfig5: [
        // {
        //     title: "运行信息"
        // },
        {
            type: "text",
            key: "bjzt",
            label: "设备状态:",
            mess: "xxxxxxxx",
            textWidth: 200,
        },
        {
            type: "text",
            key: "txzt",
            label: "通讯状态:",
            mess: "xxxxxxxx",
            textWidth: 200,
        },
        {
            type: "text",
            key: "dyzt",
            label: "电源状态:",
            mess: "xxxxxxxx",
            textWidth: 200,
        },
        {
            type: "button",
            label: "报警主机:",
            buttonWidth: 200,
            buttonArr: [{
                    buttonName: "报警复位",
                    linkMethods() {
                        console.log("点击了: 报警复位");
                    },
                },
                {
                    buttonName: "报警恢复",
                    linkMethods() {
                        console.log("点击了: 报警恢复");
                    },
                },
            ]
        },
    ],
    descriptionsConfig6: [{
        type: "text",
        label: "名称:",
        mess: "火灾报警系统主机",
        textWidth: 200,
    }, {
        type: "text",
        label: "产品型号:",
        mess: "JB-QW-QW-12121",
        textWidth: 200,
    }, {
        type: "text",
        label: "厂家:",
        mess: "xxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        label: "投运日期:",
        mess: "2022-0812",
        textWidth: 200,
    }, {
        type: "text",
        label: "电源电压:",
        mess: "220V AC",
        textWidth: 200,
    }, {
        type: "text",
        label: "频率:",
        mess: "50hz",
        textWidth: 200,
    }, {
        type: "text",
        label: "输出电压:",
        mess: "24V DC",
        textWidth: 200,
    }, {
        type: "text",
        label: "输出电流:",
        mess: "5A",
        textWidth: 200,
    }, {
        type: "text",
        label: "环境温度:",
        mess: "5℃ ~ 30℃",
        textWidth: 200,
    }, {
        type: "text",
        label: "相对湿度:",
        mess: "5% ~ 95%",
        textWidth: 200,
    }, {
        type: "text",
        label: "维保单位:",
        mess: "xxxxxxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        label: "联系电话:",
        mess: "155xxxxxxxx",
        textWidth: 200,
    }, ],
    descriptionsConfig7: [{
        type: "text",
        label: "名称:",
        mess: "火灾报警系统主机",
        textWidth: 200,
    }, {
        type: "text",
        label: "产品型号:",
        mess: "JB-QW-QW-12121",
        textWidth: 200,
    }, {
        type: "text",
        label: "厂家:",
        mess: "xxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        label: "投运日期:",
        mess: "2022-0812",
        textWidth: 200,
    }, {
        type: "text",
        label: "电源电压:",
        mess: "220V AC",
        textWidth: 200,
    }, {
        type: "text",
        label: "频率:",
        mess: "50hz",
        textWidth: 200,
    }, {
        type: "text",
        label: "输出电压:",
        mess: "24V DC",
        textWidth: 200,
    }, {
        type: "text",
        label: "输出电流:",
        mess: "5A",
        textWidth: 200,
    }, {
        type: "text",
        label: "环境温度:",
        mess: "5℃ ~ 30℃",
        textWidth: 200,
    }, {
        type: "text",
        label: "相对湿度:",
        mess: "5% ~ 95%",
        textWidth: 200,
    }, {
        type: "text",
        label: "维保单位:",
        mess: "xxxxxxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        label: "联系电话:",
        mess: "155xxxxxxxx",
        textWidth: 200,
    }, ],
    descriptionsConfig8: [{
        type: "text",
        label: "门禁控制器:",
        mess: "3个",
        textWidth: 200,
    },{
        type: "text",
        label: "门禁:",
        mess: "9个",
        textWidth: 200,
    },{
        type: "text",
        label: "电子围栏控制器:",
        mess: "5个",
        textWidth: 200,
    },{
        type: "text",
        label: "红外对射设备:",
        mess: "3个",
        textWidth: 200,
    },{
        type: "text",
        label: "红外双鉴设备:",
        mess: "11个",
        textWidth: 200,
    },],
    descriptionsConfig9: [{
        type: "text",
        label: "门禁控制器:",
        mess: "正常3个 异常0个",
        textWidth: 200,
    },{
        type: "text",
        label: "门禁:",
        mess: "正常3个 异常0个",
        textWidth: 200,
    },{
        type: "text",
        label: "电子围栏控制器:",
        mess: "正常5个 异常0个",
        textWidth: 200,
    },{
        type: "text",
        label: "红外对射设备:",
        mess: "正常3个 异常0个",
        textWidth: 200,
    },{
        type: "text",
        label: "红外双鉴设备:",
        mess: "正常11个 异常0个",
        textWidth: 200,
    },],
    descriptionsConfig10: [{
        type: "text",
        label: "变电站电子围栏控制器设备状态:",
        mess: "正常",
        textWidth: 200,
    },{
        type: "text",
        label: "变电站电子围栏控制器通讯状态:",
        mess: "正常",
        textWidth: 200,
    },{
        type: "text",
        label: "变电站大门红外对射设备状态:",
        mess: "正常",
        textWidth: 200,
    },],
}