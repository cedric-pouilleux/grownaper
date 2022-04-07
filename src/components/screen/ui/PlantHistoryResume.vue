<template>
  <el-scrollbar>
    <div class="history" v-if="history">
      <el-timeline v-if="mode === 'PER_DAYS'">
        <el-timeline-item
          center
          v-for="(activity, index) in historiesByDate"
          :key="index"
          placement="top"
          :timestamp="readableDate(activity.date)">
          <ul class="action-list">
            <li v-for="(action, index) in activity.actions" :key="index">
              <span class="date">{{ readableTime(action.date) }}</span>
              <span :class="action.action">{{action.message}}</span>
            </li>
          </ul>
        </el-timeline-item>
      </el-timeline>

      <el-timeline v-else>
        <el-timeline-item
          center
          v-for="(activity, index) in history"
          :key="index"
          placement="top"
          :timestamp="readableDate(activity.date)">
          {{activity.message}}
        </el-timeline-item>
      </el-timeline>

    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { PlantHistory, HistoryType, historyDisplayMode } from '@/common/types';
import Moment from 'moment';
import { ONLY_TIME, READABLE_DATE } from '@/common/DateFormatConfig';

const actionHistoryType = {
  SIMPLE: {
    color: '',
    size: 'normal',
    hollow: false,
  },
  IMPORTANT: {
    color: 'danger',
    size: 'large',
    hollow: false,
  },
  SERVICE: {
    color: 'warning',
    size: 'large',
    hollow: false,
  },
};

interface SortedHistory {
  date: Date | string,
  actions: PlantHistory[]
}

export default defineComponent({
  name: 'PlantHistoryResume',
  props: {
    history: {
      type: Array as PropType<PlantHistory[]>,
    },
    mode: String as PropType<historyDisplayMode>,
  },
  setup(props) {
    const historiesByDate = computed((): SortedHistory[] => {
      const sorted: SortedHistory[] = [];
      props.history?.forEach((historyItem) => {
        const sortIndex = sorted.findIndex(
          (sortedItem: SortedHistory): boolean => Moment(historyItem.date).isSame(sortedItem.date, 'days'),
        );
        if (sortIndex !== -1) {
          const res: SortedHistory = sorted[sortIndex];
          if (!res.actions) {
            res.actions = [];
          }
          res.actions.push(historyItem);
        } else {
          const { date } = historyItem;
          const obj: SortedHistory = { date, actions: [historyItem] };
          sorted.push(obj);
        }
      });
      return sorted;
    });

    const readableTime = (date: Date | string) => Moment(date).format(ONLY_TIME);

    return {
      readableDate: (date: Date | string): string => Moment(date).format(READABLE_DATE),
      getType: (hType: HistoryType): string => actionHistoryType[hType].color,
      getSize: (hType: HistoryType): string => actionHistoryType[hType].size,
      getHollow: (hType: HistoryType): boolean => actionHistoryType[hType].hollow,
      readableTime,
      historiesByDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.history {
  margin: 20px;
}

ul.action-list {
  li {
    border-bottom: 1px dotted #ebebeb;
    padding: 4px;
    font-size: .8em;

    .date {
      font-weight: 700;
      margin-right: 10px;
    }

    .START_FLO {
      color: orange;
      font-weight: 700;
    }

    .START_CURRING {
      color: green;
      font-weight: 700;
    }

    .ADD, .EDIT {
      color: #333;
    }

  }
}
</style>
