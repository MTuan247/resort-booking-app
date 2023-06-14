<template>
  <vue-final-modal
    v-slot="{  }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content login-form"
    v-model="show"
    name="LoginForm"
    :click-to-close="false"
    @before-open="beforeOpen"
  >
    <!-- <button class="modal__close" @click="close"><v-icon icon="mdi-close"></v-icon></button> -->
    <span class="modal__title">Đăng nhập</span>
    <div class="modal__content login-form-content">
      <form-group class="login-form-group" title="Tên đăng nhập *">
        <b-input :errorMessages="userError" v-model="model.user_name" hasBorder :variant="null" label=""></b-input>
      </form-group>

      <form-group class="login-form-group" title="Mật khẩu *">
        <b-input :errorMessages="passwordError" v-model="model.password" hasBorder :variant="null" type="password" label=""></b-input>
      </form-group>

      <form-group class="login-form-button">
        <v-btn @click="handleLogin" class="login-btn">Đăng nhập</v-btn>
      </form-group>
    </div>
    <div class="modal__footer pt4 pb4">
    </div>
  </vue-final-modal>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from "@vue/runtime-core";
import FormGroup from "@/components/reuse-component/FormGroup.vue";
import { mapActions } from 'vuex'

export default {
  name: "LoginForm",
  inheritAttrs: false,
  components: {
    FormGroup
  },
  methods: {
    ...mapActions('moduleAuth', ['login', 'logout']),
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const show = ref(true);

    const model = ref({});

    const userError = ref();
    const passwordError = ref("");

    /**
     * Trước khi mở form
     */
    const beforeOpen = (event) => {
      proxy
      event
    };

    const resetValidate = () => {
      userError.value = "";
      passwordError.value = "";
    }

    const validate = () => {

      resetValidate();

      if (!model.value.user_name) {
        userError.value = "Vui lòng nhập tên đăng nhập";
      }

      if (!model.value.password || model.value.password.length < 6) {
        passwordError.value = "Vui lòng nhập mật khẩu độ dài ít nhất 6 ký tự";
      }

      if (userError.value || passwordError.value) {
        return false;
      }

      return true;
    }

    const handleLogin = async () => {
      if (!validate()){
        return;
      }

      try {
        await proxy.login(model.value);
        proxy.$router.push('/');
        proxy.show = false;
      } catch (ex) {
        userError.value = ex.response.data;
      }

    }

    onMounted(() => {
      console.log("Login");
    });

    return {
      beforeOpen,
      show,
      model,
      userError,
      passwordError,
      handleLogin
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/base/popup.scss";
.login-form {
  height: 65vh;
  width: 25%;
  padding: 2rem !important;
  border-bottom: 5px solid var(--primary-color) !important;
  background-color: var(--gray) !important;

  .modal__title {
    display: flex;
    justify-content: center;
    color: var(--primary-color);
    margin: 0px !important;
  }

  .login-form-group {
    margin-top: 16px;
    margin-bottom: 16px;
    
    .b-input-text .v-field__input {
      background-color: var(--white);
    }
  }

  .login-form-button {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-group-input {
      width: 100%;
    }

    .login-btn {
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: 36px;
      height: 40px;
      width: 100%;
    }
  }
}
</style>