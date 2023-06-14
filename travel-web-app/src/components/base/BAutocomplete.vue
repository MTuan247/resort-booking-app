<template>
  <v-autocomplete
    class="base-autocomplete"
    :label="label"
    density="compact"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :return-object="returnObject"
    hide-details
    v-model="value"
  ></v-autocomplete>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "BAutocomplete",
  props: {
    label: {
      type: String
    },
    modelValue: {
      
    },
    items: {

    },
    itemTitle: {
      default: 'title'
    },
    itemValue: {
      default: 'value'
    },
    returnObject: {
      default: false
    }
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const value = computed({
      get() {
        return proxy.modelValue;
      },
      set(value) {
        proxy.$emit("update:modelValue", value);
      }
    });

    return {
      value
    }
  }
};
</script>

<style scoped>

</style>