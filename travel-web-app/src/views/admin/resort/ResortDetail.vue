<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content resort-detail"
    :min-width="200"
    :height="800"
    v-model="show"
    :click-to-close="false"
    name="ResortDetail"
    @before-open="beforeOpen"
  >
    <button class="modal__close" @click="close">
      <v-icon icon="mdi-close"></v-icon>
    </button>
    <span class="modal__title">Khu nghỉ dưỡng</span>
    <div class="modal__content">
      <v-col class="form-col">
        <form-group title="Thông tin chung">
          <div class="flex-column d-flex flex1">
            <b-input class="mt-2" v-model="model.title" label="Tên"></b-input>
            <form-group title="Ảnh minh họa" class="cover-image mt-2">
              <image-picker :width="400" :height="250" v-model:images="coverImages"></image-picker>
            </form-group>
            <b-autocomplete
              class="mt-2"
              :returnObject="true"
              :items="parentList"
              @update:modelValue="chooseParent"
              v-model="parent"
              label="Thuộc"
            ></b-autocomplete>
            <b-text-area
              class="mt-2"
              v-model="model.description"
              label="Mô tả"
            ></b-text-area>
            <div v-if="!model.parent_id" class="d-flex mt-2">
              <b-input
                class="mr-2"
                v-model="model.from_cost"
                type="number"
                label="Từ giá"
              ></b-input>
              <b-input
                class="ml-2"
                v-model="model.to_cost"
                type="number"
                label="Đến giá"
              ></b-input>
            </div>
            <div v-else class="d-flex mt-2">
              <b-input
                v-model="model.from_cost"
                type="number"
                label="Giá"
              ></b-input>
            </div>
            <div class="d-flex mt-2">
              <b-input
                v-model="model.max_people"
                type="number"
                label="Số người"
              ></b-input>
            </div>
            <!-- <div class="d-flex mt-2">
              <b-input
                class="mr-2"
                v-model="model.email"
                label="Email"
              ></b-input>
              <b-input
                class="ml-2"
                v-model="model.phone"
                inputType="number"
                label="Số điện thoại"
              ></b-input>
            </div> -->
            <div class="d-flex mt-2">
              <b-autocomplete
                class="flex1"
                v-model="model.location"
                :items="locations.map(x => x.location_name)"
                label="Tỉnh/thành phố"
              ></b-autocomplete>
            </div>
            <div class="d-flex mt-2">
              <b-input
                class="flex1"
                v-model="model.address"
                label="Địa chỉ"
              ></b-input>
            </div>
          </div>
        </form-group>
        <form-group title="Danh mục hình ảnh">
          <div class="article-list w-100">
            <article-detail
              :value="article"
              @add="() => addArticle(index, articles)"
              @del="() => delArticle(index, articles)"
              v-for="(article, index) in articles.filter(x => x.state != $enums.ModelState.Delete)"
              :key="article.article_id"
              class="mb-4"
            >
            </article-detail>
            <div class="article-detail">
              <div class="article-head">
                <v-icon
                  @click="addArticle(articles.length, articles)"
                  icon="mdi-plus"
                ></v-icon>
              </div>
            </div>
          </div>
        </form-group>
      </v-col>
    </div>
    <div class="modal__footer pt4 pb4">
      <v-btn @click="close" class="modal_footer-btn">Hủy</v-btn>
      <v-btn @click="save" color="primary" class="modal_footer-btn ml8"
        >Lưu</v-btn
      >
    </div>
  </vue-final-modal>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
} from "@vue/runtime-core";
import FormGroup from "@/components/reuse-component/FormGroup.vue";
import ImagePicker from '@/components/reuse-component/ImagePicker.vue';
import ArticleDetail from "./ArticleDetail.vue";
import resortApi from "@/js/api/resort/ResortApi";
import BTextArea from "@/components/base/BTextArea.vue";
import BAutocomplete from "@/components/base/BAutocomplete.vue";
import { getImageLink } from '@/js/common/storage.js'
import locationApi from '@/js/api/resort/LocationApi'

