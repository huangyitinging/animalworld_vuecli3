<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div>
      <div class="container my-5 mb-8">
        <div class="row">
          <div class="col-lg-6" >
            <div class="product-wrap">
              <div class="product-img border"
                :style="{backgroundImage:`url(${product.imageUrl})`}">
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <span class="badge badge-secondary h5">{{product.category}}</span>
            <h1 class="h3 text-dark">{{product.title}}</h1>
            <p>{{product.description}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">{{product.origin_price | currency}}</div>
              <div class="h6 origin-price" v-if="product.price">原價{{product.origin_price | currency}}</div>
              <div class="h4 text-danger" v-if="product.price">{{product.price | currency}}</div>
            </div>
            <select class="custom-select my-3" name="" v-model="product.num">
              <option value="0" disabled selected>請選擇數量</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
            <button type="button" class="btn btn-block btn-success py-2"
              @click="addtoCart(product.id,product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id ===status.loadingItem"></i>
              加入購物車</button>
            <div>
              <p class="h5 mt-3">【產品說明】</p>
              <p>{{product.content}}</p>
            </div>
            <div class="border-top mt-3">
              <p class="h5 mt-3">【優惠活動】</p>
              <router-link to="/coupon">現在填寫汪喵 Q&A 即可獲得折扣碼</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productID: '',
      product: {},
      status: {
        loadingItem: ''
      },
      isLoading: false,
      cart: {}
    }
  },
  methods: {
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.product = response.data.product
        console.log(response.data)
        // 預設 選購數量是一
        vm.$set(vm.product, 'num', 1)
        vm.isLoading = false
      })
    },
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
        this.$bus.$emit('message:push', response.data.message, 'warning')
        vm.isLoading = false
      })
    }
  },
  created () {
    const vm = this
    vm.productID = vm.$route.params.id
    vm.getProduct(vm.productID)
  }
}
</script>

<style lang="scss">
.product-img{
    position: relative;
    height: 400px;
    background-size:cover;
    background-position:center;
}
@media (min-width: 768px){
    .product-wrap{
    padding-right: 50px;
    padding-bottom: 60px;
}
}
.origin-price{
    text-decoration: line-through;
}
</style>
