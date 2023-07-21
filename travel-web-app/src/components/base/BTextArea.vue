<template>
  <v-textarea
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
  ></v-textarea>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "BTextArea",
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
      type: String
    },
    /**
     * Template input
     */
    variant: {
      default: "outlined",
      type: String
    },
    /**
     * Dùng border trong trường hợp variant = null, không dùng style mặc định
     */
    hasBorder: {
      default: false,
      type: Boolean
    },
    /**
     * Text lỗi
     */
    'errorMessages': {
    }
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
        proxy.$emit("update:modelValue", val)
      }
    });

    return {
      modelValue
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base/input.scss";
</style>