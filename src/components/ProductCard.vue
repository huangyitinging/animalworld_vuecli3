<template>
  <div class="mb-2">
    <loading :active.sync="isLoading"></loading>
    <div class="card border-0 shadow-sm">
      <a href="#" class="petproduct-img" @click.prevent="productContent(cardItem.id)">
        <div style="height: 150px; background-size: cover; background-position: center"
          :style="{backgroundImage:`url(${cardItem.imageUrl})`}">
        </div>
      </a>
      <div class="card-body">
        <span class="badge badge-secondary float-right ml-2">{{cardItem.category}}</span>
        <h5 class="card-title">
          <a href="#" class="text-dark" @click="productContent(cardItem.id)">
            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === cardItem.id"></i>
              {{cardItem.title}}
          </a>
        </h5>
        <p class="card-text">{{cardItem.description}}</p>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <div class="h5" v-if="!cardItem.price">{{cardItem.origin_price | currency}}</div>
            <div class="h6 originprice" v-if="cardItem.price">原價 {{cardItem.origin_price | currency}}</div>
            <div class="h4 text-danger" v-if="cardItem.price">{{cardItem.price | currency}}</div>
          </div>
          <div class="">
            <a href="#" class="btn btn-primary rounded-circle text-white p-2"
              @click="addtoCart(cardItem.id,1)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === cardItem.id"></i>
              <i class="fas fa-shopping-cart fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cardItem'],
  data () {
    return {
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  methods: {
    addtoCart (item, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: item,
        qty
      }
      vm.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        console.log(response.data)
        vm.$bus.$emit('updateCart')
        vm.$bus.$emit('message:push', response.data.message, 'warning')
        vm.isLoading = false
      })
    },
    productContent (id) {
      const vm = this
      vm.$router.push(`product/${id}`)
    }
  },
  created () {
    // this.getCart()
  }
}
</script>
