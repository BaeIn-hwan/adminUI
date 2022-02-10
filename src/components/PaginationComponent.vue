<template>
  <div>
    <template v-if="loading == false">

    </template>

    <template v-else-if="loading == true">
      <div class="pagination">
        <button
          type="button"
          class="pagination__btn pagination__btn--first"
          v-if="pagination.rowCount < pageArray.length"
          :style="pageGroupNum == 1 ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.rowCount * (pageGroupNum - 1));"
        >
          <span class="blind">첫 페이지</span>
        </button>

        <button
          type="button"
          class="pagination__btn pagination__btn--prev"
          :style="pagination.current == 1 ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.current - 1);"
        >
          <span class="blind">이전 페이지</span>
        </button>

        <ul class="pagination__box">
          <li class="pagination__list" v-for="(idx, index) in pageViewArray" :key="index">
            <a
              href="#"
              class="pagination__btn pagination__btn--number"
              :class="pagination.current == idx ? 'on' : ''"
              @click.prevent="pageMove($event, idx);"
            >
              <span>{{idx}}</span>
            </a>
          </li>      
        </ul>

        <button
          type="button"
          class="pagination__btn pagination__btn--next"
          :style="pagination.current == pageArray[pageArray.length - 1] ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.current + 1);"
        >
          <span class="blind">다음 페이지</span>
        </button>

        <button
          type="button"
          class="pagination__btn pagination__btn--last"
          v-if="pagination.rowCount < pageArray.length"
          :style="pageArray.length / pagination.rowCount < pageGroupNum ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.rowCount * pageGroupNum + 1);"
        >
          <span class="blind">마지막 페이지</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    pagination:  {
      type: Object,
      default: () => {
        return {
          id: null,
          current: 1,
          rowCount: 5,
          listLength: 20,
          total: 0,
        }
      },
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      pageGroupNum: 1,
      pageArray: [],
      pageViewArray: [],
    }
  },
  created() {
    this.pageInit();
  },
  watch: {
    pagination: {
      handler(newValue) {
        this.pageDraw(newValue.current)
      },
      deep: true,
    }
  },
  methods: {
    pageInit() {
      this.pageArray = [];

      const pageCount = Math.ceil(this.pagination.total / this.pagination.listLength);
      const _current = this.pagination.current;

      for (let i = 1; i <= pageCount; i++) {
        this.pageArray.push(i);
      }
			
      this.pageDraw(_current);
    },
    pageDraw(_current) {
      const rowCount = this.pagination.rowCount;
      const pageDivision = Math.ceil(this.pageArray.length / rowCount);
      let firstPage = 1;
      let lastPage = rowCount;

      for (let i = 0; i < pageDivision; i++) {
        if (firstPage + rowCount * i <= _current && _current <= lastPage + rowCount * i) {
          this.pageGroupNum = i + 1;
          this.pageViewArray = this.pageArray.slice((firstPage + rowCount * i) - 1, lastPage + rowCount * i);
        }
      }
    },
    pageMove(e, pageNumber) {
      this.$emit("movePage", {
        e,
        id: this.pagination.id,
        pageNumber,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 50px;
  font-size: 0;
  text-align: center;

  &__btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    vertical-align: top;

    &--first {
      margin-right: 5px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat 0 0;
    }

    &--prev {
      margin-right: 5px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat -20px 0;
    }

    &--number {
      display: block;
      font-size: 0;
      color: #aaa;

      span {
        display: inline-block;
        position: relative;
        padding: 0 3px;
        font-size: 12px;
        vertical-align: middle;
      }

      &.on {
        color: #000;

        span {
          &:before {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0; 
            width: 100%;
            height: 2px;
            background: #000;
          }
        }
      }
    }

    &--next {
      margin-left: 5px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat -40px 0;
    }

    &--last {
      margin-left: 5px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat -60px 0;
    }
  }

  &__box {
    display: inline-block;
    margin: 0 -2px;
    font-size: 0;
    vertical-align: top;
  }

  &__list {
    display: inline-block;
    margin: 0 2px;
    vertical-align: top;
  }
}
</style>