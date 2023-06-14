<template>
  <tr
    @dblclick="dbclickRow(row)"
    @click.ctrl="ctrlClickRow(index)"
    @click.right.exact.prevent="rightClickRow($event, row, index)"
    :class="{ selected: row['isSelected'] }"
  >
    <template v-for="col in columns" :key="col.fieldName">
      <td v-if="col.fieldName == 'Checkbox'" class="check-box">
        <v-checkbox
          hide-details
          density="compact"
          :modelValue="row.isSelected"
          @change="checkbox"
        ></v-checkbox>
      </td>
      <td v-else-if="col.fieldName == 'Index'">{{ index + 1 }}</td>
      <td
        @click="toggleChildren"
        class="text-center pointer"
        :class="'upl' + (row._grade || 0) * 6"
        v-else-if="col.fieldName == 'Tree'"
      >
        <v-icon
          :icon="showChildren ? 'mdi-menu-down' : 'mdi-menu-right'"
        ></v-icon>
      </td>
      <td v-else-if="col.fieldName == 'Action'">
        <slot name="action" :row="row"></slot>
      </td>
      <td v-else :style="col.style" :title="row[col.fieldName]">
        {{ row[col.fieldName] }}
      </td>
    </template>
  </tr>
  <template v-if="row._children && row._children.length && showChildren">
    <b-grid-row
      v-for="childRow in row._children"
      :key="childRow[idField]"
      :row="childRow"
      :columns="columns"
      :idField="idField"
      :parentField="parentField"
      @checkbox="checkbox"
      @dbclickRow="dbclickRow"
      @ctrlClickRow="ctrlClickRow"
      @rightClickRow="rightClickRow"
    >
      <template #action>
        <slot name="action" :row="childRow"></slot>
      </template>
    </b-grid-row>
  </template>
</template>

<script>
import { getCurrentInstance, ref } from "@vue/runtime-core";
export default {
  name: "BGridRow",
  emits: ["dbclickRow", "ctrlClickRow", "rightClickRow", "checkbox"],
  props: {
    columns: {},
    row: {},
    index: {},
    idField: {
      default: "id",
    },
    parentField: {
      default: "parent_id",
    },
  },
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();

    const showChildren = ref(true);

    const dbclickRow = (row) => {
      proxy.$emit("dbclickRow", row);
    };

    const ctrlClickRow = (index) => {
      proxy.$emit("ctrlClickRow", index);
    };

    const rightClickRow = (e, row, index) => {
      proxy.$emit("rightClickRow", e, row, index);
    };

    const checkbox = () => {
      // proxy.$emit("checkbox");
      proxy.row.isSelected = !proxy.row.isSelected;
    };

    const toggleChildren = () => {
      showChildren.value = !showChildren.value;
    };

    return {
      showChildren,
      dbclickRow,
      ctrlClickRow,
      rightClickRow,
      checkbox,
      toggleChildren,
    };
  },
};
</script>

<style>
</style>