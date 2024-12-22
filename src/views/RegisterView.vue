<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      if (this.formData.password !== this.formData.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('http://localhost:8091/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password
          })
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        this.$router.push('/fire-detect');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<template>
  <div class="register-container">
    <transition name="page" mode="out-in">
      <div class="register-card">
        <div class="brand-section">
          <div class="logo">🔬</div>
          <h1 class="welcome-text">Create Account</h1>
          <p class="subtitle">Join our AI-powered medical analysis platform</p>
        </div>

        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="input-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <input
                id="email"
                type="email"
                v-model="formData.email"
                class="form-input"
                required
                placeholder="Enter your email"
              />
              <i class="fas fa-envelope input-icon"></i>
            </div>
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <input
                id="password"
                type="password"
                v-model="formData.password"
                class="form-input"
                required
                placeholder="Create a strong password"
              />
              <i class="fas fa-lock input-icon"></i>
            </div>
          </div>

          <div class="input-group">
            <label for="confirmPassword">Confirm Password</label>
            <div class="input-wrapper">
              <input
                id="confirmPassword"
                type="password"
                v-model="formData.confirmPassword"
                class="form-input"
                required
                placeholder="Repeat your password"
              />
              <i class="fas fa-shield-alt input-icon"></i>
            </div>
          </div>

          <div v-if="error" class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            {{ error }}
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Creating account...' : 'Create Account' }}
            <i class="fas fa-arrow-right" v-if="!loading"></i>
          </button>
        </form>

        <p class="auth-link">
          Already have an account? 
          <router-link to="/">Sign in here</router-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import '../assets/register.css';
@import '../assets/transitions.css';
</style>
