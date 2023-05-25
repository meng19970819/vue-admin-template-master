<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
<!-- //el-form-item 是 Element UI 框架中的一个组件，用于在 el-form 中定义表单项。
它通常作为 el-form 的子组件使用，用于包裹表单中的每个表单元素，并提供标签、错误提示等功能。 -->
      <el-form-item prop="username" style="background: pink;">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
           :style="{ color: 'red' }"
        />
      </el-form-item>
<!-- 如果您想要为 el-input 组件设置占位符（placeholder），
  您可以使用 placeholder 属性。占位符是在输入字段中显示的灰色文本，
  用于提供关于所期望输入的提示或示例。 -->
      <el-form-item prop="password" style="background: pink;">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
            <el-radio-group v-model="selectedOption">
            <el-radio label="option1" style="color: palevioletred;">管理员登陆</el-radio>
            <el-radio label="option2" style="color: palevioletred;">用户登录</el-radio>
            </el-radio-group>
          </div>

        <el-col :span="24" class="text-center">
          <el-button :loading="loading" type="primary" class="equal-button" style="margin-bottom: 50px ;margin: center;" @click.native.prevent="handleLogin">登录</el-button>
        </el-col>
      


    </el-form>
  </div>
</template>

<script>
//import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      const regex = /^[\u4E00-\u9FA5\u3040-\u309F\u30A0-\u30FF0-9a-zA-Z]{1,10}$/;
      if (!regex.test(value)) {
        callback(new Error('请输入正确的用户名，最多10个字符，可以包含汉字、假名、数字和英文字母'));
      } else {
        callback();
  }
    }
    const validatePassword = (rule, value, callback) => {
      //const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,10}$/;
      const regex = /^[0-9a-zA-Z]{6,10}$/; 
      if (!regex.test(value)) {
          callback(new Error('请输入6-10位数字或者英文'));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      option1: 'option1',
      option2: 'option2',
      selectedOption: 'option1'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
//     handleLogin() {
//   this.$refs.loginForm.validate(valid => {
//     if (valid) {
//       this.loading = true;
//       if (this.selectedOption === 'option1') {
//         // 使用管理员登录接口
//         this.$store.dispatch('user/login', this.loginForm).then(() => {
//           this.$router.push({ path: this.redirect || '/' });
//           this.loading = false;
//         }).catch(() => {
//           this.loading = false;
//         });
//       } else if (this.selectedOption === 'option2') {
//         // 使用用户登录接口
//         this.$store.dispatch('user/login', this.loginForm).then(() => {
//           this.$router.push({ path: this.redirect || '/user' });
//           this.loading = false;
//         }).catch(() => {
//           this.loading = false;
//         });
//       }
//     } else {
//       console.log('error submit!!');
//       return false;
//     }
//   });
// },
    }
  
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  
}

</style >

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
//背景图片
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-image: url('../../assets/bg1.png');
  background-size:  100%;

  display: flex;
  align-items: center;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    color: palevioletred;
    background-color:#6d9cbd99;
    border-radius: 20px;
  }

// 用户密码前面显示的图片
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: palevioletred;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      color: black;
    }
  }
  .button-gap {
  display: inline-block;
  width: 200px; /* 调整空隙的宽度 */
  }
  //显示密码
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: palevioletred;
    cursor: pointer;
    user-select: none;
  }
  .equal-button {
  flex: 1;
  text-align: center;
  background: orange;
  color: #000;
  }
  .text-center {
  display: flex;
  justify-content: center;
}
// .classone:focus{
//   color:#000
// }

}
</style>

