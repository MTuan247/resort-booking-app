<template>
  <!-- <b-carousel :slides="carousels"></b-carousel> -->
  <router-view class="content"></router-view>
</template>

<script>
// import BCarousel from '@/components/base/BCarousel.vue';
import { ref } from '@vue/reactivity';

export default {
  name: "TheContent",
  components: {
    // BCarousel,
  },
  setup() {
    const carousels = ref([
      {
        src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        cover: true
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg',
        cover: true
      },
      {
        scr: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        cover: true
      }
    ])

    return {
      carousels
    }
  }
}
</script>

<style lang="scss">
.content {
  height: 0px;
  flex: 1;
  overflow: auto;
}
</style>