<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("http://localhost:8091/register", {
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
          throw new Error("Registration failed");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);

        this.$router.push("/home");
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
      }
    },

    togglePassword() {
      const input = document.getElementById("user-pass");
      input.type = input.type === "password" ? "text" : "password";
    },
  },
};
</script>

<template>
  <div class="site signup-show">
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

        <div class="signup">
          <div class="heading">
            <h2>Registration</h2>
          </div>

          <form @submit.prevent="handleRegister">
            <p>
              <label for="user-email"></label>
              <i class="ri-mail-line"></i>
              <input
                type="text"
                placeholder="E-Mail"
                id="user-email"
                v-model="email"
              />
            </p>
            <p>
              <label for="user-pass"></label>
              <i class="ri-lock-line"></i>
              <i
                class="ri-eye-off-line icon-password trigger"
                @click="togglePassword"
              ></i>
              <input
                type="password"
                placeholder="Passwort"
                class="pass-input"
                id="user-pass"
                v-model="password"
              />
            </p>
            <p>
              <label for="user-re-pass"></label>
              <i class="ri-lock-line"></i>
              <input
                type="password"
                placeholder="Wiederholen Sie Ihre Passwort"
                class="pass-input"
                id="user-re-pass"
                v-model="confirmPassword"
              />
            </p>
            <div class="actions">
              <label>
                <input type="submit" value="Registrieren" />
                <i class="ri-arrow-right-line"></i>
              </label>
            </div>
            <div class="sign-in-up-btn">
              <p style="text-align: center">
                Haben Sie Konto?
                <router-link to="/" class="t-signin">Anmelden</router-link>
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
