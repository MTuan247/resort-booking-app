<template>
  <div class="feedback admin-list">
    <div class="list-toolbar">
      <div class="list-toolbar-left">
        <v-breadcrumbs :items="['Quản lý', 'Đánh giá']"></v-breadcrumbs>
      </div>
      <div class="list-toolbar-right">
      </div>
    </div>
    <div class="feedback-main">

      <div class="feedback-left">

        <VueDatePicker :teleport="true" @update:model-value="handleDatePick" :auto-apply="true"
          :enable-time-picker="false" :format="'dd/MM/yyyy'" class="date-picker" v-model="date" range
          :preset-ranges="presetRanges">
          <template #yearly="{ label, range, presetDateRange }">
            <span @click="presetDateRange(range)">{{ label }}</span>
          </template>
        </VueDatePicker>

        <div @click="loadCommentData(resort.resort_id)" :key="resort.resort_id" v-for="resort in resorts"
          class="resort-item">
          <div class="resort-left">
            <img :src="resort.image" class="resort-cover" />
          </div>
          <div class="resort-content">
            <div class="resort-title">{{ resort.title }}</div>

            <div class="resort-info">

            </div>

          </div>
        </div>

      </div>
      <div class="feedback-right">
        <template v-if="feedback.total_pages">
          <div class="comment-list">
            <div class="comment" :key="comment.comment_id" v-for="comment in feedback.comments">
              <div class="user-comment">
                <v-avatar class="pointer" v-bind="props" color="info">
                  <v-img v-if="comment.user?.avatar" alt="Avatar" :src="comment.user?.avatar"></v-img>
                  <v-icon v-else icon="mdi-account-circle"></v-icon>
                </v-avatar>
                <div class="user-comment__title">
                  <div class="user-name">{{ comment.user?.name }}</div>
                  <div class="comment-date">{{ formatDate(comment.created_date) }}</div>
                </div>
              </div>
              <div class="comment-title">{{ comment.title }}</div>
              <div class="comment-detail">{{ comment.comment }}</div>
            </div>

          </div>
          <div class="paging">
            <v-pagination v-model="page" :pages="feedback.total_pages" :range-size="1" active-color="#DCEDFF" />
          </div>
        </template>
        <template v-else>
          <div class="no-data"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import baseList from "@/js/base/baseList";
import FeedbackApi from "@/js/api/feedback/FeedbackApi";
import { getCurrentInstance, ref } from 'vue';
import ResortApi from '@/js/api/resort/ResortApi';
import { mapState } from 'vuex';
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, addMonths, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
// import moment from 'moment';
import VPagination from "@hennge/vue3-pagination";
import { formatDate } from "@/js/common/format";

export default {
  name: "FeedbackList",
  extends: baseList,
  components: {
    VPagination
  },
  computed: {
    ...mapState('moduleAuth', ['user']),
  },
  setup() {

    const { proxy } = getCurrentInstance();

    const api = FeedbackApi;
    const detailForm = '';
    const keyEntity = 'comment_id';

    const from_date = ref(startOfMonth(new Date()));
    const to_date = ref(endOfMonth(new Date()));
    const date = ref([from_date.value, to_date.value]);
    const page = ref(1);
    const limit = 10;
    const resorts = ref([]);
    const resortId = ref(null);
    const feedback = ref({
      comments: [],
      total_record: 0,
      total_pages: 0
    })

    const presetRanges = ref([
      { label: 'Hôm nay', range: [startOfDay(new Date()), endOfDay(new Date())] },
      { label: 'Tuần này', range: [startOfWeek(new Date()), endOfWeek(new Date())] },
      { label: 'Tháng này', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
      {
        label: 'Tháng trước',
        range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
      },
      {
        label: 'Tháng sau',
        range: [startOfMonth(addMonths(new Date(), 1)), endOfMonth(addMonths(new Date(), 1))],
      },
      { label: 'Năm nay', range: [startOfYear(new Date()), endOfYear(new Date())] },
    ]);


    // const dateTemplate = 'yyyy-MM-DD';

    // const dateRange = ref({
    //   from_date: moment().startOf('month').format(dateTemplate),
    //   to_date: moment().endOf('month').format(dateTemplate),
    // })

    // Load dữ liệu
    const loadData = async () => {
      let res = await ResortApi.list({ Condition: { user_id: proxy.user?.user_id, parent_id: null } });
      resorts.value = res.data;

      if (resorts.value?.length) {
        loadCommentData(resorts.value[0].resort_id);
      }
    }

    /**
     * Load dữ liệu comment
     */
    const loadCommentData = async (resort_id) => {
      resortId.value = resort_id;
      let param = {
        resort_id: resort_id,
        limit: limit,
        offset: limit * (page.value - 1),
        from_date: from_date.value,
        to_date: to_date.value
      }
      let result = await proxy.api.paging(param);

      feedback.value = result.data;

    }

    /**
     * Chọn ngày
     */
    const handleDatePick = (modelData) => {
      if (!modelData) {
        from_date.value = null;
        to_date.value = null;
      } else {
        [from_date.value, to_date.value] = modelData;
      }

      loadCommentData(resortId.value)
    }

    return {
      api,
      detailForm,
      keyEntity,
      loadData,
      resorts,
      date,
      presetRanges,
      handleDatePick,
      page,
      limit,
      feedback,
      loadCommentData,
      formatDate
    };
  },
};
</script>

<style lang="scss">
.feedback {

  .no-data {
    height: 100%;
    background-image: url('@/assets/no-data.png');
    background-repeat: no-repeat;
    background-size: 200px;
    background-position: center;
    position: relative;

    &::before {
      content: 'Không có dữ liệu';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(calc(-50% + 100px));
    }
  }

  .feedback-main {
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 0px;

    .feedback-left {
      flex: 2;
      border-right: solid 1px #ddd;

      .date-picker {
        padding: 8px;
      }

      .resort-item {
        display: flex;
        flex-direction: row;
        padding: 8px;
        cursor: pointer;

        .resort-cover {
          width: 100px;
          object-fit: contain;
          border-radius: 8px;
        }

        .resort-content {
          margin-left: 8px;
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 0px;

          .resort-title {
            white-space: nowrap;
            overflow: hidden;
            max-width: 100%;
            text-overflow: ellipsis;
          }

          .resort-info {
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

    .feedback-right {
      flex: 3;
      display: flex;
      flex-direction: column;

      .comment-list {
        padding: 8px;
        height: 0px;
        flex: 1;
        overflow: auto;

        .comment {
          .user-comment {
            display: flex;
          }
        }
      }

      .paging {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>