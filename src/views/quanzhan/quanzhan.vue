 <template>
  <div class="cotent-box" style="height: 100%; display: flex">
    <section class="form-box">
      <FormItem :formItems="formItems" />
    </section>
    <section class="c-table">
      <TableCommon :columns="columns" :flexHeight="tableCommonHeight" />
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
          configData: FormItemsConfig.button.buttonConfig2,
          configMethods: FormItemsConfig.button.buttonMethods1,
        },
      ],
      columns: TableCommonConfig.tableConfig1,
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
    // let _this = this;
    // window.onresize = function () {
    //   _this.getTableMaxHeight();
    // };
    setInterval(() => {
        this.getTableMaxHeight();
    }, 1000)
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