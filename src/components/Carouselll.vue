<template>
    <div class="container">
        <carousel :id="carousel-fade" :data="data" indicator-type="disc"></carousel>
     <b-carousel
      id="carousel-fade"
      v-model="slide"
      :interval="3000"
      indicators
      fade
      background="#ababab"
      img-width="1024"
      class="heightVH--90"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
       <b-carousel-slide>
        <img
          slot="img"
          class="d-block w-100 heightVH--90 fit"
          width="100%"
          height="480"
          src="https://i.imgur.com/8dlgOWi.png"
          alt="image slot"
        >
      </b-carousel-slide>
      <!-- Slides with custom text -->
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block w-100 heightVH--90 fit"
          width="1024"
          height="480"
          src="https://i.imgur.com/HYl9N5d.png"
          alt="image slot"
        >
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block w-100 heightVH--90 fit"
          width="1024"
          height="480"
          src="https://i.imgur.com/ECZl0IW.png"
          alt="image slot"
        >
      </b-carousel-slide>
    </b-carousel>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div><img class="d-block w-100 heightVH--90 fit" src="https://i.imgur.com/8dlgOWi.png"></div>',
          '<div><img class="d-block w-100 heightVH--90 fit" src="https://i.imgur.com/HYl9N5d.png"></div>',
          '<div><img class="d-block w-100 heightVH--90 fit" src="https://i.imgur.com/ECZl0IW.png"></div>',
        ],
      };
    },
  };
</script>

<style lang="scss">
.heightVH {
  &--90 {
    height: 70vh;
  }
}
@media screen and (max-width: 425px) {
  .heightVH {
    &--90 {
      height: 50vh;
    }
  }
}
.fit {
  object-fit: cover;
}
</style>