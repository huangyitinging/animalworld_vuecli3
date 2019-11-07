<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">購買時間</th>
          <th>訂購人資訊</th>
          <th>購買內容</th>
          <th width="120">備註</th>
          <th>應付金額</th>
          <th width="100">是否付款</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in orders" :key="key">
          <td>{{ item.create_at}}</td>
          <td>
            <ul>
              <li>訂購單ID:<br>{{ item.id}}</li>
              <li>訂購人:{{ item.user.name}}</li>
              <li>信箱:{{ item.user.email}}</li>
              <li>地址:{{ item.user.address}}</li>
              <li>電話:{{ item.user.tel}}</li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="prod in item.products" :key="prod.id" class="mb-2">
                <div class="text-nowrap">
                  {{ prod.product.title}}<br>
                  {{prod.qty}} {{prod.product.unit}} -
                  <span class="text-main" v-if="prod.final_total>= prod.total">{{prod.final_total | currency}}</span>
                  <span class="text-danger" v-if="prod.final_total < prod.total">{{prod.final_total | currency}} ({{prod.coupon.title}})</span>
                </div>
              </li>
            </ul>
          </td>
          <td>{{ item.message}}</td>
          <td class="text-right">{{ item.total |currency}}</td>
          <td>
            <ul v-if="item.is_paid">
              <li class="text-success font-weight-bold">已付款</li>
              <li>{{item.paid_date }}</li>
            </ul>
            <span v-else>尚未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openOrederModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm mt-2" @click="delOrderModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Pagination :pagination="pagination" v-on:getPage="getOrders" v-if="pagination"/>
    <!-- Modal -->
      <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>訂單內容</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  <div class="form-row">
                    <div class="form-group col-12">
                      <label for="title">購買時間</label>
                      <input type="text" class="form-control" id="title"
                        v-model="tempOrder.title"
                        placeholder="請輸入標題">
                    </div>
                    <div class="form-group col-12">
                      <label for="code">訂購人資訓</label>
                      <input type="text" class="form-control" id="code"
                        v-model="tempOrder.code"
                        placeholder="請輸入優惠碼">
                    </div>
                    <div class="form-group col-12">
                      <label for="due_date">訂購內容</label>
                      <input type="date" class="form-control" id="due_date"
                        v-model="tempOrder.due_date"
                        placeholder="請輸入到期日">
                    </div>
                    <div class="form-group col-12">
                      <label for="percent">備註</label>
                      <input type="number" class="form-control" id="percent"
                        v-model="tempOrder.percent"
                      placeholder="請輸入折扣百分比">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox"
                        v-model="tempOrder.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled">
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 刪除Modal -->
      <div class="modal fade" id="delOrderModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ tempOrder.title }}</strong> 商品(刪除後將無法恢復)。
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger"
                  @click="delOrder()"
                >確認刪除</button>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'
export default {
  data () {
    return {
      orders: [],
      tempOrder: {
        user: {},
        products: {}
      },
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response.data)
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    openOrederModal (isNew, item) {
      if (isNew) {
        this.tempOrder = {}
        this.isNew = true
      } else {
        this.tempOrder = Object.assign({}, item)
        this.isNew = false
      }
      $('#orderModal').modal('show')
    },
    updateOrder () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order` // 'https://vue-course-api.hexschool.io/api/hexschooleating/products'
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`
        httpMethod = 'put'
      }
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH)
      this.$http[httpMethod](api, { data: vm.tempOrder }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#orderModal').modal('hide')
          vm.getOrders()
        } else {
          $('#orderModal').modal('hide')
          vm.getOrders()
          console.log('新增失敗')
        }
        vm.order = response.data.order
      })
    },
    // 刪除產品
    openDelOrderModal (item) {
      const vm = this
      console.log(item)
      vm.tempOrder = Object.assign({}, item)
      $('#delOrderModal').modal('show')
    },
    delOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`
      this.$http.delete(api, { data: vm.tempOrder }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#delOrderModal').modal('hide')
          vm.getOrders()
        } else {
          $('#delOrderModal').modal('hide')
          alert('刪除失敗')
        }
      })
    }
  },
  created () {
    this.getOrders()
  },
  components: {
    Pagination
  }
}
</script>

<style lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
</style>
