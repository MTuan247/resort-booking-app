<template>
  <div
    :class="{
      'flex flex-col w-full mt-2 flex-shrink-0 border rounded bg-light': !customWrap,
      'border border-[#F55646]': error,
    }"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <input
      id="assetsFieldHandle"
      ref="imagesList"
      type="file"
      :multiple="multiple"
      class="w-px h-px opacity-0 overflow-hidden absolute"
      accept=".pdf,.jpg,.jpeg,.png,.avif,.jfif"
      @change="onChange"
    >

    <label
      v-if="!imagesList.filter(x => x.state != $enums.ModelState.Delete).length"
      @click="$refs.imagesList.click()"
      class="flex flex-col w-full py-10 px-6 items-center justify-center cursor-pointer"
    >
      <slot name="label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="62"
          height="62"
          fill="none"
          viewBox="0 0 62 62"
        >
          <path
            fill="#1B2F51"
            fill-opacity=".3"
            fill-rule="evenodd"
            d="M42.625 17.438v27.331c0 5.4-3.953 10.204-9.326 10.721-6.174.594-11.341-4.237-11.341-10.282v-31.93c0-3.384 2.428-6.458 5.787-6.794a6.459 6.459 0 017.13 6.433v27.125a2.59 2.59 0 01-2.584 2.583 2.59 2.59 0 01-2.583-2.583V17.437c0-1.059-.878-1.937-1.938-1.937-1.059 0-1.937.878-1.937 1.938V39.68c0 3.384 2.428 6.458 5.787 6.794a6.459 6.459 0 007.13-6.432V13.356c0-5.4-3.953-10.204-9.326-10.721-6.148-.594-11.341 4.237-11.341 10.282v31.697c0 7.414 5.425 14.053 12.813 14.751 8.5.775 15.604-5.838 15.604-14.157v-27.77c0-1.06-.879-1.938-1.938-1.938s-1.937.878-1.937 1.938z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="my-3">Upload your images</div>
        <div class="text-xs opacity-40">JPG, PNG and less than 2MB</div>
        <div>
          Drag and drop or <span class="text-info underline">select</span>
          your project images here
        </div>
      </slot>
    </label>

    <div
      v-else
      class="d-flex flex-row flex-wrap w-full max-h-full"
      :class="{
        'py-10 px-6 gap-4 items-start justify-start': multiple,
        'items-center justify-center': !multiple,
      }"
    >
      <div
        v-for="(file, idx) in imagesList.filter(x => x.state != $enums.ModelState.Delete)"
        :key="idx"
        class="relative overflow-hidden rounded-lg"
        :class="multiple ? 'w-[200px] h-[200px]' : 'w-full h-full'"
        @click="false"
      >
        <img
          :src="file.src"
          alt=""
          class="w-full h-full object-cover"
          :height="height"
          :width="width"
        >
        <button
          class="absolute flex items-center justify-center top-2 right-2 w-[40px] h-[40px] bg-info rounded pointer"
          type="button"
          title="Remove file"
          @click="remove(imagesList.indexOf(file))"
        >
          <v-icon icon="mdi-delete-outline"></v-icon>
        </button>
      </div>
      
      <label
        v-if="multiple"
        @click="$refs.imagesList.click()"
        class="relative flex items-center justify-center bg-white border border-dashed overflow-hidden w-[200px] h-[200px] rounded-lg cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="width"
          :height="height"
          fill="none"
          viewBox="0 0 60 60"
        >
          <circle
            cx="30"
            cy="30"
            r="28.5"
            fill="#fff"
            stroke="#2775F9"
            stroke-width="3"
          />
          <path
            fill="#2775F8"
            d="M20.184 32.285V29.16h8.125v-8.223h3.066v8.223H39.5v3.125h-8.125v8.3h-3.066v-8.3h-8.125z"
          />
        </svg>
      </label>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ImagePicker',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    customWrap: {
      type: Boolean,
      default: false,
    },
    height: {
      default: null
    },
    width: {
      default: null
    }
  },
  emits: ['update:images'],
  data() {
    return {
      error: '',
    }
  },
  computed: {
    imagesList: {
      get() {
        return this.images
      },
      set(value) {
        this.$emit(`update:images`, value)
      },
    },
  },
  methods: {
    onChange() {
      const imagesList = this.$refs.imagesList
      const files = [...imagesList.files];
      if (!this.imagesList.length) {
        this.imagesList = files.map((p) => {
          p.src = URL.createObjectURL(p);
          p.image_id = this.$uuid.v1();
          p.state = this.$enums.ModelState.Add;
          p.file_name = `${p.name}`;
          return p
        })
      } else {
        this.imagesList.push(
          ...files.map((p) => {
            p.src = URL.createObjectURL(p);
            p.image_id = this.$uuid.v1();
            p.state = this.$enums.ModelState.Add;
            p.file_name = `${p.name}`;
            return p
          })
        )
      }
    },
    remove(i) {
      let image = this.imagesList[i];
      if (image.state == this.$enums.ModelState.Add) {
        this.imagesList.splice(i, 1);
      } else {
        image.state = this.$enums.ModelState.Delete;
      }
    },
    dragover(event) {
      event.preventDefault()
      // Add some visual fluff to show the user can drop its files
      if (!(event.currentTarget).classList.contains('bg-green-300')) {
        (event.currentTarget).classList.remove('bg-gray-100');
        (event.currentTarget).classList.add('bg-green-300');
      }
    },
    dragleave(event) {
      // Clean up
      (event.currentTarget).classList.add('bg-gray-100');
      (event.currentTarget).classList.remove('bg-green-300');
    },
    drop(event) {
      event.preventDefault()
      if (
        !this.multiple &&
        (this.imagesList.length >= 1 || (event.dataTransfer).files.length > 1)
      ) {
        this.error = "Can't drop more then 1 file"
      } else {
        (this.$refs.imagesList).files = (event.dataTransfer).files
        this.onChange() // Trigger the onChange event manually
      }
      // Clean up
      (event.currentTarget).classList.add('bg-gray-100');
      (event.currentTarget).classList.remove('bg-green-300');
    },
  },
})
</script>
