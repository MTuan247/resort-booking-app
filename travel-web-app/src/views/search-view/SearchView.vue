<template>
  <div class="search-view">
    <div class="search-header">
      <search-bar></search-bar>
    </div>
    <div v-if="computedList.length" class="search-content">
      <search-item
        :key="item.resort_id"
        :image="item.image"
        :title="item.title"
        :subtitle="item.subtitle"
        :description="item.description"
        @clickItem="() => clickItem(item)"
        v-for="item in computedList"
      ></search-item>
    </div>
    <div v-else class="search-content no-data">
      <div class="search-text">Không tìm thấy dữ liệu phù hợp yêu cầu</div>
    </div>
  </div>
</template>

<script>
// import SearchBar from '@/components/reuse-component/SearchBar.vue';
import SearchItem from "./SearchItem.vue";
import { computed, getCurrentInstance } from "@vue/runtime-core";
import { mapState } from "vuex";

import { genMoneyText } from "@/views/search-view/resortCommon.js";

import SearchBar from "@/components/reuse-component/SearchBar.vue";

export default {
  name: "SearchView",
  components: {
    SearchItem,
    SearchBar,
  },
  computed: {
    ...mapState("moduleSearch", ["list"]),
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const computedList = computed(() => {
      return proxy.list.map((x) => {
        return {
          ...x,
          subtitle: genMoneyText(x),
        };
      });
    });

    // [
    //   {
    //     id: 1,
    //     image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    //     title: "Onsen Villas Resort, Thành phố Hòa Bình, Tỉnh Hoà Bình",
    //     subtitle: "3.800.000 - 4.800.000 đ/đêm",
    //     description:
    //       "Onsen Villas – điểm đến yên bình theo phong cách Nhật Bản hòa giữa thiên nhiên vùng Hoà Bình tươi đẹp.",
    //   },
    //   {
    //     id: 2,
    //     image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    //     title: "Onsen Villas Resort, Thành phố Hòa Bình, Tỉnh Hoà Bình",
    //     subtitle: "3.800.000 - 4.800.000 đ/đêm",
    //     description:
    //       "Onsen Villas – điểm đến yên bình theo phong cách Nhật Bản hòa giữa thiên nhiên vùng Hoà Bình tươi đẹp.",
    //   },
    // ]

    const clickItem = (item) => {
      proxy.$router.push({
        name: `item-detail`,
        params: { id: item.resort_id },
      });
    };

    return {
      clickItem,
      computedList,
    };
  },
};
</script>

<style lang="scss">
.search-view {
  display: flex;
  flex-direction: column;
  .search-header {
    position: sticky;
    top: 0px;
    background-color: var(--white);
    z-index: 1;
    padding: 8px 0px 8px 0px;
  }

  .search-item {
    margin: 16px;
  }

  .no-data {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-text {
      font-size: 1.2rem;
      padding-bottom: 0.5rem;
      padding-top: 0.7rem;
      margin-bottom: 1rem;
    }
  }
}
</style>