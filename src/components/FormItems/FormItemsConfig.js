import FormButtonConfig from "./FormButton/FormButtonConfig"
import CheckboxConfig from "./FormCheckbox/CheckboxConfig"
import DatePickerConfig from "./FormDatePicker/DatePickerConfig"
import FormInputConfig from "./FormInput/FormInputConfig"
import FormSelectConfig from "./FormSelect/FormSelectConfig"
export default {
    // form表单配置
    curOption: {
        inline: true,
        size: "mini",
        labelWidth: "180",
        labelPosition: "left",
        disabled: false,
    },

    // button配置
    button: {
        buttonConfig1: FormButtonConfig.config1,
        buttonConfig2: FormButtonConfig.config2,
        buttonMethods1: FormButtonConfig.buttonMethods1,
    },

    // checkbox配置
    checkbox: {
        checkConfig1: CheckboxConfig.config1,
    },

    //datepicker配置
    datepicker: {
        datepickerConfig1: DatePickerConfig.config1,
    },

    //input配置
    input: {
        inputConfig1: FormInputConfig.config1,
    },

    //select配置
    select: {
        selectConfig1: FormSelectConfig.config1,
    }
}