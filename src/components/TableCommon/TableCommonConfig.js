export default {
    tableConfig1: [{
            type: "index",
            label: "排序"
        },
        {
            type: "selection",
        },
        {
            type: "prop",
            prop: "zdmc",
            label: "站点名称",
        },
        {
            type: "prop",
            prop: "time",
            label: "日期",
        },
        {
            type: "prop",
            prop: "sbmc",
            label: "设备名称",
        },
        {
            type: "prop",
            prop: "sjnr",
            label: "事件内容",
        },
        {
            type: "prop",
            prop: "gjjb",
            label: "告警级别",
        },
        {
            type: "prop",
            prop: "sszxt",
            label: "所属子系统",
        },
        {
            type: "prop",
            prop: "cljg",
            label: "处理结果",
        },
        {
            type: "button",
            label: "操作",
            width: "200",
            name: "按钮",
            name1: "按钮1",
            methods: {
                isShow: true,
                handleEdit(index, row, column) {
                    console.log(index, row, column);
                    console.log('按钮1');
                },
                isShow1: true,
                handleEdit1(index, row, column) {
                    console.log(index, row, column);
                    console.log('按钮2');
                },
            },
        },
    ],
    tableConfig2: [{
            type: "index",
            label: "排序"
        },
        {
            type: "prop",
            prop: "zsd",
            label: "指示灯",
            width: "100"
        },
        {
            type: "prop",
            prop: "zcszt",
            label: "正常时状态",
            width: "100"
        },
        {
            type: "prop",
            prop: "sm",
            label: "说明",
        },
    ],
    tableConfig3: [{
        type: "index",
        label: "排序"
    }, {
        type: "prop",
        prop: "dz",
        label: "地址",
        // width: "100"
    }, {
        type: "prop",
        prop: "sbmc",
        label: "设备名称",
        // width: "100"
    }, {
        type: "prop",
        prop: "sbzt",
        label: "设备状态",
        // width: "100"
    }, {
        type: "prop",
        prop: "dqzt",
        label: "当前状态",
        // width: "100"
    }, {
        type: "button",
        label: "操作区",
        // width: "200",
        name: "确定",
        methods: {
            isShow: true,
            handleEdit(index, row, column) {
                console.log(index, row, column);
                console.log('按钮1');
            },
            isShow1: false,
        },
    }, ],
    tableConfig4: [{
        type: "index",
        label: "排序"
    }, {
        type: "prop",
        prop: "sbmc",
        label: "设备名称",
        // width: "100"
    }, {
        type: "prop",
        prop: "sbzt",
        label: "设备状态",
        // width: "100"
    }, {
        type: "prop",
        prop: "dqzt",
        label: "当前状态",
        // width: "100"
    }, {
        type: "button",
        label: "操作区",
        // width: "100",
        name: "确定",
        methods: {
            isShow: true,
            handleEdit(index, row, column) {
                console.log(index, row, column);
                console.log('按钮1');
            },
            isShow1: false,
        },
    }, ],
    tableConfig5: [{
        type: "index",
        label: "排序"
    }, {
        type: "prop",
        prop: "sbmc",
        label: "设备名称",
        // width: "100"
    }, {
        type: "prop",
        prop: "sbzt",
        label: "设备状态",
        // width: "100"
    }, {
        type: "prop",
        prop: "dqzt",
        label: "当前状态",
        // width: "100"
    }, {
        type: "button",
        label: "操作区",
        // width: "100",
        name: "开启",
        name1: "关闭",
        methods: {
            isShow: true,
            handleEdit(index, row, column) {
                console.log(index, row, column);
                // console.log('按钮1');
                alert('开启')
            },
            isShow1: true,
            handleEdit1(index, row, column) {
                console.log(index, row, column);
                // console.log('按钮2');
                alert('关闭')
            },
        },
    }, ],
    tableConfig6: [{
        type: "index",
        label: "排序"
    }, {
        type: "prop",
        prop: "sbmc",
        label: "设备名称",
        // width: "100"
    }, {
        type: "prop",
        prop: "xhgg",
        label: "规格型号",
        // width: "100"
    }, {
        type: "prop",
        prop: "pzdd",
        label: "配置地点",
        // width: "100"
    }, {
        type: "prop",
        prop: "sccj",
        label: "生产厂家",
        // width: "100"
    }, ],
    tableConfig7: [{
        type: "index",
        label: "排序"
    }, {
        type: "prop",
        prop: "sbmc",
        label: "所在区域",
        // width: "100"
    }, {
        type: "prop",
        prop: "sbzt",
        label: "配置地点",
        // width: "100"
    }, {
        type: "prop",
        prop: "dqzt",
        label: "防火门",
        // width: "100"
    }, {
        type: "prop",
        prop: "dqzt",
        label: "疏散指示",
        // width: "100"
    }, {
        type: "prop",
        prop: "dqzt",
        label: "应急照明",
        // width: "100"
    },{
        type: "button",
        label: "操作区",
        // width: "100",
        name: "开启",
        // name1: "关闭",
        methods: {
            isShow: true,
            handleEdit(index, row, column) {
                console.log(index, row, column);
                // console.log('按钮1');
                alert('开启')
            },
            isShow1: false,
        },
    },],
}