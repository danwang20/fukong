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
        {
            type: "empty",
            label: "",
            mess: "",
            emptyWidth: 150,
        },
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
        {
            type: "empty",
            label: "",
            mess: "",
            emptyWidth: 150,
        },
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
            key: 'date',
            label: "信息1:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            key: 'fengli',
            label: "信息2:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            key: 'fengxiang',
            label: "信息3:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            key: 'high',
            label: "信息4:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            key: 'low',
            label: "信息5:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            key: 'tip',
            label: "信息6:",
            mess: "456789",
            textWidth: 400,
        }, {
            type: "text",
            key: 'type',
            label: "信息7:",
            mess: "456789",
            textWidth: 150,
        }, {
            type: "text",
            key: 'week',
            label: "信息8:",
            mess: "456789",
            textWidth: 150,
        },

    ],
    descriptionsConfig4: [{
        title: "基本信息"
    }, {
        type: "text",
        key: 'date',
        label: "名称:",
        mess: "火灾报警系统主机",
        textWidth: 200,
    }, {
        type: "text",
        key: 'fengli',
        label: "产品型号:",
        mess: "JB-QW-QW-12121",
        textWidth: 200,
    }, {
        type: "text",
        key: 'fengxiang',
        label: "厂家:",
        mess: "xxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        key: 'high',
        label: "投运日期:",
        mess: "2022-0812",
        textWidth: 200,
    }, {
        type: "text",
        key: 'low',
        label: "电源电压:",
        mess: "220V AC",
        textWidth: 200,
    }, {
        type: "text",
        key: 'tip',
        label: "频率:",
        mess: "50hz",
        textWidth: 200,
    }, {
        type: "text",
        key: 'type',
        label: "输出电压:",
        mess: "24V DC",
        textWidth: 200,
    }, {
        type: "text",
        key: 'week',
        label: "输出电流:",
        mess: "5A",
        textWidth: 200,
    }, {
        type: "text",
        key: 'week',
        label: "环境温度:",
        mess: "5℃ ~ 30℃",
        textWidth: 200,
    }, {
        type: "text",
        key: 'week',
        label: "相对湿度:",
        mess: "5% ~ 95%",
        textWidth: 200,
    }, {
        type: "text",
        key: 'week',
        label: "维保单位:",
        mess: "xxxxxxxxxx公司",
        textWidth: 200,
    }, {
        type: "text",
        key: 'week',
        label: "联系电话:",
        mess: "155xxxxxxxx",
        textWidth: 200,
    }, ],
    descriptionsConfig5: [{
            title: "运行信息"
        }, {
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
        title: "火警信息"
    }, ],
    descriptionsConfig7: [{
        title: "异常设备"
    }, ],
}