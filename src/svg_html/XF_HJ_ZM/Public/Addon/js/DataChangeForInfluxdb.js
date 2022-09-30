var DataChangeForInfluxdb = {
//转换influxdb的json数据
    DataChange: function (json) {
        window.ERROR = null;
        window.tableData = [];
        var res = 0;
        if (json.results != null) {
            if (json.results[0].series != null) {
                if (json.results[0].series[0].columns != null) {
                    if (json.results[0].series[0].values != null) {
                        window.statementId = json.results[0].statement_id;
                        window.tableColumns = json.results[0].series[0].columns;
                        var tableList = json.results[0].series[0].values;
                        //循环历遍数据
                        for (var i in tableList) {
                            var tableRow = {};
                            var row = tableList[i];
                            //历遍列名
                            for (var j in tableColumns) {
                                tableRow[tableColumns[j]] = row[j];
                            }
                            //组成json
                            tableData.push(tableRow);
                            res = 1
                        }
                    } else {
                        res = 0
                        ERROR = "转换失败（找不到values）";
                    }
                } else {
                    res = 0
                    ERROR = "转换失败（找不到columns）";
                }
            } else {
                res = 0
                ERROR = "转换失败（找不到series）";
            }
        } else {
            res = 0
            ERROR = "转换失败（找不到results）";
        }
        return res;
    },

//获取表格数据
    getTableData: function () {
        return tableData;
    },

//获取错误码
    getErrorCode: function () {
        return ERROR;
    }
}