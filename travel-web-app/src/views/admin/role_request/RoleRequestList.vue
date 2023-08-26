<template>
  <div class="user admin-list">
    <div class="list-toolbar">
      <div class="list-toolbar-left">
        <v-breadcrumbs :items="['Quản lý', 'Yêu cầu cấp quyền']"></v-breadcrumbs>
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
        :paging="true"
      >
        <template #action="{ row }">
          <div class="table-action">
            <v-icon color="#03c04a" title="Xác nhận" icon="fa:fas fa-check" @click="approve(row)"></v-icon>
            <v-icon color="#ef0107" title="Hủy bỏ" icon="fa:fas fa-x" @click="reject(row)"></v-icon>
          </div>
        </template>
      </b-grid-table>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "@vue/runtime-core";
import BGridTable from "@/components/base/BGridTable.vue";

import baseList from "@/js/base/baseList";
import UserApi from "@/js/api/user/UserApi";

export default {
  name: "RoleRequestList",
  extends: baseList,
  components: {
    BGridTable,
  },
  setup() {

    const api = UserApi;
    const detailForm = 'UserDetail';
    const keyEntity = 'user_id';

    const { proxy } = getCurrentInstance();

    // Load dữ liệu
    const loadData = async () => {
      var res = await proxy.api.list({ Condition: {
        in_request: true
      }});
      proxy.gridData = proxy.customData(res.data)
    }

    /**
     * Xác nhận tài khoản
     */
    const approve = async (user) => {
      try {
        await proxy.api.approve({user_id: user.user_id});

        proxy.$toast.success('Cấp quyền tài khoản thành công!')
        proxy.loadData();
      } catch {
        proxy.$toast.error('Cấp quyền tài khoản thất bại!')

      }
      
    }

    /**
     * Từ chối cấp quyền tài khoản
     */
     const reject = async (user) => {
      try {
        await proxy.api.reject({user_id: user.user_id});

        proxy.$toast.success('Từ chối yêu cầu thành công!')
        proxy.loadData();
      } catch {
        proxy.$toast.error('Cấp quyền tài khoản thất bại!')

      }
      
    }

    const columns = ref([
      {
        title: "Tên tài khoản",
        fieldName: "user_name",
        style: "width: 200px;",
      },
      {
        title: "Họ và tên",
        fieldName: "name",
        style: "width: 300px;",
      },
      {
        title: "Email",
        fieldName: "email",
        style: "width: 150px;",
      },
      {
        title: "Số điện thoại",
        fieldName: "tel",
        style: "width: 150px;",
      },
      {
        title: "",
        fieldName: "Action",
        style: "width: 100px;",
      },
    ]);

    return {
      columns,
      api,
      detailForm,
      keyEntity,
      loadData,
      approve,
      reject
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

    .table-action {
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>