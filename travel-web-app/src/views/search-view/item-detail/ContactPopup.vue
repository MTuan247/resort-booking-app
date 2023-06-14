<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content contact-popup"
    v-model="show"
    name="ContactPopup"
    :click-to-close="false"
    @before-open="beforeOpen"
  >
    <button class="modal__close" @click="close"><v-icon icon="mdi-close"></v-icon></button>
    <span class="modal__title">Tư vấn ngay</span>
    <div class="modal__content contact-content">
      <form-group class="contact-form-group" title="Email">
        {{model.email}}
      </form-group>

      <form-group class="contact-form-group" title="Số điện thoại">
        {{model.phone}}
      </form-group>

      <form-group class="contact-form-button">
        <v-btn class="contact-btn">Chat với người tư vấn</v-btn>
      </form-group>
    </div>
    <div class="modal__footer pt4 pb4">
    </div>
  </vue-final-modal>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from "@vue/runtime-core";
import FormGroup from "@/components/reuse-component/FormGroup.vue";

export default {
  name: "ContactPopup",
  inheritAttrs: false,
  components: {
    FormGroup
  },
  methods: {

  },
  setup() {
    const { proxy } = getCurrentInstance();

    const show = ref(true);

    const model = ref({});

    const params = ref();

    /**
     * Trước khi mở form
     */
    const beforeOpen = (event) => {
      model.value = { ...event.ref.params.value.data };
      params.value = event.ref.params.value;
    };


    onMounted(() => {
      proxy
      console.log("Login");
    });

    return {
      show,
      model,
      params,
      beforeOpen
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/base/popup.scss";
.contact-popup {
  height: 50vh;
  width: 40%;
  padding: 2rem !important;

  .contact-content {
    display: flex;
    flex-direction: column;
  }

  .modal__title {
    display: flex;
    justify-content: center;
    color: var(--primary-color);
  }

  .contact-form-group {
    margin-top: 16px;
    margin-bottom: 16px;
    flex: 1;
  }

  .contact-form-button {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-group-input {
      width: 100%;
    }

    .contact-btn {
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: 36px;
      height: 40px;
      width: 100%;
    }
  }
}
</style>