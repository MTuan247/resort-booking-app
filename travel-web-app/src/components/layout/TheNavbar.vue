<template>
  <div class="left-nav-bar" :class="{ 'navbar--collapsed': isCollapsed }">
    <div class="navbar-header">
      <div class="logo-site h-100 pointer">
        <div class="site-logo"></div>
      </div>
    </div>
    <div class="navbar-content">
      <router-link to="/" class="nav-item">
        <div class="nav-item-icon" style="">
          <v-icon icon="fa:fas fa-hotel"></v-icon>
        </div>
        <div class="nav-item-text">Khu nghỉ dưỡng</div>
      </router-link>
      <router-link to="/user" class="nav-item">
        <div class="nav-item-icon">
          <v-icon icon="fa:fas fa-user"></v-icon>
        </div>
        <div class="nav-item-text">Phân quyền</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  props: ["isCollapsed"],
};
</script>

<style lang="scss">
@import "@/scss/layout/navbar.scss";
</style>