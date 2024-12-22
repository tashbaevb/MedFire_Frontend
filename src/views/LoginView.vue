<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: null
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch("http://localhost:8091/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        this.$router.push("/fire-detect");
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="brand-section">
        <div class="logo">🦷🔥</div>
        <h1 class="welcome-text">Welcome Back</h1>
        <p class="subtitle">Start detecting dental caries and smoke with AI</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Enter your email"
              required
              class="form-input"
            />
            <i class="fas fa-envelope"></i>
          </div>
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Enter your password"
              required
              class="form-input"
            />
            <i class="fas fa-lock"></i>
          </div>
        </div>

        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          <i class="fas fa-arrow-right" v-if="!loading"></i>
        </button>
      </form>

      <p class="register-link">
        Don't have an account yet? 
        <router-link to="/register">Create Account</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/login.css';
@import '../assets/transitions.css';
/* Переопределяем классы для логина */
.register-container { composes: login-container; }
.register-card { composes: login-card; }
.register-form { composes: login-form; }
.register-btn { composes: login-btn; }
.login-link { composes: register-link; }
</style>
