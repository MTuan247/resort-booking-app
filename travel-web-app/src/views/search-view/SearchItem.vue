<template>
  <v-card
    class="mx-auto search-item"
    max-width="344"
  >
    <v-img
      :src="image"
      height="200px"
      cover
    ></v-img>

    <v-card-title class="search-item__title">
      {{title}}
    </v-card-title>

    <v-card-subtitle>
      {{subtitle}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        @click="clickItem"
      >
        Xem
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{description}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core';
export default {
  name: 'SearchItem',
  props: {
    title: {
      default: '',
      type: String
    },
    subtitle: {
      default: '',
      type: String
    },
    description: {
      default: '',
      type: String
    },
    image: {
      default: '',
      type: String
    }
  },
  setup() {
    
    const { proxy } = getCurrentInstance();

    /**
     * expand
     */
    const show = ref(false);

    /**
     * Hàm click vào item
     */
    const clickItem = () => {
      proxy.$emit('clickItem');
    }

    return {
      show,
      clickItem
    }
  }
}
</script>

<style lang="scss">
  .search-item {
    .search-item__title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* number of lines to show */
      line-height: 1.5rem;
      max-height: 3.6rem;
      height: 3.6rem;
      display: block;
      white-space: normal;
    }
  }
</style>