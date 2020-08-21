<template>
  <div class="login">
    <div class="wrapper">
      <div style="text-align: center;">
        <img :src="smartisan_4" width="100px"/>
      </div>
    </div>
  </div>
</template>

<script>
  import smartisan_4 from '@/assets/img/global/smartisan_4ada7fecea.png'

  export default {
    name: "index",
    data() {
      return {
        smartisan_4,
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import 'assets/css/base/basicStyle.scss';

  .login {
    @include Absolute();

    .wrapper {
      width: 450px;
    }
  }
</style>
