 <template>
  <div class="cotent-box" style="height: 100%; display: flex">
    <section class="form-box">
      <FormItem :formItems="formItems" />
    </section>
    <section class="c-table">
      <TableCommon :columns="columns" :flexHeight="flexHeight" />
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
        formHeight: '',
        tableHeight: '',
        tableWidth: '',
      }
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getTableMaxHeight();
    let _this = this;
    window.onresize = function () {
      _this.getTableMaxHeight();
    };
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
        let box_clientWidth = box[0].ownerElement.clientWidth;
        console.log(box_clientWidth);
        this.flexHeight.tableHeight = box_clientHeight;
        this.flexHeight.tableWidth = box_clientWidth;
      });
    },
  },
};
</script>
 <style scoped='less'>
.cotent-box {
  display: flex;
  flex-direction: column;
}

.form-box {
  display: flex;
}
</style>