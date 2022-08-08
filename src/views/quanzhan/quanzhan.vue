 <template>
  <div class="cotent-box" style="height: 100%; display: flex">
    <section class="form-box">
      <FormItem :formItems="formItems" :methods="formFunction" />
    </section>
    <section class="c-table">
      <TableCommon
        :columns="columns"
        :flexHeight="tableCommonHeight"
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
          type: "input",
          configData: FormItemsConfig.input.inputConfig1,
        },
        {
          type: "select",
          configData: FormItemsConfig.select.selectConfig1,
        },
        {
          type: "datePicker",
          configData: FormItemsConfig.datepicker.datepickerConfig1,
        },
        {
          type: "checkbox",
          configData: FormItemsConfig.checkbox.checkConfig1,
        },
        {
          type: "button",
          configData: FormItemsConfig.button.buttonConfig1,
        },
      ],
      columns: TableCommonConfig.tableConfig1,
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
      formFunction: {
        selectChange(data) {
          console.log("父: " + data);
        },
        inputChange(data) {
          console.log("父: " + data);
        },
        changeDatePicker(data) {
          console.log("父: " + data);
        },
        handleCheckedChange(data) {
          console.log("父: " + data);
        },
        buttonClick() {
          console.log("父: 点击了按钮");
        },
      },
      flexHeight: {
        formHeight: "",
        tableHeight: "",
      },
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
</style>