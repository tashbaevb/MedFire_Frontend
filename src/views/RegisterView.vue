<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwörter stimmen nicht überein';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('http://localhost:8091/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Registrierung fehlgeschlagen');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        this.$router.push('/fire-detect');
      } catch (err) {
        console.error("Error during registration:", err);
        this.error = 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      } finally {
        this.loading = false;
      }
    },
    
    togglePassword() {
      const passwordInput = document.getElementById("password");
      const confirmInput = document.getElementById("confirmPassword");
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      confirmInput.type = type;
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="brand-section">
        <div class="logo">🦷🔥</div>
        <h1 class="welcome-text">Konto erstellen</h1>
        <p class="subtitle">Treten Sie unserer KI-gestützten Erkennungsplattform bei</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group">
          <label for="email">E-Mail</label>
          <div class="input-wrapper">
            <input
              id="email"
              type="email"
              v-model="email"
              class="form-input"
              required
              placeholder="Geben Sie Ihre E-Mail ein"
            />
            <i class="fas fa-envelope input-icon"></i>
          </div>
        </div>

        <div class="input-group">
          <label for="password">Passwort</label>
          <div class="input-wrapper">
            <input
              id="password"
              type="password"
              v-model="password"
              class="form-input"
              required
              placeholder="Erstellen Sie ein sicheres Passwort"
            />
            <i class="fas fa-eye input-icon" @click="togglePassword"></i>
          </div>
        </div>

        <div class="input-group">
          <label for="confirmPassword">Passwort bestätigen</label>
          <div class="input-wrapper">
            <input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              class="form-input"
              required
              placeholder="Passwort wiederholen"
            />
            <i class="fas fa-eye input-icon" @click="togglePassword"></i>
          </div>
        </div>

        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Konto wird erstellt...' : 'Konto erstellen' }}
          <i class="fas fa-arrow-right" v-if="!loading"></i>
        </button>
      </form>

      <p class="register-link">
        Haben Sie bereits ein Konto? 
        <router-link to="/">Hier anmelden</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/login.css';
</style>
