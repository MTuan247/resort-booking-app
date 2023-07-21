<template>
  <div class="admin">
    <!-- <the-navbar></the-navbar> -->
    <router-view class="admin-content"></router-view>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount } from "@vue/runtime-core";
// import TheNavbar from "@/components/layout/TheNavbar.vue";

export default {
  name: "AdminView",
  components: {
  },
  setup() {
    const { proxy } = getCurrentInstance();

    onBeforeMount(() => {
      console.log(proxy);
    })
    
    return {

    };
  },
};
</script>

<style lang="scss">
.admin {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #efefef;

  .admin-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 20px;
  }
  
  .list-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>