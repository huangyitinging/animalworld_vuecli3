<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert></Alert>
    <div class="d-flex justify-content-end bg-primary">
      <div class="">
        <a class="nav-link px-2 py-1" href="#">
          <i class="fab fa-facebook fa-2x text-white"></i>
        </a>
      </div>
      <div class="nav-item">
        <a class="nav-link px-2 py-1" href="#">
          <i class="fab fa-twitter-square fa-2x text-white"></i>
        </a>
      </div>
      <div class="nav-item">
        <a class="nav-link px-2 py-1" href="#">
          <i class="fab fa-line fa-2x text-white"></i>
        </a>
      </div>
    </div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light mt-3">
        <router-link class="nav-link navbarfont-brand ml-md-3" to="/Index">
          <img src="https://i.imgur.com/kKU64oJ.png" width="250" height="90" class="d-inline-block align-top" alt="">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item px-4">
              <router-link class="nav-link h5" to="/Index">
                <div class="text-center">
                  首頁
                </div>
              </router-link>
            </li>
            <li class="nav-item px-4">
              <router-link class="nav-link h5" to="/petproduct">
                <div class="text-center">
                  全部商品
                </div>
              </router-link>
            </li>
            <li class="nav-item px-4">
              <router-link class="nav-link h5" to="/coupon">
                <div class="text-center">
                  優惠
                </div>
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link text-muted" to="/login">
                <div class="text-center">
                  <i class="far fa-user-circle fa-1x mr-2"></i>
                  <span>LOGIN</span>
                </div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-muted" to="/shoppingcart">
                <div class="text-center">
                  <i class="fas fa-shopping-cart fa-1x mr-2"></i>
                  <span>CART</span>
                  <span v-if="cart.length !=0">( {{cart.length}} )</span>
                  <span v-if="cart.length == 0">( 0 )</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Alert from './AlertMessage'
import Footer from './Footer'
export default {
  name: 'NavbarFront',
  data () {
    return {
      cart: {},
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  components: {
    Alert,
    Footer
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.products = response.data.products
        console.log(response.data)
        vm.isLoading = false
      })
    },
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data.carts
        console.log(response.data)
        vm.isLoading = false
      })
    }
  },
  created () {
    const vm = this
    this.getProducts()
    this.getCart()
    vm.$bus.$on('updateCart', () => {
      vm.getCart()
    })
  }
}
</script>

<style lang="scss">
@import '../assets/_custom.scss';
@media (min-width: 991px){
.navbar{
    padding:0;
    display: flex;
    align-items: flex-end;
}
}
a{
    text-decoration:none;
}
</style>
