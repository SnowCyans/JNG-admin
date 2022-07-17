<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-avatar"></div>
      <el-form ref="loginFormRef" :rules="rules" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <template #prefix>
              <svg-icon icon-class="user" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password">
            <template #prefix>
              <svg-icon icon-class="password" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  filters: {},
  components: {},
  data () {
    const validateUserNameFn = (rule, value, callback) => {
      if (validUsername(value)) {
        callback()
      } else {
        callback(new Error('用户名格式不正确'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateUserNameFn, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度再6-16位之间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push({ name: 'welcome' })
      } catch (error) {
        console.log(error)
      }
    },
    // 重置
    resetForm () {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  }
}
</script>

<style scoped lang='scss'>
.login-container {
  width: 100vw;
  height: 100vh;
  // background-color: #2b4b6b;
  background: url("~@/assets/common/kf.jpg");
  // background: url("~@/assets/common/fj3.jpg");
  background-size: cover;
  background-position: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    position: relative;
    width: 450px;
    height: 300px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.el-input__inner) {
      background-color: rgba(0, 0, 0, 0.1);
      border: 0;
      color: powderblue;
    }
    :deep(.el-button--info) {
      background-color: #4c5363;
      border: 0;
    }
    :deep(.el-button--primary) {
      background-color: #3885a3;
      border: 0;
    }
    .login-avatar {
      position: absolute;
      top: -50px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: url("~@/assets/common/yy.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      box-shadow: 0px 1px 10px 0px pink;
      margin-bottom: 30px;
    }
    :deep(.el-form-item__content) {
      width: 400px;
    }
  }
}
</style>