export default {
  name: "ResortDetail",
  inheritAttrs: false,
  components: {
    FormGroup,
    ImagePicker,
    ArticleDetail,
    BTextArea,
    BAutocomplete,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const show = ref(true);

    const model = ref({});
    const mode = ref();
    const params = ref();

    const parentList = ref([]);

    const coverImages = ref([]);

    const locations = ref([]);

    const parent = computed({
      get() {
        return {
          value: model.value.parent_id || "",
          title: model.value.parent_name || "",
        };
      },
      set(value) {
        model.value.parent_id = value.value;
        model.value.parent_name = value.title;
      },
    });

    /**
     * Trước khi mở form
     */
    const beforeOpen = (event) => {
      model.value = { ...event.ref.params.value.data };
      mode.value = event.ref.params.value.mode;
      params.value = event.ref.params.value;

      locationApi.get().then(res => {
        locations.value = res.data;
      })

      if (mode.value == proxy.$enums.ModelState.Edit) {
        resortApi.getById(model.value.resort_id).then((res) => {
          model.value = res.data;
          model.value.from_cost  = parseInt(model.value.from_cost || 0);
          model.value.to_cost  = parseInt(model.value.to_cost || 0);
          if (model.value.articles && model.value.articles.length) {
            articles.value = model.value.articles;
          }
          if (model.value.image) {
            coverImages.value.push({
              src: model.value.image
            })
          }
        });
      }

      resortApi.list({
        Condition: {
          parent_id: null
        }
      }).then((res) => {
        parentList.value = res.data
          .filter((x) => x.resort_id != model.value.resort_id)
          .map((x) => {
            return {
              title: x.title,
              value: x.resort_id,
              ...x
            };
          });
      });
    };

    onMounted(() => {
      window._detail = proxy;
      console.log("ResortDetail");
    });

    /**
     * Thêm danh mục mới
     */
    const addArticle = (index, list) => {
      list.splice(index, 0, {
        article_id: proxy.$uuid.v1(),
        resort_id: model.value.resort_id,
        state: proxy.$enums.ModelState.Add,
        images: [],
      });
    };

    /**
     * Xóa danh mục
     */
    const delArticle = (index, list) => {
      if (index > -1) {
        let item = list[index];
        if (item.state == proxy.$enums.ModelState.Add) {
          list.splice(index, 1);
        } else {
          item.state = proxy.$enums.ModelState.Delete;
        }
      }
    };

    /**
     * Upload file lên storage
     */
    const uploadPhotos = () => {
      let images = [];
      for (const item of articles.value) {
        images = images.concat(
          item.images
            .filter((x) => x.state == proxy.$enums.ModelState.Add)
            .map((p) => {
              p.article_id = item.article_id;
              return p;
            })
        );
      }
      if (coverImages.value.length) {
        images = images.concat(coverImages.value.filter((x) => x.state == proxy.$enums.ModelState.Add));
      }
      if (images.length) {
        resortApi.uploadFile(images, {
          destination: `${model.value.resort_id}`,
        });
      }
    };

    /**
     * Sự kiện chọn thuộc
     */
    const chooseParent = (value) => {
      let parent = parentList.value.find(x => x.resort_id == value.value);

      if (parent) {
        model.value.phone = parent.phone;
        model.value.email = parent.email;
        model.value.province_name = parent.province_name;
        model.value.district_name = parent.district_name;
        model.value.type = proxy.$enums.ResortType.Room
      } else {
        model.value.type = proxy.$enums.ResortType.Resort
      }
    }

    /**
     * Thực hiện lưu
     */
    const save = async () => {
      let res = {};
      
      model.value.articles = articles.value;
      model.value.max_peple = model.value.max_peple || 1;
      let newId = proxy.$uuid.v1();
      let coverImageLst = coverImages.value.filter((x) => x.state == proxy.$enums.ModelState.Add);
      if (coverImageLst.length && coverImageLst[0].state == proxy.$enums.ModelState.Add) {
        model.value.image = getImageLink(coverImageLst[0].file_name, model.value.resort_id || newId);
      }
      
      switch (proxy.mode) {
        case proxy.$enums.ModelState.Add:
          if (!model.value.resort_id) {
            model.value.resort_id = newId;
          }
          res = await resortApi.post({
            Model: model.value,
          });
          break;
        case proxy.$enums.ModelState.Edit:
          res = await resortApi.put({
            Model: model.value,
            Condition: {
              resort_id: model.value.resort_id,
            },
          });
          break;
      }
      if (res.data) {
        uploadPhotos();
        if (typeof proxy.params.afterSave == "function") {
          proxy.params.afterSave();
        }
        proxy.$toast.success("Lưu dữ liệu thành công");
        show.value = false;
      }
    };

    const articles = ref([]);

    return {
      show,
      mode,
      save,
      params,
      beforeOpen,
      model,
      articles,
      delArticle,
      addArticle,
      parentList,
      parent,
      coverImages,
      chooseParent,
      locations
    };
  },
};
</script>

<style lang="scss">
.resort-detail {
  height: 95vh;
  .article-detail {
  }

  .form-col {
    padding: 0px;
  }

  .form-group {
    margin-bottom: 8px;
    padding: 8px;

    .form-group-title {
      margin-bottom: 8px;
    }

    .form-group-input {
      display: flex;
    }
  }

  .form-input + .form-input {
    margin-left: 8px;
  }
}
</style>