<template>
  <div class="resort admin-list">
    <div class="list-toolbar">
      <div class="list-toolbar-left">
        <v-breadcrumbs :items="['Quản lý', 'Khu nghỉ dưỡng']"></v-breadcrumbs>
      </div>
      <div class="list-toolbar-right">
        <v-btn
          @click="
            () =>
              deletes(gridData.filter((x) => x.isSelected).map((x) => x[keyEntity]))
          "
          class="toolbar-btn mr-2"
          >Xóa</v-btn
        >
        <v-btn @click="add" class="toolbar-btn">Thêm</v-btn>
      </div>
    </div>
    <div class="resort-main">
      <!-- <input type="file" ref="file" v-on:change="handleFileUpload" />
      <button v-on:click="uploadFile">Upload</button> -->
      <b-grid-table
        :isTreeGrid="true"
        @edit="editRow"
        v-model="gridData"
        :columns="columns"
        :idField="keyEntity"
        parentField="parent_id"
        :recordPerPage="5"
        :paging="true"
      >
        <template #action="{ row }">
          <div class="table-action">
            <v-icon title="Sửa" color="#1196dd" icon="mdi-pencil-outline" @click="editRow(row)"></v-icon>
            <v-icon title="Xóa" color="#ef0107" icon="mdi-delete-outline" @click="deleteRow(row)"></v-icon>
          </div>
        </template>
      </b-grid-table>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { ref } from "@vue/runtime-core";
import BGridTable from "@/components/base/BGridTable.vue";
import resortApi from "@/js/api/resort/ResortApi";
import { genMoneyText } from "@/views/search-view/resortCommon.js";
import baseList from "@/js/base/baseList";

export default {
  name: "ResortList",
  extends: baseList,
  components: {
    BGridTable,
  },
  setup() {
    
    const api = resortApi;
    const detailForm = 'ResortDetail';
    const keyEntity = 'resort_id'

    /**
     * Custom lại dữ liệu
     * @param {*} listData 
     * @returns 
     */
     const customData = (listData) => {
      return listData.map((x) => {
        return {
          ...x,
          cost: genMoneyText(x),
        };
      });
    }

    const columns = ref([
      {
        title: "",
        fieldName: "Checkbox",
        style: "width: 30px;",
      },
      {
        title: "#",
        fieldName: "Tree",
        style: "width: 60px;",
        align: "center",
      },
      {
        title: "Tên khu nghỉ dưỡng",
        fieldName: "title",
        // style: "width: 200px;",
      },
      {
        title: "Tỉnh/thành phố",
        fieldName: "location",
        style: "width: 200px;",
      },
      {
        title: "Giá cả",
        fieldName: "cost",
        style: "width: 200px;",
      },
      {
        title: "",
        fieldName: "Action",
        style: "width: 100px;",
      },
    ]);

    return {
      columns,
      customData,
      api,
      detailForm,
      keyEntity
    };
  },
};
</script>

<style lang="scss">
.resort {
  .resort-main {
    display: flex;
    flex-direction: column;
    height: 0px;
    flex: 1;

    .table-action {
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>