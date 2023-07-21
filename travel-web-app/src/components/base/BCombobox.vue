<template>
  <div class="input-wrapper combobox-wrapper">
    <v-combobox
      class="b-input b-input-combobox"
      :label="label"
      :placeholder="placeholder"
      v-model="bindValue"
      :variant="variant"
      density="compact"
      hide-details="auto"
      :items="items"
    ></v-combobox>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "BCombobox",
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
    modelValue: {
      default: "",
      type: String
    },
    /**
     * Template input
     */
    variant: {
      default: "solo",
      type: String
    },
    /**
     * Danh sách items
     */
    items: {
      default: () => [],
      type: Array,
    }
  },
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    /**
     * Xử lý cập nhật 2 chiều dữ liệu
     */
    const bindValue = computed({
      get() {
        return proxy.modelValue;
      },
      set(val) {
        proxy.$emit("update:modelValue", val)
      }
    });

    return {
      bindValue
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base/input.scss";
</style>