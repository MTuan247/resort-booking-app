<template>
  <v-container class="item-detail">
    <div class="item-detail__header">
      <div class="item-header-left">
        <h1 class="item-detail__title">
          {{ model.title }}
        </h1>
        <div class="item-detail__subtitle">
          {{ model.description }}
        </div>
      </div>
      <div class="item-header-right">
        <span class="price-label">Giá chỉ từ</span>
        <p class="price-text">{{genMoneyText(model)}}</p>
        <v-btn color="info" @click="contact">Tư vấn ngay</v-btn>
      </div>
    </div>
    <v-divider color="#404258"></v-divider>
    <div class="item-detail__articles">
      <div
        class="article"
        v-for="article in articles"
        :key="article.article_id"
      >
        <h2 class="article-title">
          {{ article.title }}
        </h2>
        <div class="article-images">
          <v-img
            v-for="image in article.images"
            class="article-image"
            :key="image"
            :height="280"
            :src="image"
            cover
          ></v-img>
        </div>
        <v-divider color="#404258"></v-divider>
      </div>
      <div v-if="children.length" class="article">
        <h2 class="article-title">
          Danh sách chi tiết
        </h2>
        <div class="article-images">
          <search-item
            class="child-item"
            :key="item.resort_id"
            :image="item.image"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            v-for="item in children"
            @click="showItem(item.resort_id)"
          ></search-item>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { getCurrentInstance, onBeforeMount, ref, watch } from "@vue/runtime-core";
import { genMoneyText } from '@/views/search-view/resortCommon.js';
import SearchItem from '@/views/search-view/SearchItem.vue'
import resortApi from "@/js/api/resort/ResortApi";
export default {
  name: "ItemDetail",
  props: {},
  components: {
    SearchItem
  },
  watch: {
    "$route.params.id"(value) {
      this.loadData(value);
    }
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const articles = ref([]);

    const itemId = ref();

    const model = ref({});

    const children = ref([]);

    const loadData = () => {
      itemId.value = proxy.$route.params.id;

      resortApi.getById(itemId.value).then((res) => {
        model.value = res.data;
        if (model.value.articles && model.value.articles.length) {
          articles.value = model.value.articles;
        }
        return model.value;
      }).then((res) => {
        resortApi.list({
          Condition: {
            parent_id: res.resort_id
          }
        }).then((res) => {
          children.value = res.data.map(x => {
            return {
              ...x,
              subtitle: genMoneyText(x)
            };
          })
        });
      });
    }

    onBeforeMount(() => {
      loadData();
    });

    watch()

    /**
     * Tư vấn ngay
     */
    const contact = () => {
      proxy.$popup.show(
        { component: "ContactPopup" },
        {
          data: model.value,
        }
      );
    };

    const showItem = (id) => {
      proxy.$router.push({
        name: `item-detail`,
        params: { id: id },
      });
    }

    return {
      articles,
      model,
      contact,
      genMoneyText,
      children,
      showItem,
      loadData
    };
  },
};
</script>

<style lang="scss">
.item-detail {
  .item-detail__header {
    display: flex;

    .item-header-left {
      flex: 5;

      .item-detail__title {
        font-size: 32px;
        line-height: 1.4;
        margin: 1rem 0 0.8rem;
        color: rgba(0,0,0,.85);
      }

      .item-detail__subtitle {
        font-size: 1.1rem;
        line-height: 1.4;
        opacity: 0.9;
        text-align: justify;
      }
    }

    .item-header-right {
      flex: 2;
      align-items: end;
      display: flex;
      flex-direction: column;
      margin-bottom: 0.3rem;

      .price-label {
        font-weight: 600;
      }

      .price-text {
        color: var(--text-red);
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }

  .article {

    margin-top: 8px;

    .child-item {
      margin-left: 0px !important;
      margin-right: 0px !important;
      width: 33%;
    }

    .article-title {
      font-size: 28px;
      letter-spacing: .004em;
      line-height: 45px;
    }

    .article-images {
      display: flex;
      flex-wrap: wrap;
      justify-items: flex-start;
      .article-image {
        cursor: pointer;
        max-width: 285px;
        img {
          aspect-ratio: 1/1;
          border-radius: 8px;
          width: 280px;
        }
      }
    }
  }
}
</style>