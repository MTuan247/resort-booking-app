<template>
    <div v-show="isLoading" class="spinner-overlay">
        <v-progress-circular
          indeterminate
          color="primary"
          size="60"
        ></v-progress-circular>
    </div>
</template>

<script>
    // import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    export default {
        name: 'BaseSpinner',
        props: {
            isLoading: {},
        },
        components: {
            // ClipLoader
        },
        data() {
            return {

            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
.spinner-overlay {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba($color: #000000, $alpha: 0.3);
}
</style>