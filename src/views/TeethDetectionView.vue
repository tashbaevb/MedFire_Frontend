<template>
  <div class="detection-page">
    <nav class="navigation">
      <router-link to="/fire-detect" class="nav-btn">
        <span class="material-icons">local_fire_department</span>
        Feuererkennung
      </router-link>
      <router-link to="/teeth-detect" class="nav-btn active">
        <span class="material-icons">medical_services</span>
        Zahnerkennung
      </router-link>
    </nav>

    <UploadImage
      apiUrl="http://localhost:8091/predict/teeth"
      title="Bild für Zahnerkennung hochladen"
    />
  </div>
</template>

<script>
import UploadImage from "@/components/UploadImage.vue";

export default {
  components: {
    UploadImage,
  },
};
</script>

<style scoped>
.detection-page {
  padding: 2rem;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  background: #ffffff;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid #e2e8f0;
}

.nav-btn:hover,
.nav-btn.active {
  background: #2563eb;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  border-color: #2563eb;
}

.nav-btn i {
  font-size: 1.2rem;
}
</style>
