<template>
  <div class="order admin-list">
    <div class="list-toolbar">
      <div class="list-toolbar-left">
        <v-breadcrumbs :items="['Quản lý', 'Đặt phòng']"></v-breadcrumbs>
      </div>
      <div class="list-toolbar-right">
      </div>
    </div>
    <div class="order-main">
      <toggle-collapse :defaultToggle="true">
        <template v-slot:header>
          <h4>Lịch đặt phòng</h4>
        </template>
        <template v-slot:content>
          <b-calendar :selectedDate="selectedDate" @clickDay="clickCalendarDay" @updatePeriod="updatePeriod"
            :data="orders"></b-calendar>
        </template>
      </toggle-collapse>


      <toggle-collapse class="mt-4">
        <template v-slot:header>
          <h4>Thông tin phòng trống</h4>
        </template>
        <template v-slot:content>
          <div class="resort-status">
            <div class="resort-status-date-picker">
              <VueDatePicker :enable-time-picker="false" @update:model-value="handleDatePick" v-model="selectedDate" inline text-input
                inline-with-input auto-apply />
            </div>
            <div class="resort-status-list">
              <div :key="resort.resort_id" v-for="resort in resortStatus" class="resort-status-item">
                <div class="resort-status-left">
                  <img :src="resort.image" class="resort-status-cover" />
                </div>
                <div class="resort-status-content">
                  <div class="resort-status-title">{{ resort.title }}</div>

                  <div class="resort-status-info">
                    <span class="resort-status-info-label">Tình trạng: </span>
                    <span :class="resort.is_full ? ' red' : 'green'">{{ resort.is_full ? 'Hết phòng' : `Còn
                      ${resort.quantity
                      - resort.number_of_orders}/${resort.quantity} phòng` }}</span>
                  </div>

                  <toggle-collapse :defaultToggle="false">
                    <template v-slot:header>
                      <div>Chi tiết</div>
                    </template>
                    <template v-slot:content>
                      <div :key="child.resort_id" v-for="child in resort._children"
                        class="resort-status-item--child resort-status-item">
                        <img :src="child.image" class="resort-status-cover resort-status-cover--child" />
                        <div class="resort-status-content resort-status-content--child">
                          <div class="resort-status-title">{{ child.title }}</div>
                          <div class="resort-status-info resort-status-info--child">
                            <span class="resort-status-info-label">Tình trạng: </span>
                            <span :class="child.is_full ? ' red' : 'green'">{{ child.is_full ? 'Hết phòng' : `Còn
                              ${child.quantity - child.number_of_orders}/${child.quantity} phòng`
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </template>

                  </toggle-collapse>


                </div>
              </div>
            </div>
          </div>
        </template>
      </toggle-collapse>

    </div>
  </div>
</template>

<script>

import baseList from "@/js/base/baseList";
import OrderApi from "@/js/api/order/OrderApi";
import { getCurrentInstance, onMounted, ref } from 'vue';
import BCalendar from '@/components/base/BCalendar.vue';
import ToggleCollapse from '@/components/reuse-component/ToggleCollapse.vue';
import moment from 'moment';
import { useTree } from '@/js/common/tree';

export default {
  name: "OrderList",
  extends: baseList,
  components: {
    BCalendar,
    ToggleCollapse
  },
  setup() {

    const { proxy } = getCurrentInstance();

    const api = OrderApi;
    const detailForm = 'OrderApi';
    const keyEntity = 'order_id';

    const dateTemplate = 'yyyy-MM-DD';

    const dateRange = ref({
      from_date: moment().startOf('month').format(dateTemplate),
      to_date: moment().endOf('month').format(dateTemplate),
    })

    const orders = ref([]);
    const resortStatus = ref([]);
    const selectedDate = ref(moment().format(dateTemplate));

    // Load dữ liệu
    const loadData = async () => {
      var res = await proxy.api.post({ from_date: dateRange.value.from_date, to_date: dateRange.value.to_date });
      orders.value = proxy.customData(res.data)
    }

    const { toTree } = useTree();

    onMounted(() => {
      loadResortStatus();
    })

    /**
     * Load trạng thái khu nghỉ dưỡng
     */
    const loadResortStatus = async () => {
      var res = await proxy.api.resortStatus({ date: selectedDate.value });
      let dataTree = toTree(res.data, 'resort_id', 'parent_id');
      for (const item of dataTree) {
        if (item._children?.length) {
          item.is_full = item._children.every(x => x.is_full);
          let quantity = 0;
          let number_of_orders = 0;
          for (const child of item._children) {
            quantity += child.quantity;
            number_of_orders += child.number_of_orders;
          }
          item.quantity = quantity;
          item.number_of_orders = number_of_orders;
        }
      }
      resortStatus.value = dataTree;
    }

    /**
     * Cập nhật khoảng thời gian calendar
     * @param {*} item 
     */
    const updatePeriod = (item) => {
      dateRange.value.from_date = item.start;
      dateRange.value.to_date = item.end;
      loadData();
    }

    /**
     * Chọn thời gian
     * @param {*} date 
     */
    const clickCalendarDay = (date) => {
      selectedDate.value = date;
      loadResortStatus();
    }

    /**
     * Chọn thời gian
     * @param {*} date 
     */
    const handleDatePick = (date) => {
      selectedDate.value = date;
      loadResortStatus();

    }

    return {
      api,
      detailForm,
      keyEntity,
      loadData,
      orders,
      updatePeriod,
      selectedDate,
      clickCalendarDay,
      resortStatus,
      handleDatePick
    };
  },
};
</script>

<style lang="scss">
.order {
  .order-main {
    display: flex;
    flex-direction: column;
    // height: 0px;
    // overflow: auto;
    // flex: 1;

    .resort-status {
      display: flex;
      flex-direction: row;

      .resort-status-list {
        flex: 1;
        margin-left: 16px;

        .resort-status-item {
          display: flex;
          flex-direction: row;
          padding: 8px;

          .resort-status-cover {
            width: 200px;
            object-fit: contain;
            border-radius: 8px;

            &.resort-status-cover--child {
              width: 100px;
            }
          }

          .resort-status-content {
            margin-left: 8px;

            .resort-status-title {}

            .resort-status-info {
              .green {
                color: var(--parakeet);
              }

              .red {
                color: var(--red);
              }
            }
          }
        }

      }
    }
  }
}
</style>