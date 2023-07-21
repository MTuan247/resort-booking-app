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
      <router-link to="/role-request" class="nav-item">
        <div class="nav-item-icon">
          <v-icon icon="fa:fas fa-person-circle-check"></v-icon>
        </div>
        <div class="nav-item-text">Yêu cầu cấp quyền</div>
      </router-link>
      <router-link to="/user" class="nav-item">
        <div class="nav-item-icon">
          <v-icon icon="fa:fas fa-user"></v-icon>
        </div>
        <div class="nav-item-text">Phân quyền</div>
      </router-link>
      <router-link to="/order" class="nav-item">
        <div class="nav-item-icon">
          <v-icon icon="fa:fas fa-bookmark"></v-icon>
        </div>
        <div class="nav-item-text">Đặt phòng</div>
      </router-link>
      <router-link to="/feedback" class="nav-item">
        <div class="nav-item-icon">
          <v-icon icon="fa:fas fa-message"></v-icon>
        </div>
        <div class="nav-item-text">Đánh giá</div>
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

<style lang="scss" scoped>
@import "@/scss/layout/navbar.scss";
</style>