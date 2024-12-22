<template>
  <div class="upload-container">
    <h2 id="upload-title">
      {{ currentMode === "teeth" ? "Zahnerkennung" : "Feuererkennung" }}
    </h2>
    <button class="toggle-btn" @click="toggleMode">
      {{ currentMode === "teeth" ? "Zu Feuererkennung wechseln" : "Zu Zahnerkennung wechseln" }}
    </button>

    <UploadImage
      :apiUrl="getCurrentApiUrl"
      :title="getCurrentTitle"
    />
  </div>
</template>

<script>
import UploadImage from "@/components/UploadImage.vue";

export default {
  components: {
    UploadImage
  },
  data() {
    return {
      currentMode: "teeth",
    };
  },
  computed: {
    getCurrentApiUrl() {
      return this.currentMode === "teeth" 
        ? "http://localhost:8091/predict/teeth"
        : "http://localhost:8091/predict/fire";
    },
    getCurrentTitle() {
      return this.currentMode === "teeth"
        ? "Bild für Zahnerkennung hochladen"
        : "Bild für Feuererkennung hochladen";
    }
  },
  methods: {
    toggleMode() {
      this.currentMode = this.currentMode === "teeth" ? "smoke" : "teeth";
    }
  }
};
</script>

<style scoped>
.toggle-btn {
  background: #2563eb;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.toggle-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

#upload-title {
  margin-bottom: 1rem;
  color: #1e293b;
  font-size: 1.8rem;
  text-align: center;
}
</style>
