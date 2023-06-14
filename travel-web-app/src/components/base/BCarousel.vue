<template>
  <v-carousel 
    class="b-carousel"
    color="white"
  >
    <v-carousel-item
      v-for="slide in slides"
      :key="slide.src"
      :src="slide.src"
      :cover="slide.cover"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "BCarousel",
  props: {
    slides: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {},
};
</script>

<style>
@import "@/scss/base/carousel.scss";
</style>