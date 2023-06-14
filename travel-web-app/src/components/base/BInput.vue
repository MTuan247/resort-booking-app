<template>
  <v-text-field
    class="b-input b-input-text"
    :class="[hasBorder ? 'has-border' : '']"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    v-model="modelValue"
    :variant="variant"
    :error-messages="errorMessages"
    density="compact"
    hide-details="auto"
    @keypress="isNumber"
    @update:modelValue="input"
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
    const modelValue = computed({
      get() {
        return proxy.value;
      },
      set(val) {
        if (proxy.inputType != "number" && proxy.inputType != "currency") {
          proxy.$emit("update:modelValue", parseFloat(val));
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
      modelValue,
      isNumber,
      input
    };
  },
};
</script>

<style>
@import "@/scss/base/input.scss";
</style>