<template>
    <div>
      <loading :active.sync="isLoading"></loading>
      <div class="text-right mt-4">
        <button class="btn btn-primary" @click="openCouponModal(true)">建立新的優惠券</button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>優惠券名稱</th>
            <th>優惠券代碼</th>
            <th width="150">折扣百分比(%)</th>
            <th width="150">到期日</th>
            <th width="150">是否啟用</th>
            <th width="150">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,key) in coupons" :key="key">
            <td>{{ item.title}}</td>
            <td>{{ item.code}}</td>
            <td>{{ item.percent}}</td>
            <td>{{ item.due_date}}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal -->
      <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增優惠券</span>
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
                      <label for="title">優惠券名稱</label>
                      <input type="text" class="form-control" id="title"
                        v-model="tempCoupon.title"
                        placeholder="請輸入標題">
                    </div>
                    <div class="form-group col-12">
                      <label for="code">優惠券代碼</label>
                      <input type="text" class="form-control" id="code"
                        v-model="tempCoupon.code"
                        placeholder="請輸入優惠碼">
                    </div>
                    <div class="form-group col-12">
                      <label for="due_date">到期日</label>
                      <input type="date" class="form-control" id="due_date"
                        v-model="tempCoupon.due_date"
                        placeholder="請輸入到期日">
                    </div>
                    <div class="form-group col-12">
                      <label for="percent">折扣百分比(%)</label>
                      <input type="number" class="form-control" id="percent"
                        v-model="tempCoupon.percent"
                        placeholder="請輸入折扣百分比">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox"
                        v-model="tempCoupon.is_enabled"
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
              <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 刪除Modal -->
      <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
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
              是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger"
              @click="delCoupon()"
              >確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      coupon_code: ''
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      this.$http.get(url, { data: coupon }).then((response) => {
        console.log(response.data)
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    updateCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`// 'https://vue-course-api.hexschool.io/api/hexschooleating/products';
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH)
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          console.log('新增失敗')
        }
        vm.coupon = response.data.coupon
      })
    },
    // 刪除產品
    openDelCouponModal (item) {
      const vm = this
      console.log(item)
      vm.tempCoupon = Object.assign({}, item)
      $('#delCouponModal').modal('show')
    },
    delCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      this.$http.delete(api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#delCouponModal').modal('hide')
          alert('刪除失敗')
        }
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
