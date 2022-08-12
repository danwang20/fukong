 <template>
  <div class="cotent-box" style="height: 100%; display: flex">
    <section class="form-box">
      <FormItem :formItems="formItems" />
    </section>
    <section class="c-table">
      <TableCommon
        :columns="columns"
        :tableData="tableData"
        :flexHeight="tableCommonHeight"
        :tableMaxWidth="tableMaxWidth"
        :methods="tableFunction"
      />
    </section>
  </div>
</template>
 
 <script>
import FormItemsConfig from "../../components/FormItems/FormItemsConfig";
import TableCommonConfig from "../../components/TableCommon/TableCommonConfig";
import FormItem from "../../components/FormItems/FormItems.vue";
import TableCommon from "../../components/TableCommon/TableCommon.vue"; //DatePicker
export default {
  components: {
    FormItem,
    TableCommon,
  },
  data() {
    return {
      formItems: [
        {
          type: "select",
          configData: FormItemsConfig.select.selectConfig1,
          methods: {
            selectChange(data) {
              console.log("父: " + data);
              sessionStorage.setItem("FormSelect", data);
            },
          },
        },
        {
          type: "input",
          configData: FormItemsConfig.input.inputConfig1,
          methods: {
            inputChange(data) {
              console.log("父: " + JSON.stringify(data));
              sessionStorage.setItem("FormInput", data);
            },
          },
        },
        {
          type: "input",
          configData: FormItemsConfig.input.inputConfig2,
          methods: {
            inputChange(data) {
              console.log("父: " + JSON.stringify(data));
              sessionStorage.setItem("FormInput1", data);
            },
          },
        },
        {
          type: "datePicker",
          configData: FormItemsConfig.datepicker.datepickerConfig1,
          methods: {
            changeDatePicker(data) {
              console.log("父: " + JSON.stringify(data));
              console.log(data);
              sessionStorage.setItem("FormDatePicker", JSON.stringify(data));
            },
          },
        },
        // {
        //   type: "checkbox",
        //   configData: FormItemsConfig.checkbox.checkConfig1,
        //   methods: {
        //     handleCheckedChange(data) {
        //       console.log("父: " + data);
        //       console.log(data);
        //       sessionStorage.setItem("FormChecked", JSON.stringify(data));
        //     },
        //   },
        // },
        {
          type: "button",
          configData: FormItemsConfig.button.buttonConfig1,
          methods: {
            buttonClick() {
              console.log("父: 点击了按钮");
              let arr = {};
              console.log(arr);
            },
          },
        },
        {
          type: "button",
          configData: FormItemsConfig.button.buttonConfig2,
          methods: {
            buttonClick() {
              console.log("父: 点击了按钮");
              let arr = {};
              if (sessionStorage.getItem("FormSelect")) {
                arr.select = sessionStorage.getItem("FormSelect");
              }
              if (sessionStorage.getItem("FormInput")) {
                arr.input = sessionStorage.getItem("FormInput");
              }
              if (sessionStorage.getItem("FormInput1")) {
                arr.input1 = sessionStorage.getItem("FormInput1");
              }
              if (sessionStorage.getItem("FormDatePicker")) {
                arr.datepicker = JSON.parse(
                  sessionStorage.getItem("FormDatePicker")
                );
              }
              if (sessionStorage.getItem("FormChecked")) {
                arr.checkbox = JSON.parse(
                  sessionStorage.getItem("FormChecked")
                );
              }
              console.log(arr);
            },
          },
        },
      ],
      columns: TableCommonConfig.tableConfig1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2022-08-05",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003456",
        },
      ],
      tableFunction: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 2) {
            if (rowIndex === 0) {
              return {
                rowspan: 5,
                colspan: 1,
              };
            } else if (rowIndex === 5) {
              return {
                rowspan: 3,
                colspan: 1,
              };
            } else if (rowIndex === 8) {
              return {
                rowspan: 4,
                colspan: 1,
              };
            } else if (rowIndex === 12) {
              return {
                rowspan: 4,
                colspan: 1,
              };
            } else if (rowIndex === 16) {
              return {
                rowspan: 8,
                colspan: 1,
              };
            } else if (rowIndex === 24) {
              return {
                rowspan: 4,
                colspan: 1,
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              };
            }
          }
        },
        cellStyle({ row, column, rowIndex, columnIndex }) {
          // console.log(row, column, rowIndex, columnIndex);
          if (row.date == "2016-05-01" && column.label == "名字") {
            return "background-color: red !important;";
          }
          if (row.date == "2016-05-02" && column.label == "名字") {
            return "background-color: green !important;";
          }
          if (row.date == "2016-05-03" && column.label == "名字") {
            return "background-color: pink !important;";
          }
          if (row.date == "2016-05-04" && column.label == "名字") {
            return "background-color: orange !important;";
          }
        },
        handleEdit(index, row, column) {
          console.log(index, row, column);
        },
      },
      flexHeight: {
        formHeight: "",
        tableHeight: "",
      },
      tableMaxWidth: 0,
      tableCommonHeight: 0,
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getTableMaxHeight();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.getTableMaxHeight();
      }, 1000);
    }
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(".form-box").attributes;
        let box_clientHeight = box[0].ownerElement.clientHeight;
        this.flexHeight.formHeight = box_clientHeight;
      });
      this.$nextTick(function () {
        let box = document.querySelector(".cotent-box").attributes;
        let box_clientHeight = box[0].ownerElement.clientHeight;
        this.flexHeight.tableHeight = box_clientHeight;
      });
      this.tableCommonHeight =
        this.flexHeight.tableHeight - this.flexHeight.formHeight - 32;
      this.$nextTick(function () {
        let box = document.querySelector(".cotent-box").attributes;
        let box_clientWidth = box[0].ownerElement.clientWidth;
        console.log(box_clientWidth);
        this.tableMaxWidth = box_clientWidth;
      });
    },
  },
};
</script>
 <style scoped='less'>
.cotent-box {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-box {
  display: flex;
}

.c-table {
  width: 100%;
}
</style>