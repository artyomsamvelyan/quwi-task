<template>
  <header>
    <nav>
      <div class="navbar">
        <div class="navbar-logo">
          <nuxt-link to="/">
            <img src="../images/quwi.png" alt="Quwi">
          </nuxt-link>
        </div>
        <div class="navbar-menu">
          <ul>
            <li v-if="!isAuth"><nuxt-link to="/login">Login</nuxt-link></li>
            <li v-if="isAuth"><nuxt-link to="/projects">Projects</nuxt-link></li>
            <li v-if="isAuth" @click="logout()"><nuxt-link to="/login">Logout</nuxt-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'Navbar',

    data() {
      return {
        isAuth: false,
      }
    },

    created() {
      this.$nuxt.$on('user-logged-in', () => {
        this.isAuth = true
      })
    },

    mounted() {
      const cookies = Object.fromEntries(
        `${document.cookie}`.split("; ").map((cookie) => cookie.split("="))
      )
      this.isAuth = !!cookies.token
    },

    methods: {
      logout() {
        document.cookie = 'token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.isAuth = false
      }
    }
  }
</script>

<style lang="scss" scoped>
header {
  background-color:#EBEBEB;
  box-shadow: 0 3px 3px #888;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  .navbar-logo {
    img {
      width: 50px;
    }
  }
  .navbar-menu {
    ul {
      display: flex;
    }
    li {
      font-weight: bold;
      font-size: 16px;
      padding: 0 15px;
      a {
        color: #000;
      }
    }
  }
}
</style>
