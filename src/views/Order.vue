<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5 justify-content-center">
      <div class="my-5 row justify-content-center">
        <div class="col-9 ">
          <div class="d-flex justify-content-center mb-5">
            <div class="bg-gray progress-list d-md-block d-none">
              <div><i class="fas fa-cart-plus fa-3x text-muted"></i></div>
              <div class="text-muted h5 mt-2">1.確認清單</div>
            </div>
            <div class="bg-gray progress-list d-md-block d-none">
              <div><i class="far fa-credit-card fa-3x text-muted"></i></div>
              <div class="text-muted h5 mt-2">2.填寫訂購資料</div>
            </div>
            <div class="bg-success progress-list">
              <div><i class="fas fa-list-alt fa-3x text-white"></i></div>
              <div class="text-white h5 mt-2">3.完成訂單</div>
            </div>
            </div>
              <h4>購買資訊</h4>
              <form class="" @submit.prevent="payOrder()">
                <table class="table">
                  <thead class="bg-primary">
                    <th>商品名稱</th>
                    <th>數量</th>
                    <th>小計</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                      <td class="align-middle">{{ item.product.title }}</td>
                      <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                      <td class="align-middle text-right">{{ item.final_total | currency}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" class="text-right text-danger">總計</td>
                      <td class="text-right text-danger h3">{{ order.total | currency}}</td>
                    </tr>
                  </tfoot>
                </table>
                <h4 class="border-top pt-5">個人資訊</h4>
                <table class="table">
                  <thead class="bg-primary">
                    <th colspan="2" width="30%">訂單資料</th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th>收件人電話</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th width="100">Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <th>收件人地址</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-danger">付款完成</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                  <button class="btn btn-primary text-white">確認付款去
                    <i class="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
                <div class="text-center" v-if="order.is_paid === true">
                  <router-link class="btn btn-primary text-white" to="/petproduct">繼續逛逛</router-link>
                </div>
              </form>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.order = response.data.order
        console.log(response)
        vm.isLoading = false
      })
    },
    payOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'warning')
          vm.getOrder()
        }
        console.log(response)
        vm.isLoading = false
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
    console.log(this.orderId)
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
</style>
