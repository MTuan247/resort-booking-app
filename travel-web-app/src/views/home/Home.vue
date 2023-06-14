<template>
  <div class="home">
    <div class="home-main">
      <div class="home-branch">Travel Time</div>
      <div class="home-text">Hệ thống tìm kiếm và tư vấn booking các khu nghỉ dưỡng</div>
      <search-bar></search-bar>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/reuse-component/SearchBar.vue';
import { mapActions } from 'vuex'
import { getCurrentInstance } from 'vue';

export default {
  name: "HomeView",
  components: {
    SearchBar
  },
  methods: {
    ...mapActions('moduleSearch', ['search']),
  },
  setup() {

    const { proxy } = getCurrentInstance();

    return {
      proxy
    }
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;

    .home-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .home-branch, .home-text {
        align-self: center;
      }
      .home-branch {
        font-size: 4.5rem;
        letter-spacing: .2rem;
        line-height: normal;
      }
      .home-text {
        font-size: 1.05rem;
        padding-bottom: 0.5rem;
        padding-top: 0.7rem;
        margin-bottom: 1rem;
      }
    }
  }
</style>