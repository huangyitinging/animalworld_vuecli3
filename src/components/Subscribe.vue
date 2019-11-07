<template>
  <div>
    <div class="container mb-5">
        <div class="sub-img">
          <div>
            <h4>你知道嗎？</h4>
            <p>每吃一個牛角麵包
            <br>
            就會有一隻橘喵消失
            </p>
          </div>
          <div class="sub-content">
            <div class="sub-border">
              <h3 class="text-muted">訂閱我們，守護毛孩</h3>
              <form>
                <div class="form-group">
                  <label for="SubEmail"></label>
                  <input type="email" class="form-control" id="SubEmail" aria-describedby="emailHelp" placeholder="請輸入 Email"
                  :class="{'is-invalid': errors.first('email')}" v-validate="'required|email'">
                  <span class="text-danger" v-if="errors.has('email')">
                    {{errors.first('email')}}
                  </span>
                </div>
                <button type="submit" class="btn btn-lemon text-white btn-lg btn-block"
                  @click.prevent="subscribe"
                  >訂閱
                </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    subscribe () {
      const vm = this
      this.$validator.validate().then((result) => {
        if (!result) {
          vm.$bus.$emit('message:push', '請輸入正確EMAIL格式', 'danger')
        } else {
          vm.$bus.$emit('message:push', '訂閱成功', 'success')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.sub-img{
    padding: 10em;
    background-image: url(https://i.imgur.com/xJj11Bu.png);
    background-size: center;
    background-position: center;
    text-align: center;
}
@media(max-width: 767px){
 .sub-img{
    padding:10em 3em;
    background-image: url(https://i.imgur.com/cFlEW28.png);
    background-position: top;
 }
}
.sub-content{
    background: #fce8d4;
    border-radius: 5px;
    padding: 2em;
}
.sub-border{
    background: #fff;
    border: 1px solid #fd7e14;
    padding: 20px;
    border-radius: 5px;
}
</style>
