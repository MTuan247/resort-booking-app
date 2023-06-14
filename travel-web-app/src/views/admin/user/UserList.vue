<template>
  <div class="user admin-list">
    <div class="list-toolbar">
      <div class="list-toolbar-left">
        <v-breadcrumbs :items="['Quản lý', 'Phân quyền']"></v-breadcrumbs>
      </div>
      <div class="list-toolbar-right">
      </div>
    </div>
    <div class="user-main">
      <b-grid-table
        :isTreeGrid="false"
        @edit="editRow"
        v-model="gridData"
        :columns="columns"
        :idField="this.keyEntity"
      >
        <template #action="{ row }">
          <v-icon icon="mdi-pencil-outline" @click="editRow(row)"></v-icon>
        </template>
      </b-grid-table>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";
import BGridTable from "@/components/base/BGridTable.vue";

import baseList from "@/js/base/baseList";
import UserApi from "@/js/api/user/UserApi";

export default {
  name: "UserList",
  extends: baseList,
  components: {
    BGridTable,
  },
  setup() {

    const api = UserApi;
    const detailForm = 'UserDetail';
    const keyEntity = 'user_id'

    const columns = ref([
      {
        title: "",
        fieldName: "Checkbox",
        style: "width: 30px;",
      },
      {
        title: "Tên tài khoản",
        fieldName: "user_name",
        style: "width: 200px;",
      },
      {
        title: "Chức danh",
        fieldName: "role_title",
        style: "width: 300px;",
      },
      {
        title: "",
        fieldName: "Action",
        style: "width: 40px;",
      },
    ]);

    return {
      columns,
      api,
      detailForm,
      keyEntity
    };
  },
};
</script>

<style lang="scss">
.user {
  .user-main {
    display: flex;
    flex-direction: column;
  }
}
</style>