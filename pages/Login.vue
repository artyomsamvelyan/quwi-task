<template>
  <div class="login-container">
    <p>Quwi</p>
    <p v-if="notExist === 1" class="error-not-existing">Invalid credentials!</p>
    <form method="post" @submit.prevent="login">
      <div class="login-input">
        <input type="text" placeholder="Enter your email" v-model="email" :class="{ 'error-border': validationErrorsIndexes.includes(1) }">
        <small class="error-message" v-if="validationErrorsIndexes.includes(1)">{{ emailError }}</small>
      </div>
      <div class="login-input">
        <input type="password" placeholder="Enter your password" v-model="password" autocomplete="on" :class="{ 'error-border': validationErrorsIndexes.includes(2) }">
        <small class="error-message" v-if="validationErrorsIndexes.includes(2)">{{ passwordError }}</small>
      </div>
      <div class="login-button">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      notExist: 0,
      validationErrorsIndexes: []
    }
  },

  methods: {
    async login() {
      this.emailError = ''
      this.passwordError = ''
      this.notExist = 0
      this.validationErrorsIndexes = []
      const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
      if (!this.email) {
        this.emailError = 'The email field is required!'
        this.validationErrorsIndexes.push(1)
      }
      if (this.email && !regex.test(this.email)) {
        this.emailError = 'Your email is incorrect!'
        this.validationErrorsIndexes.push(1)
      }
      if (!this.password) {
        this.passwordError = 'The password field is required!'
        this.validationErrorsIndexes.push(2)
      }
      if (!this.validationErrorsIndexes.length) {
        try {
          const auth = await this.$axios.$post('/auth/login', {
            email: this.email,
            password: this.password,
          })
          document.cookie = `token=${auth.token}`
          this.$nuxt.$emit('user-logged-in')
          this.$router.push('/projects')
        } catch (e) {
          if (e) {
            this.notExist = 1
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  width: 55%;
  margin: 0 auto;
  flex-direction: column;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 10px;
  p {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
  }
  .error-not-existing {
    color: #d9534f;
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
  }
  form { 
    margin-top: 20px;
    .login-input {
      margin-bottom: 15px;
      input {
        width: 100%;
        height: 40px;
        border: 1px solid #cdcdcd;
        padding: 10px;
        background-color: transparent;
        border-radius: 7px;
      }
      input:focus {
        outline: none;
      }
      .error-border {
        border-color: #d9534f;
      }
      .error-message {
        color: #d9534f;
      }
    }
    .login-button {
      display: flex;
      justify-content: flex-end;
      button {
        border: none;
        color: #fff;
        background-color: #14A800;
        cursor: pointer;
        width: 120px;
        height: 40px;
        border-radius: 7px;
      } 
    }
  }
}
@media screen and (max-width: 1024px) {
  .login-container {
    width: 80%;
  }
}
@media screen and (max-width: 768px) {
  .login-container {
    width: 100%;
  }
}
</style>