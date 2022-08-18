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
            prop: "time",
            label: "时间",
        },
        {
            type: "prop",
            prop: "date",
            label: "日期",
        },
        {
            type: "prop",
            prop: "name",
            label: "名字",
        },
        {
            type: "prop",
            prop: "address",
            label: "地址",
        },
        {
            type: "input",
            label: "输入框",
            width: "180",
            inputValue: "value1",
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
}