<template>
  <div class="my-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/Index">
            Home
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/petproduct">
            寵物館
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{select}}
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['select']
}
</script>

<style lang="scss">
.breadcrumb{
    background-color: #fff;
}
a{
    color:#778899;
}
</style>
