<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content user-detail"
    :min-width="200"
    :height="800"
    v-model="show"
    :click-to-close="false"
    name="UserDetail"
    @before-open="beforeOpen"
  >
    <button ref="close" class="modal__close" @click="close">
      <v-icon icon="mdi-close"></v-icon>
    </button>
    <span class="modal__title">Phân quyền</span>
    <div class="modal__content">
      <v-col class="form-col">
        <form-group title="Thông tin chung">
          <div class="flex-column d-flex flex1">
            <b-input :disabled="true" class="mt-2" v-model="model.name" label="Họ tên"></b-input>
          </div>
          <div class="flex-column d-flex flex1">
            <b-input :disabled="true" class="mt-2" v-model="model.email" label="Email"></b-input>
          </div>
          <div class="flex-column d-flex flex1">
            <b-input :disabled="true" class="mt-2" v-model="model.tel" label="Số điện thoại"></b-input>
          </div>
        </form-group>
        <form-group title="Phân quyền">
          <b-autocomplete
            class="mt-2"
            :returnObject="true"
            :items="roles"
            itemTitle="role_title"
            itemValue="role_id"
            v-model="role"
            label="Chức danh"
          >
          </b-autocomplete>
        </form-group>
      </v-col>
    </div>
    <div class="modal__footer pt4 pb4">
      <v-btn @click="close" class="modal_footer-btn">Hủy</v-btn>
      <v-btn @click="save" color="primary" class="modal_footer-btn ml8"
        >Lưu</v-btn
      >
    </div>
  </vue-final-modal>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  computed
} from "@vue/runtime-core";
import FormGroup from "@/components/reuse-component/FormGroup.vue";
import userApi from "@/js/api/user/UserApi";
import baseDetail from '@/js/base/baseDetail';

export default {
  name: "UserDetail",
  extends: baseDetail,
  components: {
    FormGroup,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const api = userApi;
    const keyEntity = 'user_id';

    const roles = ref([])

    const role = computed({
      get() {
        return {
          role_title: proxy.model.role_title || null,
          role_id: proxy.model.role_id || null,
        };
      },
      set(cbxValue) {
        proxy.model.role_title = cbxValue.role_title;
        proxy.model.role_id = cbxValue.role_id;
      },
    });

    onMounted(() => {
      window._detail = proxy;
      console.log("UserDetail");
    });

    const afterOpen = async () => {
      api.findRoles().then(res => {
        roles.value = res.data;
      });
    }

    return {
      api,
      keyEntity,
      roles,
      afterOpen,
      role
    };
  },
};
</script>

<style lang="scss">
.user-detail {
  height: 100vh;
  max-height: 100vh !important;
  margin: 0 !important;
  position: fixed !important;
  right: 0px;
  width: 600px !important;

  .form-col {
    padding: 0px;
  }

  .form-group {
    margin-bottom: 8px;
    padding: 8px;

    .form-group-title {
      margin-bottom: 8px;
    }

    .form-group-input {
      display: flex;
      flex-direction: column;
    }
  }

  .form-input + .form-input {
    margin-left: 8px;
  }
}
</style>