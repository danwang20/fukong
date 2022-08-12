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
}