<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content resort-detail"
    :min-width="200"
    :height="800"
    v-model="show"
    :click-to-close="false"
    name="ResortDetail"
    @before-open="beforeOpen"
  >
    <button class="modal__close" @click="close">
      <v-icon icon="mdi-close"></v-icon>
    </button>
    <span class="modal__title">Phân quyền</span>
    <div class="modal__content">
      <v-col class="form-col">
        <form-group title="Thông tin chung">
          <div class="flex-column d-flex flex1">

          </div>
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
} from "@vue/runtime-core";
import FormGroup from "@/components/reuse-component/FormGroup.vue";
import userApi from "@/js/api/user/UserApi";
import baseDetail from '@/js/base/baseDetail';

export default {
  name: "ResortDetail",
  extends: baseDetail,
  components: {
    FormGroup,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const api = userApi;
    const keyEntity = 'user_id';

    onMounted(() => {
      window._detail = proxy;
      console.log("UserDetail");
    });

    return {
      api,
      keyEntity
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/base/popup.scss";
.resort-detail {
  height: 95vh;

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
    }
  }

  .form-input + .form-input {
    margin-left: 8px;
  }
}
</style>