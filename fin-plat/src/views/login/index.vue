<template>
  <div class="login">
    <div class="wrapper" style="text-align: center;">
      <div>
        <img :src="smartisan_4" width="100px"/>
      </div>
      <h3>使用 XMall 账号 登录官网</h3>
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">

        <el-form-item>
          <div class="type_login">
            <div class="type1" @click="loginType(1)" :class="{type_active: ruleForm.radioLogin === 1 }">验证码登录</div>
            <div class="type2" @click="loginType(2)" :class="{type_active: ruleForm.radioLogin === 2 }">账户登录</div>
          </div>
        </el-form-item>

        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item prop="userPwd" v-if="ruleForm.radioLogin === 2">
          <el-input type="password" v-model="ruleForm.userPwd" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item v-else>
          <div class="yzm">
            <el-input type="password" v-model="ruleForm.userPwd" autocomplete="off" placeholder="验证码"></el-input>
            <el-button type="primary" @click="sendCode">获取验证码</el-button>
          </div>
        </el-form-item>

        <el-form-item prop="autoLogin" class="auto_login">
          <el-checkbox class="auto-login" v-model="ruleForm.autoLogin">记住密码</el-checkbox>
          <div style=" display: inline-block; float: right;">
            <a href="javascript:;" class="register" @click="toRegister"
               style="padding-right: 10px; border-right: 1px solid #ccc; text-decoration-line: none;">注册 XMall 账号</a>
            <a style="padding: 1px 0 0 10px;" @click="open()">忘记密码 ?</a>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%;" :disabled="!ruleForm.userName || !ruleForm.userPwd">登录
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%;">返回</el-button>
        </el-form-item>
        .

      </el-form>

    </div>
  </div>
</template>

<script>
  import smartisan_4 from '@/assets/img/global/smartisan_4ada7fecea.png'
  import {sendCode} from './api.js'

  export default {
    name: "index",
    data() {
      return {
        smartisan_4,
        ruleForm: {userName: '', userPwd: '', autoLogin: '', radioLogin: 1},
      }
    },
    mounted() {

    },
    methods: {
      toRegister() {
        this.$router.push({
          path: '/register'
        })
      },
      sendCode() {
        const {userName} = this.ruleForm
        sendCode({phone: userName}).then(res => {
          console.log(res, 444)
        })
      },
      // 切换登录类型
      loginType(type) {
        this.ruleForm.radioLogin = type
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
      padding: 0 20px;
      border: 1px solid #dadada;
      box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2), 0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 10px 20px -10px rgba(0, 0, 0, 0.04);
      box-sizing: border-box;

      .auto_login {
        text-align: left;
      }

      .yzm {
        display: grid;
        grid-template-columns: 1fr 100px;
        grid-column-gap: 20px;
      }
    }

    .type_login {
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-size: 20px;
      font-weight: bold;

      .type1 {
        border-right: 1px solid #ccc;
      }

      .type1:hover,
      .type2:hover {
        color: #00a2ff;
        cursor: default;
      }

      .type_active {
        color: #00a2ff;
      }
    }
  }
</style>
