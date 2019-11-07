<template>
  <div>
  <!-- 分頁 -->
    <nav aria-label="Page navigation example" class="d-flex justify-content-center"
      v-if="pagination.total_pages>=0">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="updatePage(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
          :class="{'active':pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="updatePage(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pagination: {
      type: Object
    }
  },
  methods: {
    updatePage (page) {
      console.log('分頁元件', page)
      this.$emit('getPage', page)
    }
  }
}
</script>
