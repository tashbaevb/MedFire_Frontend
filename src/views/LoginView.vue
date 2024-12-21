<template>
    <div class="site signin-show">
      <div class="container">
        <div class="theform">
          <div class="play">
            <div class="wrapper">
              <div class="card one"></div>
              <div class="card two"></div>
              <div class="card three"></div>
              <div class="card four"></div>
              <div class="card five"></div>
            </div>
          </div>
          <div class="signin">
            <nav>
              <ul>
                <li><router-link to="/register"><i class="ri-arrow-left-line"></i></router-link></li>
                <li>
                  Don't have an account? <router-link to="/register" class="t-signup">Sign up</router-link>
                </li>
              </ul>
            </nav>
            <div class="heading">
              <h2>Sign In</h2>
              <p>We secure your data privacy encrypted</p>
            </div>
            <form @submit.prevent="handleLogin">
              <p>
                <label for="user-email-login"></label>
                <i class="ri-mail-line"></i>
                <input type="email" placeholder="Your email address" id="user-email-login" v-model="email" />
              </p>
              <p>
                <label for="user-login-pass"></label>
                <i class="ri-lock-line"></i>
                <i class="ri-eye-off-line icon-password trigger" @click="togglePassword"></i>
                <input type="password" placeholder="Enter password" class="pass-input" id="user-login-pass" v-model="password" />
              </p>
              <div class="actions">
                <label>
                  <input type="submit" value="Sign In" />
                  <i class="ri-arrow-right-line"></i>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
data() {
    return {
    email: '',
    password: '',
    showPassword: false,
    };
},
methods: {
    handleLogin() {
    console.log('Login with:', this.email, this.password);
    this.$router.push('/home');
    },
    togglePassword() {
    this.showPassword = !this.showPassword;
    const input = document.getElementById('user-login-pass');
    input.type = this.showPassword ? 'text' : 'password';
    },
},
};
</script>

<style scoped>
@import "../assets/auth.css";
</style>
