<template>
  <div class="article-detail">
    <div class="article-head">
      <v-icon @click="add" icon="mdi-plus"></v-icon>
      <v-icon @click="del" icon="mdi-close"></v-icon>
    </div>
    <div class="article-content">
      <div class="article-title">
        <b-input @input="changeData" v-model="modelValue.title" label="Tiêu đề"></b-input>
      </div>
      <div v-if="modelValue.images" class="article-images">
        <image-picker class="article-images-picker" multiple :width="160" :height="160" v-model:images="modelValue.images"></image-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
import ImagePicker from '@/components/reuse-component/ImagePicker.vue';
export default {
  name: 'ArticleDetail',
  props: {
    value: {
      default: () => {}
    },

  },
  components: {
    ImagePicker
  },
  setup() {
    const { proxy } = getCurrentInstance();

    /**
     * Xử lý cập nhật 2 chiều dữ liệu
     */
    const modelValue = computed({
      get() {
        return proxy.value;
      },
      set(val) {
        if (val.state != proxy.$enums.ModelState.Add) {
          val.state = proxy.$enums.ModelState.Edit;
        }
        proxy.$emit("update:modelValue", val)
      }
    });

    const changeData = () => {
      if (modelValue.value.state != proxy.$enums.ModelState.Add) {
        modelValue.value.state = proxy.$enums.ModelState.Edit;
      }
    }

    const add = () => {
      proxy.$emit('add');
    }

    const del = () => {
      proxy.$emit('del');
    }

    return {
      modelValue,
      add,
      del,
      changeData
    }
  }
};
</script>

<style lang="scss">
.article-detail {
  border: 1px solid var(--border-color);

  .article-head {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: var(--l-gray);
    height: 32px;
  }

  .article-content {
    min-height: 180px;
  }
}
</style>