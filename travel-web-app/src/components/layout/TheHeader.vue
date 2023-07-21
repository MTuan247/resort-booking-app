<template>
  <div class="header">
    <div class="header-container container h-100">
      <div class="header-left">
        <!-- <div @click="goHome" class="logo-site h-100 pointer">
          <div class="site-logo"></div>
        </div> -->
      </div>
      <div class="header-center">
        <router-link to="/" class="header-item">Trang chủ</router-link>
        <!-- <div class="header-item">Dịch vụ</div> -->
        <!-- <div class="header-item">Tin tức</div> -->
        <!-- <router-link to="/about" class="header-item">Giới thiệu</router-link> -->
        <!-- <div class="header-item">Liên hệ</div> -->
        <!-- <router-link v-if="user?.role == 'admin'" to="/admin" class="header-item">Admin</router-link> -->
      </div>
      <div class="header-right">
        <v-menu v-if="status.loggedIn" class="account">
          <template v-slot:activator="{ props }">
            <v-avatar class="pointer" v-bind="props" color="info">
              <v-img v-if="user.avatar" alt="Avatar" :src="user.avatar"></v-img>
              <v-icon v-else icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item :value="0" class="pointer account-dropdown-item">
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item>
            <v-list-item :value="1" class="pointer account-dropdown-item">
              <v-list-item-title @click="handleLogout">Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <template v-else>
          <v-btn @click="login">Đăng nhập</v-btn>
          <!-- <v-btn>Đăng ký</v-btn> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from '@vue/runtime-core';
import { mapState, mapActions } from 'vuex'
export default {
  /**
   * Layout Header
   */
  name: "TheHeader",
  components: {},
  computed: {
    ...mapState('moduleAuth', ['status', 'user']),
  },
  methods: {
    ...mapActions('moduleAuth', ['logout']),
  },
  watch: {},
  setup() {
    const { proxy } = getCurrentInstance();

    const login = () => {
      proxy.$popup.show({
        component: "LoginForm"
      }, {

      })
    }

    const goHome = () => {
      proxy.$router.push('/')
    }

    const handleLogout = () => {
      proxy.logout();
      proxy.$router.push('/login');
    }

    return {
      login,
      handleLogout,
      goHome
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/layout/header";
</style>