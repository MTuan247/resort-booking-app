<template>
  <div class="search-wrapper">
    <v-row justify="space-between">
      <v-col class="province-col filter-col" :cols="4">
        <b-combobox
          :variant="null"
          class="filter-combobox province-combobox"
          placeholder="Tỉnh/thành phố"
          :items="provinces"
          v-model="province"
          @update:modelValue="chooseProvince"
        ></b-combobox>
      </v-col>
      <v-col class="district-col filter-col" :cols="4">
        <b-combobox
          :variant="null"
          class="filter-combobox district-combobox"
          placeholder="Quận/huyện"
          :items="districts"
          v-model="district"
        ></b-combobox>
      </v-col>
      <v-col class="number-col filter-col" :cols="4">
        <div class="d-flex search-combo-wrapper">
          <b-input
            :variant="null"
            placeholder="Tên khu nghỉ dưỡng"
            class="filter-combobox last-combobox number-combobox"
            v-model="querySearch"
          ></b-input>
          <v-btn @click="handleSearch" class="search-btn" icon color="info">
            <v-icon>mdi-magnify </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BCombobox from "@/components/base/BCombobox";
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onBeforeMount, onMounted } from '@vue/runtime-core';
import { mapActions, mapState } from 'vuex'
import locationApi from '@/js/api/resort/LocationApi'

export default {
  name: "SearchBar",
  props: {
    afterSearch: {
      default: () => {},
      type: Function
    }
  },
  components: {
    BCombobox,
  },
  methods: {
    ...mapActions('moduleSearch', ['search']),
  },
  computed: {
    ...mapState('moduleSearch', ['queryText', 'province_name', 'district_name']),
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const province = ref();
    const district = ref();
    const querySearch = ref("");

    const provinces = ref([]);

    const districts = ref([]);

    const locations = ref([]);

    onBeforeMount(() => {
      locationApi.get().then(res => {
        locations.value = res.data;
        provinces.value = locations.value.filter(x => !x.parent_id).map(x => x.location_name);
      })
    });

    /**
     * Chọn tỉnh/ thành phố
     */
    const chooseProvince = (value) => {
      district.value = null;
      let location = locations.value.find(x => x.location_name == value);
      if (location) {
        let id = location.location_id;
        districts.value = locations.value.filter(x => x.parent_id == id).map(x => x.location_name);
      }
    }

    onMounted(() => {
      province.value = proxy.province_name;
      district.value = proxy.district_name;
      querySearch.value = proxy.queryText;
    })

    // const numberPersons = ref(["1 - 5 người", "5 -10 người"]);

    const handleSearch = () => {
      proxy.search({
        province_name: province.value,
        district_name: district.value,
        queryText: querySearch.value
      }).then(() => {
        if (proxy.afterSearch && typeof proxy.afterSearch == 'function') {
          proxy.afterSearch(province.value, district.value, querySearch.value);
        }
        proxy.$router.push('/search');
      }).finally(() => {
      })
    }

    return {
      province,
      provinces,
      district,
      districts,
      // numberPersons,
      handleSearch,
      querySearch,
      chooseProvince
    };
  },
};
</script>

<style lang="scss">
.search-wrapper {
  border: 1px solid var(--border-color);
  padding: 8px;
  border-radius: 36px;
  max-width: 900px;
  width: 75%;
  margin: auto;

  .filter-col {
    display: flex;
    align-items: center;
    .search-combo-wrapper {
      flex: 1;
      align-items: center;
    }
  }

  .filter-combobox {
    flex: 1;
    &:not(.last-combobox) {
      padding-right: 4px;
      border-right: 1px solid var(--border-color);
    }

    &.last-combobox {
      flex: 1;
    }

  }
}
</style>