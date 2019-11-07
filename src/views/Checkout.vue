<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
      <div class="my-5 row justify-content-center">
        <div class="col-9">
          <div class="d-flex justify-content-center mb-5">
            <div class="bg-gray progress-list d-md-block d-none">
              <div><i class="fas fa-cart-plus fa-3x text-muted"></i></div>
              <div class="text-muted h5 mt-2">1.確認清單</div>
            </div>
            <div class="bg-success progress-list">
              <div><i class="far fa-credit-card fa-3x text-white"></i></div>
              <div class="text-white h5 mt-2">2.填寫訂購資料</div>
            </div>
            <div class="bg-gray progress-list d-md-block d-none">
              <div><i class="fas fa-list-alt fa-3x text-muted"></i></div>
              <div class="text-muted h5 mt-2">3.完成訂單</div>
            </div>
          </div>
          <div id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  購物車清單
                  </button>
                </h2>
              </div>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                  <table class="table" style="font-size:1rem">
                    <thead>
                      <tr>
                        <th width="20%" class="d-md-table-cell"></th>
                        <th>商品名稱</th>
                        <th width="20%">數量</th>
                        <th width="15%">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in cart.carts" :key="item.id">
                        <td class="table-img">
                          <div style="width:60%; background-size: cover; background-position: center;padding-bottom:40%"
                          :style="{backgroundImage:`url(${item.product.imageUrl})`}">
                          </div>
                        </td>
                        <td class="align-middle">
                          <span>{{item.product.title}}</span>
                        </td>
                        <td class="align-middle">{{item.qty}} / {{item.product.unit}}</td>
                        <td class="align-middle text-right">
                          <div>{{item.final_total | currency}}</div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot class="bg-gray">
                      <tr>
                        <td colspan="3" class="text-right text-danger">總計</td>
                        <td class="text-right text-danger">{{cart.final_total | currency}}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="h3 text-center text-muted my-4">訂購資料</div>
          <form @submit.prevent="createOrder">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username">姓名</label>
                <input type="text" class="form-control" name="name" id="username"
                :class="{'is-invalid':errors.has('name')}"
                v-model="form.user.name" v-validate="'required'" placeholder="請輸入姓名">
                <span class="text-danger" v-if="errors.has('name')">姓名輸入錯誤</span>
              </div>
              <div class="form-group col-md-6">
                <label for="usertel">電話</label>
                <input type="tel" class="form-control" name="usertel" id="usertel"
                :class="{'is-invalid':errors.has('usertel')}"
                v-model="form.user.tel" v-validate="'required'" placeholder="請輸入電話">
                <span class="text-danger" v-if="errors.has('usertel')">電話輸入錯誤</span>
              </div>
            </div>
            <div class="form-group">
              <label for="useremail">信箱</label>
              <input type="email" class="form-control" name="email" id="useremail"
              :class="{'is-invalid':errors.has('email')}"
              v-model="form.user.email" v-validate="'required|email'" placeholder="請輸入 Email">
              <span class="text-danger" v-if="errors.has('email')">
              {{errors.first('email')}}
              </span>
            </div>
            <div class="form-group">
              <label for="useraddress">地址</label>
              <input type="text" class="form-control" name="address" id="useraddress"
              :class="{'is-invalid':errors.has('address')}"
              v-model="form.user.address" v-validate="'required'" placeholder="請輸入地址">
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>
            <div class="form-group">
              <label for="comment">備註(選填)</label>
              <textarea name="" id="comment" class="form-control" cols="20" rows="5" v-model="form.message"></textarea>
            </div>
            <div class="d-flex">
              <div class="mr-auto">
                <router-link class="btn btn-outline-secondary text-primary" to="/shoppingcart">
                  <i class="fas fa-arrow-left mr-2"></i>回上一頁
                </router-link>
              </div>
              <div>
                <button class="btn btn-primary text-white">送出訂單
                  <i class="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      product: {}, // 儲放Ｍodal的資料
      status: {
        oadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {
        carts: []
      },
      isLoading: false,
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
    createOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      // const order = vm.form
      // vm.isLoading = true
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: vm.form }).then((response) => {
            console.log('訂單已建立', response)
            if (response.data.success) {
              vm.$bus.$emit('updateCart')
              vm.$bus.$emit('message:push', response.data.message, 'warning')
              vm.$router.push(`/order/${response.data.orderId}`)
            }
            // vm.getCart()
            vm.isLoading = false
          })
        } else {
          vm.$bus.$emit('updateCart')
          vm.$bus.$emit('message:push', '欄位不完整', 'danger')
        }
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
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
