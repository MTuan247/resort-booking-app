<template>
  <div class="grid">
    <v-table cellspacing="0">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :fieldName="col.fieldName"
            :key="col.fieldName"
            :style="col.style"
            :class="'text-' + (col.align || 'left')"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr
          @dblclick="dbclickRow(row)"
          @click.ctrl="ctrlClickRow(index)"
          @click.right.exact.prevent="
            rightClickRow($event, row, index)
          "
          :class="{ selected: row['isSelected'] }"
          :key="row[this.idField]"
          v-for="(row, index) in records"
        >
          <template v-for="col in columns" :key="col.fieldName">
            <td v-if="col.fieldName == 'Checkbox'" class="check-box">
              <v-checkbox
                hide-details
                density="compact"
                v-model="row.isSelected"
              ></v-checkbox>
            </td>
            <td v-else-if="col.fieldName == 'Index'">{{ index + 1 }}</td>
            <td v-else-if="col.fieldName == 'Tree'">{{ index + 1 }}</td>
            <td v-else-if="col.fieldName == 'Action'">
              <slot name="action" :row="row"></slot>
            </td>
            <td v-else :style="col.style" :title="row[col.fieldName]">
              {{ row[col.fieldName] }}
            </td>
          </template>
        </tr> -->
        <b-grid-row
          :key="row[this.idField]"
          v-for="(row) in records.data"
          :row="row"
          :columns="columns"
          @checkbox="() => checkBox(row)"
          @dbclickRow="dbclickRow"
          @ctrlClickRow="ctrlClickRow"
          @rightClickRow="rightClickRow"
          :idField="idField"
          :parentField="parentField"
        >
          <template #action="{row}">
            <slot :row="row" name="action"></slot>
          </template>
        </b-grid-row>
      </tbody>
    </v-table>
    <Teleport to="body">
      <BContextMenu
        :contextMenuX="contextMenuX"
        :contextMenuY="contextMenuY"
        :contextMenuItems="[
          { title: 'Chọn', action: checkBox, payload: contextMenuIndex },
          { title: 'Sửa', action: editRow, payload: contextMenuPayload },
          { title: 'Xóa', action: deleteRow, payload: contextMenuPayload },
        ]"
      />
    </Teleport>
    <div v-if="paging" class="paging">
      <vue-awesome-paginate
        :total-items="records.total"
        :items-per-page="recordPerPage"
        :max-pages-shown="5"
        v-model="page"
        :on-click="changePage"
      />
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref } from "vue";
import BContextMenu from "./BContextMenu.vue";
import BGridRow from "./BGridRow.vue";
import { useTree } from "@/js/common/tree";
export default {
  name: "BGridTable",
  props: {
    columns: {},
    modelValue: {},
    selectedRows: {},
    isTreeGrid: {
      default: false,
    },
    paging: {
      default: false,
    },
    recordPerPage: {
      default: 10,
    },
    idField: {
      default: "id",
    },
    parentField: {
      default: "parent_id",
    },
  },
  data() {
    return {
      contextMenuX: null,
      contextMenuY: null,
      contextMenuPayload: null,
      contextMenuIndex: null,
      isContextMenu: true,
      isLoading: true,
    };
  },
  components: {
    BContextMenu,
    BGridRow,
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * Hàm xử lý dblclick vào hàng
     * @author: NMTuan (20/07/2021)
     */
    dbclickRow(item) {
      this.editRow(item);
    },
    /**
     * Hàm mở form
     * @author: NMTuan (20/07/2021)
     */
    editRow(item) {
      this.$emit("edit", item);
    },

    /**
     * Hàm xử lý ctrl-click vào row
     * @author: NMTuan (09/08/2021)
     */
    ctrlClickRow(index) {
      this.checkBox(index);
    },
    /**
     * Hàm xử lý khi right click vào row
     * @author: NMTuan (11/08/2021)
     */
    rightClickRow(event, item, index) {
      this.contextMenuX = event.pageX;
      this.contextMenuY = event.pageY;
      this.contextMenuPayload = item;
      this.contextMenuIndex = index;
      this.$eventBus.emit("showContext");
    },
    /**
     * Hàm xóa bản ghi
     * @author: NMTuan (13/08/2021)
     */
    deleteRow(item) {
      this.$emit("deleteRow", item);
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const { toTree } = useTree();

    const records = computed({
      get() {
        let data = []
        if (!proxy.isTreeGrid) {
          data = proxy.modelValue;
        } else {
          data = toTree(proxy.modelValue, proxy.idField, proxy.parentField);
        }
        
        if (proxy.paging && typeof data.slice == 'function') {
          let offset = (page.value - 1) * proxy.recordPerPage;
          return {
            total: data.length,
            data: [...data].slice(offset, offset + proxy.recordPerPage)
          };
        }

        return {
          data: data,
          total: data.length
        };
      },
      set(val) {
        proxy.$emit("update:modelValue", val);
      },
    });

    const checkBox = (row) => {
      row.isSelected = !row.isSelected
    }

    const page = ref(1);

    /**
     * Chọn trang
     * @param {*} iPage 
     */
     const changePage = (iPage) => {
      page.value = iPage;
    }

    return {
      records,
      checkBox,
      changePage,
      page
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/base/grid.scss";
</style>