<template>
  <div class="container border my-5">
  <div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    name
    indicators
    :interval="3000"
    img-width="1024"
    img-height="450"
  >
    <b-carousel-slide
      img-src="https://i.imgur.com/cqi7CK7.png"
    ></b-carousel-slide>
    <b-carousel-slide
      img-src="https://i.imgur.com/8dlgOWi.png"
    ></b-carousel-slide>
    <b-carousel-slide
      img-src="https://i.imgur.com/ECZl0IW.png"
    ></b-carousel-slide>
  </b-carousel>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      liding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style lang="scss">
.heightVH {
  &--90 {
    height: 80vh;
  }
}
@media screen and (max-width: 425px) {
  .heightVH {
    &--90 {
      height: 50vh;
    }
  }
}
//.carousel-caption {
//  position: absolute;
//  right:0;
//  bottom: 150px;
//  left:50px;
//  z-index: 10;
//  padding-top: 20px;
//  padding-bottom: 20px;
//  text-align: left;
//}
.carousel-caption{
  right:0px;
  left:10%;
  bottom: 100px;
}
@media (min-width: 992px) {
  .carousel-caption{
    right:0px;
    left:150px;
  }
}
@media (min-width: 768px) {
  .carousel-caption{
    right:0px;
    left:80px;
    top: 70px;
  }
}
@media (min-width: 576px) {
  .carousel-caption{
    right:0px;
    left:50px;
    bottom: 100px;
    display:flex;
  }
}
.carousel-logo:hover{
  text-decoration:none;
  .carousel-banner{
    position: relative; /* 當滑鼠經過超連結時，超連結往右下位移1像素 */
    top: 1px;
    left: 1px;
  };
  .carousel-icon{
    background-color:#ff6633;
  };
}
.carousel-logo:hover{
  text-decoration:none;
}
.carousel-banner{
      width:70%;
  }
@media (min-width: 576px){
  .carousel-banner{
      width:100%;
  }
}

.fit {
  object-fit: cover;
}
</style>
