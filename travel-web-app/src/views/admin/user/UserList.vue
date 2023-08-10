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
        v-model="pagingData"
        :columns="columns"
        :idField="this.keyEntity"
      >
        <template #action="{ row }">
          <v-icon icon="mdi-pencil-outline" @click="editRow(row)"></v-icon>
        </template>
      </b-grid-table>
      <div class="paging">
        <vue-awesome-paginate
          :total-items="totalPages"
          :items-per-page="limit"
          :max-pages-shown="5"
          v-model="page"
          :on-click="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref } from "@vue/runtime-core";
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
    const keyEntity = 'user_id';

    const {proxy} = getCurrentInstance();

    const page = ref(1);
    const limit = 10;

    const columns = ref([
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
    
    /**
     * Dữ liệu phân trang
     */
    const pagingData = computed(() => {
      if (typeof proxy.gridData.slice != 'function')  {
        return []
      }
      let offset = (page.value - 1) * limit;
      return [...proxy.gridData].slice(offset, offset + limit);
    });

    /**
     * Số trang
     */
    const totalPages = computed(() => {
      return proxy.gridData?.length;
    })

    /**
     * Chọn trang
     * @param {*} iPage 
     */
     const changePage = (iPage) => {
      page.value = iPage;
    }

    return {
      columns,
      api,
      detailForm,
      keyEntity,
      page,
      changePage,
      pagingData,
      limit,
      totalPages
    };
  },
};
</script>

<style lang="scss">
.user {
  .user-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 0px;

    .paging {
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>