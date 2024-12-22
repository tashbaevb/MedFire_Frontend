<template>
  <div class="upload-container">
    <div class="type-selector">
      <button 
        :class="['type-btn', { active: selectedType === 'caries' }]"
        @click="selectedType = 'caries'"
      >
        <i class="fas fa-tooth"></i>
        Dental Caries Detection
      </button>
      <button 
        :class="['type-btn', { active: selectedType === 'fire' }]"
        @click="selectedType = 'fire'"
      >
        <i class="fas fa-fire"></i>
        Fire Detection
      </button>
    </div>

    <div class="upload-box" 
      :class="{ dragging: isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop">
      <div class="upload-content">
        <div class="upload-icon">
          <i :class="['fas', selectedType === 'caries' ? 'fa-tooth' : 'fa-fire']"></i>
        </div>
        <h3>{{ uploadTitle }}</h3>
        <p class="upload-text">Drag & Drop an image here or</p>
        <button class="browse-btn" @click="triggerFileInput">Browse Files</button>
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="handleFileSelect"
          hidden
        />
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="loading" class="loading-overlay">
        <div class="loader"></div>
        <p>Analyzing image...</p>
      </div>
    </transition>

    <transition-group name="fade" class="results-container" tag="div">
      <div v-if="originalImage || processedImage" key="images" class="image-comparison">
        <div class="image-card original">
          <h4>Original Image</h4>
          <div class="image-wrapper">
            <img :src="originalImage" alt="Original" />
          </div>
        </div>
        
        <div class="arrow-animation">
          <i class="fas fa-arrow-right"></i>
        </div>

        <div class="image-card processed">
          <h4>Analysis Result</h4>
          <div class="image-wrapper">
            <img :src="processedImage" alt="Processed" />
          </div>
        </div>
      </div>
    </transition-group>

    <transition name="fade">
      <button
        v-if="originalImage || processedImage"
        class="clear-btn"
        @click="clearImages"
      >
        <i class="fas fa-trash"></i>
        Clear Results
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedType: 'caries',
      originalImage: null,
      processedImage: null,
      file: null,
      loading: false,
      isDragging: false
    }
  },
  computed: {
    uploadTitle() {
      return this.selectedType === 'caries' 
        ? 'Upload Dental X-Ray' 
        : 'Upload Image for Fire Detection'
    },
    apiUrl() {
      return this.selectedType === 'caries'
        ? 'http://localhost:8091/upload-caries'
        : 'http://localhost:8091/upload-fire'
    }
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.originalImage = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.clearImages();
      }
    },

    handleDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      const files = event.dataTransfer.files;
      if (files.length) {
        this.handleFileSelect({ target: { files } });
      }
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    clearImages() {
      this.originalImage = null;
      this.processedImage = null;
      this.file = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },

    async processImage() {
      if (!this.file) return;
      this.loading = true;
      
      try {
        const formData = new FormData();
        formData.append("file", this.file);

        const response = await fetch(this.apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to process the image");

        const path = (await response.text()).trim();
        
        await new Promise(resolve => setTimeout(resolve, 8000));
        
        const processedResponse = await fetch(`http://localhost:8091/${path}`);
        if (!processedResponse.ok) throw new Error("Failed to fetch the processed image");

        const blob = await processedResponse.blob();
        this.processedImage = URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error:", error);
        alert("Image processing failed");
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    selectedType() {
      this.clearImages();
    },
    originalImage(newVal) {
      if (newVal) {
        this.processImage();
      }
    }
  }
}
</script>

<style scoped>
.upload-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.type-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.type-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #718096;
}

.type-btn.active {
  background: linear-gradient(135deg, #ff6b6b 0%, #6c5ce7 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.2);
}

.upload-box {
  border: 3px dashed #e2e8f0;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}

.upload-box.dragging {
  border-color: #6c5ce7;
  background: rgba(108, 92, 231, 0.05);
  transform: scale(1.02);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon i {
  font-size: 3rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #6c5ce7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.browse-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #6c5ce7 100%);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1000;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6c5ce7;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.results-container {
  margin-top: 2rem;
}

.image-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.image-card {
  background: white;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 45%;
  transition: all 0.3s ease;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(108, 92, 231, 0.2);
}

.image-wrapper {
  border-radius: 10px;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}

.arrow-animation {
  font-size: 2rem;
  color: #6c5ce7;
  animation: pulse 2s infinite;
}

.clear-btn {
  margin-top: 2rem;
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #ff5252;
  transform: translateY(-2px);
}

/* Анимации */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Медиа-запросы */
@media (max-width: 768px) {
  .type-selector {
    flex-direction: column;
  }

  .image-comparison {
    flex-direction: column;
  }

  .image-card {
    width: 100%;
  }

  .arrow-animation {
    transform: rotate(90deg);
  }
}
</style>
