<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      console.log("Login with:", this.email, this.password);
      try {
        const response = await fetch("http://localhost:8091/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);

        this.$router.push("/home");
      } catch (error) {
        console.error("Error during login: ", error);
        alert("Login failed");
      }
    },

    // togglePassword() {
    //   this.showPassword = !this.showPassword;
    //   const input = document.getElementById("user-login-pass");
    //   input.type = this.showPassword ? "text" : "password";
    // },
  },
};
</script>

<template>
  <div class="site signin-show">
    <div class="container">
      <div class="theform">
        <!-- <div class="play">
          <div class="wrapper">
            <div class="card one"></div>
            <div class="card two"></div>
            <div class="card three"></div>
            <div class="card four"></div>
            <div class="card five"></div>
          </div>
        </div> -->
        <div class="signin">
          <div class="heading">
            <h2>Anmelden</h2>
          </div>
          <form @submit.prevent="handleLogin">
            <p>
              <label for="user-email-login"></label>
              <i class="ri-mail-line"></i>
              <input
                type="text"
                placeholder="E-Mail"
                id="user-email-login"
                v-model="email"
              />
            </p>
            <p>
              <label for="user-login-pass"></label>
              <i class="ri-lock-line"></i>
              <i
                class="ri-eye-off-line icon-password trigger"
                @click="togglePassword"
              ></i>
              <input
                type="password"
                placeholder="Passwort"
                class="pass-input"
                id="user-login-pass"
                v-model="password"
              />
            </p>
            <div class="actions">
              <label>
                <input type="submit" value="Anmelden" />
                <i class="ri-arrow-right-line"></i>
              </label>
            </div>
            <div class="sign-in-up-btn">
              <p>
                Kein Konto?
                <router-link to="/register" class="t-signup"
                  >Registrieren</router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/auth.css";
</style>
