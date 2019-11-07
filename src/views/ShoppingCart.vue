<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5 justify-content-center">
      <div class="my-5 row justify-content-center">
        <div class="col-9">
          <div class="d-flex justify-content-center mb-5" v-if="cart.carts.length != 0">
            <div class="bg-success progress-list">
              <div><i class="fas fa-cart-plus fa-3x text-white"></i></div>
              <div class="text-white h5 mt-2">1.確認清單</div>
            </div>
            <div class="bg-gray progress-list d-md-block d-none">
              <div><i class="far fa-credit-card fa-3x text-muted"></i></div>
              <div class="text-muted h5 mt-2">2.填寫訂購資料</div>
            </div>
            <div class="bg-gray progress-list d-md-block d-none">
              <div><i class="fas fa-list-alt fa-3x text-muted"></i></div>
              <div class="text-muted h5 mt-2">3.完成訂單</div>
            </div>
          </div>
          <div class="h2 text-center text-muted mb-4">購物車清單</div>
          <div v-if="cart.carts.length != 0">
            <table class="table my-4" style="font-size:1rem">
              <thead>
                <tr>
                  <th width="20%" class="d-md-table-cell"></th>
                  <th>商品名稱</th>
                  <th width="20%">數量</th>
                  <th width="15%">小計</th>
                  <th width="15%" style="text-align:center">刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="table-img">
                    <div style="width:100%; background-size: cover; background-position: center;padding-bottom:100%"
                      :style="{backgroundImage:`url(${item.product.imageUrl})`}">
                    </div>
                  </td>
                  <td class="align-middle">
                    <span>{{item.product.title}}</span>
                    <div class="text-danger"  style="font-size:0.8rem" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td class="align-middle">{{item.qty}} / {{item.product.unit}}</td>
                  <td class="align-middle text-right">
                    <div>{{item.final_total | currency}}</div>
                  </td>
                  <td class="align-middle text-center">
                    <a href="#" class="text-muted" @click="removeCartItem(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray">
                <tr>
                  <td colspan="4" class="text-right">總計</td>
                  <td class="text-right">{{ cart.total | currency}}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="4" class="text-right text-danger border-top-0">折扣價</td>
                  <td class="text-right text-danger border-top-0">{{cart.final_total | currency}}</td>
                </tr>
              </tfoot>
            </table>
            <div class="h6 text-muted">
              <router-link to="/coupon" class="text-muted">還沒拿到折扣碼？手刀領取 go go</router-link>
            </div>
            <div class="input-group mb-5 input-group-md">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入折扣碼">
              <div class="input-group-append">
                <button class="btn btn-secondary" type="button" @click="addCouponCode">
                  使用折扣碼
                </button>
              </div>
            </div>
            <div class="d-flex">
              <div class="mr-auto">
                <router-link class="btn btn-secondary" to="/petproduct">
                  <i class="fas fa-arrow-left mr-2"></i>繼續購物
                </router-link>
              </div>
              <div>
                <router-link class="btn btn-primary text-white" to="/checkout">填寫資訊
                  <i class="fas fa-arrow-right ml-2"></i>
                </router-link>
              </div>
            </div>
          </div>
          <div class="text-center" v-if="cart.carts.length == 0">
            <p>目前沒有商品喔！</p>
            <div class="mb-8">
              <router-link to="petproduct" class="btn btn-primary text-white">繼續逛逛</router-link>
            </div>
            <Animated></Animated>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Animated from '@/components/Animated'
export default {
  data () {
    return {
      status: {
        loadingItem: ''
      },
      isLoading: false,
      cart: {
        carts: []
      },
      coupon_code: ''
    }
  },
  methods: {
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data
        console.log(response.data)
        vm.isLoading = false
      })
    },
    removeCartItem (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(url).then((response) => {
        vm.$bus.$emit('updateCart')
        vm.$bus.$emit('message:push', response.data.message, 'danger')
        vm.isLoading = false
        vm.getCart()
      })
    },
    addCouponCode () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        vm.getCart()
        vm.$bus.$emit('message:push', response.data.message, 'warning')
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getCart()
  },
  components: {
    Animated
  }
}
</script>

<style scoped lang="scss">
.progress-list{
    text-align: center;
    width: 100%;
    padding:30px 10px;
}
@media (min-width: 768px) {
    .progress-list{
    text-align: center;
    width: 30%;
    border-left: 5px solid #fff;
}
}
@media (min-width: 576px) {
    .table-img{
    position: relative;
    width:100px;
}
}
</style>
