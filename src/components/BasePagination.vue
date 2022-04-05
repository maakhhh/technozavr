<template>
  <!-- eslint-disable max-len -->
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="" class="pagination__link pagination__link--arrow" @click.prevent="buttonPrev()" :class="{'pagination__link--disabled': page === 1}" aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pageCount" :key="pageNumber">
      <a href="" class="pagination__link" @click.prevent="changePage(pageNumber)" :class="{'pagination__link--current': pageNumber === page}">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" @click.prevent="buttonNext()" :class="{'pagination__link--disabled': page === pageCount}" href="" aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
  <!-- eslint-enable max-len -->
</template>

<script>
export default {
  name: 'BasePagination',
  props: ['page', 'perPage', 'count'],
  model: {
    prop: 'page',
    event: 'change',
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
    },

    buttonNext() {
      if (this.page !== this.pageCount) {
        this.changePage(this.page + 1);
      }
    },

    buttonPrev() {
      if (this.page !== 1) {
        this.changePage(this.page - 1);
      }
    },
  },
};
</script>
