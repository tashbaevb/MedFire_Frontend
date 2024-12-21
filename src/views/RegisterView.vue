<template>
    <div class="site signup-show">
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
          <div class="signup">
            <nav>
              <ul>
                <li><router-link to="/login"><i class="ri-arrow-left-line"></i></router-link></li>
                <li>
                  Already member? <router-link to="/login" class="t-signin">Sign in</router-link>
                </li>
              </ul>
            </nav>
            <div class="heading">
              <h2>Sign Up</h2>
              <p>We secure your data privacy encrypted</p>
            </div>
            <form @submit.prevent="handleRegister">
              <p>
                <label for="full-name"></label>
                <i class="ri-user-3-line"></i>
                <input type="text" placeholder="Full name" id="full-name" v-model="fullName" />
              </p>
              <p>
                <label for="user-email"></label>
                <i class="ri-mail-line"></i>
                <input type="email" placeholder="Your email address" id="user-email" v-model="email" />
              </p>
              <p>
                <label for="user-pass"></label>
                <i class="ri-lock-line"></i>
                <i class="ri-eye-off-line icon-password trigger" @click="togglePassword"></i>
                <input type="password" placeholder="Enter password" class="pass-input" id="user-pass" v-model="password" />
              </p>
              <p>
                <label for="user-re-pass"></label>
                <i class="ri-lock-line"></i>
                <input type="password" placeholder="Re-Enter password" class="pass-input" id="user-re-pass" v-model="confirmPassword" />
              </p>
              <div class="actions">
                <label>
                  <input type="submit" value="Sign Up" />
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
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      handleRegister() {
        console.log('Register with:', this.fullName, this.email, this.password);
        // Добавь свою логику регистрации
        this.$router.push('/home');
      },
      togglePassword() {
        const input = document.getElementById('user-pass');
        input.type = input.type === 'password' ? 'text' : 'password';
      },
    },
  };
  </script>
  
  <style scoped>
  @import "../assets/auth.css";
  </style>
  