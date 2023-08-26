<template>
  <v-text-field
    class="b-input b-input-text"
    :class="[hasBorder ? 'has-border' : '']"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    v-model="computedValue"
    :variant="variant"
    :error-messages="errorMessages"
    density="compact"
    hide-details="auto"
    @keypress="isNumber"
  ></v-text-field>
</template>

<script>
import { computed, getCurrentInstance } from "@vue/runtime-core";
export default {
  name: "BInput",
  props: {
    /**
     * Label của input
     */
    label: {
      default: "",
      type: String,
    },
    /**
     * Custom placeholder
     */
    placeholder: {
      default: "",
      type: String,
    },
    /**
     * Loại password, email, etc...
     */
    type: {
      default: "",
      type: String,
    },
    /**
     * Giá trị input
     */
    value: {
      default: "",
      type: String,
    },
    /**
     * Giá trị input
     */
    modelValue: {
      default: "",
    },
    /**
     * Template input
     */
    variant: {
      default: "outlined",
      type: String,
    },
    /**
     * Dùng border trong trường hợp variant = null, không dùng style mặc định
     */
    hasBorder: {
      default: false,
      type: Boolean,
    },
    /**
     * Text lỗi
     */
    errorMessages: {},

    /**
     * Loại dữ liệu nhập
     */
    inputType: {},
  },
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    /**
     * Xử lý cập nhật 2 chiều dữ liệu
     */
    const computedValue = computed({
      get() {
        if (proxy.inputType == "number" || proxy.inputType == "currency") {
          return Number(String(proxy.modelValue).replaceAll(/[^0-9.,-]+/g,"")).toLocaleString("it-IT")
        }
        return proxy.modelValue;
      },
      set(val) {
        if (proxy.inputType == "number" || proxy.inputType == "currency") {
          proxy.$emit("update:modelValue", parseFloat(String(val).replaceAll(".", "").replaceAll(",", "")) || null);
          return;
        }
        proxy.$emit("update:modelValue", val);
      },
    });

    /**
     * Emit sự kiện khi nhập
     */
    const input = (val) => {
      proxy.$emit("input", val);
    }


    const isNumber = function(evt) {
      if (proxy.inputType != "number" && proxy.inputType != "currency") {
        return true;
      }
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    }

    return {
      computedValue,
      isNumber,
      input
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/base/input.scss";
</style>