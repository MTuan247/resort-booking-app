<template>
  <div id="main-app">
    <b-spinner :isLoading="false"></b-spinner>
    <modals-container></modals-container>
    <div class="left-container">
      <TheNavbar />
    </div>
    <div class="right-container">
      <TheHeader />
      <TheContent />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader";
import TheContent from "@/components/layout/TheContent.vue";
import BSpinner from "./components/base/BSpinner.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheContent,
    TheNavbar,
    BSpinner,
  },
};
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
@import "vue-toastification/dist/index.css";
@import '@/scss/common/_variables.scss';
@import '@/scss/common/common-style.scss';
@import '@/scss/common/pagination.scss';
@import "@/scss/base/popup.scss";

@import "@/scss/main.scss";
</style>
