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
      console.log("Login with:", this.email, this.password);
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
          throw new Error("Anmeldung fehlgeschlagen");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        this.$router.push("/fire-detect");
      } catch (error) {
        console.error("Error during login: ", error);
        this.error = "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.";
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
        <h1 class="welcome-text">Willkommen zurück</h1>
        <p class="subtitle">Starten Sie die KI-gestützte Erkennung von Karies und Rauch</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">E-Mail</label>
          <div class="input-wrapper">
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Geben Sie Ihre E-Mail ein"
              required
              class="form-input"
            />
            <i class="fas fa-envelope"></i>
          </div>
        </div>

        <div class="input-group">
          <label for="password">Passwort</label>
          <div class="input-wrapper">
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Geben Sie Ihr Passwort ein"
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
          <span>{{ loading ? 'Anmeldung...' : 'Anmelden' }}</span>
          <i class="fas fa-arrow-right" v-if="!loading"></i>
        </button>
      </form>

      <p class="register-link">
        Noch kein Konto? 
        <router-link to="/register">Konto erstellen</router-link>
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
