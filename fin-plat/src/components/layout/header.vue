<template>
  <section class="site-header">
    <div class="site-logo" v-show="!isCollapse">
      <h4 class="logo__text">第二事业部内部管理系统</h4>
    </div>
    <span class="collapse-menu" v-if="menuKey === '1'">
         <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleMenu"></i>
    </span>
    <div class="site-header__content">
      <!-- <el-tabs v-model="active">
         <el-tab-pane :key="x.key" v-for="(x) in meuns" :label="x.headerMenuName" :name="String(x.key)"></el-tab-pane>
       </el-tabs>-->
      <div class="site-header__content_meuns">
        <div
          class="site-header__content_meuns_item"
          :class="[(index == active) && 'site-header__content_meuns_item_active_meun']"
          :key="x.key"
          v-for="(x, index) in meuns"
          @click="meunsActive(x.key)">
          {{x.headerMenuName}}
        </div>
      </div>
    </div>

    <div ref="projectButton" class="site-header__right" @click="visible = !visible">
      <div class="fdt-avatar">
        <span class="fdt-avatar__img">
          <img :src="userInfo.img || userImg" alt=""/>
        </span>
        <el-popover
          placement="bottom"
          trigger="manual"
          width="60"
          v-model="visible"
          @show="show"
          @hide="hide"
        >
          <div class="fdt-avatar-login" @click="loginOutFn">注销</div>
          <span slot="reference" class="fdt-avatar__name">{{ userInfo.uid }}</span>
        </el-popover>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import {getUserInfo, loginOut} from '@/servers/api';
  import {meuns} from '@/config/menu'
  import watermark from 'watermark-dom';

  export default {
    data() {
      return {
        userImg: require('../../assets/img/avatar.svg'),
        visible: false, // 注销登录弹框
        meuns,
        active: 0
      };
    },
    created() {
      console.log(meuns, 666666)
    },
    computed: {
      ...mapState({
        isCollapse: state => state.app.isCollapse,
      }),
      ...mapGetters({menuKey: 'menuKey', pathOld: 'pathOld', userInfo: 'userInfo'}),
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$store.dispatch('app/getMenuKey', key);
        if (key === '2') {
          this.$router.push({path: '/systemSet'});
        } else {
          this.$router.push({path: '/analysisReport'});
        }
      },
      toggleMenu() {
        this.$store.dispatch('app/toggleSidebar', !this.isCollapse);
      },
      /**
       * 推出登录
       */
      loginOutFn() {
        const param = {
          // url: window.location.href,
          url: 'http://fit.oa.com/_logout/?url=http://fit.oa.com/fund-platform',
        };
        loginOut(param);
        window.location = param.url;
      },
      show() {
        document.addEventListener('click', this.hidePanel, false);
      },
      hide() {
        document.removeEventListener('click', this.hidePanel, false);
      },
      hidePanel(e) {
        if (!this.$refs.projectButton.contains(e.target)) {
          this.visible = false;
          this.hide();
        }
      },
      meunsActive(key) {
        console.log(key,55)
        this.active = key
      }
    },
  };
</script>
<style lang="scss" scoped>
  .site-header {
    display: flex;
    height: 64px !important;
    min-width: 1000px;
    line-height: 64px;
    box-sizing: border-box;
    align-items: center;

    /* /deep/ .el-menu--horizontal > .el-menu-item { */

    /*  height: 64px; */

    /*  margin-left: 20px; */

    /*  line-height: 64px; */

    /* } */

    /* /deep/ .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover { */

    /*  background: #4ba2fa !important; */

    /* } */

    /* /deep/ .el-menu--horizontal > .is-active { */

    /*  color: #fff !important; */

    /*  background: #4ba2fa !important; */

    /*  border-bottom-color: #4ba2fa !important; */

    /* } */
    .site-header__content {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: flex-start;
      padding: 0 20px;
      color: #fff;

      .site-header__content_meuns {
        .site-header__content_meuns_item {
          display: inline-block;
          padding: 0 10px;
          cursor: pointer;
        }

        .site-header__content_meuns_item_active_meun {
          color: #1d84ef;
          background: #3e4047;
          border-bottom: #ff0 2px solid;
          box-sizing: border-box;
        }
      }
    }

    .site-header__right {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: flex-end;

      > div {
        height: 64px;
        padding: 0 12px;
        font-size: 16px;
        line-height: 64px;
        color: #fff;
        cursor: pointer;

        &:hover {
          color: #fff;
          background: #4ba2fa;
        }
      }

      /deep/ .el-badge__content.is-fixed {
        top: 20px;
        right: 15px;
      }
    }

    .fdt-avatar {
      display: inline-flex;
      margin-left: 5px;
      align-items: center;
    }

    .fdt-avatar__name {
      display: inline-block;
      height: 64px;
      padding-left: 10px;
      font-family: PingFangSC-Medium, Arial, 'noto sans', sans-serif;
      font-size: 14px;
      line-height: 64px;
      text-align: center;
      vertical-align: middle;
    }

    .fdt-avatar__img {
      position: relative;
      top: 0;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      overflow: hidden;
      background: #fff;
      border-radius: 50%;

      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .site-logo {
    display: flex;
    width: 250px;
    height: 64px;
    overflow: hidden;
    font-family: PingFangSC-Medium, Arial, 'noto sans', sans-serif;
    color: #ecf5ff;
    cursor: pointer;
    background: #1d84ef;
    // -webkit-animation: fade-in 1.5s;
    // animation: fade-in;
    // animation-duration: 4s;
    align-items: center;

    .logo__text {
      display: inline-block;
      margin-left: 25px;
      font-size: 18px;
      font-weight: 600;
      vertical-align: middle;
      animation: fade-in;
      animation-duration: 0.5s;
    }
  }

  // @keyframes fade-in {
  //   0% {
  //     opacity: 0;
  //   } /* 初始状态 透明度为0 */
  //   40% {
  //     opacity: 0;
  //   } /* 过渡状态 透明度为0 */
  //   100% {
  //     opacity: 1;
  //   } /* 结束状态 透明度为1 */
  // }

  .collapse-menu {
    display: inline-block;
    font-size: 28px;
    color: #fff;
    cursor: pointer;
  }

  .fdt-avatar-login {
    text-align: center;
    cursor: pointer;
  }
</style>
