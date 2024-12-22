<template>
  <div class="upload-container">
    <h2 class="upload-title">{{ title }}</h2>
    <div
      class="upload-box"
      @dragover.prevent
      @drop="handleDrop"
      @dragleave="resetBoxStyle"
    >
      <div class="upload-content">
        <span class="material-icons upload-icon">cloud_upload</span>
        <p class="upload-text" @click="triggerFileInput">
          Ziehen & Ablegen Sie ein Bild hier oder <span class="browse-text">klicken Sie zum Durchsuchen</span>
        </p>
        <p class="upload-hint">Unterstützte Formate: JPG, PNG, JPEG</p>
      </div>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFileSelect"
        hidden
      />
    </div>
    <div v-if="loading" class="loading">
      <p>Verarbeitung...</p>
    </div>

    <!-- Display images -->
    <div v-if="originalImage || processedImage" class="image-container">
      <div class="image-block">
        <h3>Originalbild:</h3>
        <img v-if="originalImage" :src="originalImage" alt="Originalbild" />
      </div>
      <div class="arrow">→</div>
      <div class="image-block">
        <h3>Verarbeitetes Bild:</h3>
        <img
          v-if="processedImage"
          :src="processedImage"
          alt="Verarbeitetes Bild"
        />
      </div>
    </div>

    <button
      class="clear-btn"
      v-if="originalImage || processedImage"
      @click="clearImages"
    >
      Bilder löschen
    </button>
  </div>
</template>

<script>
export default {
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Upload an Image",
    },
  },
  data() {
    return {
      originalImage: null,
      processedImage: null,
      file: null,
      loading: false,
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
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
      const files = event.dataTransfer.files;
      if (files.length) {
        this.handleFileSelect({ target: { files } });
      }
    },

    resetBoxStyle() {},

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async processImage() {
      if (!this.file) return;
      this.loading = true;

      try {
        console.log("Step 1: Preparing request to the server.");

        const formData = new FormData();
        formData.append("file", this.file);

        const token = localStorage.getItem("access_token");

        console.log("Step 2: Sending image to the server.");
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to process the image");
        }

        const path = (await response.text()).trim();
        console.log(`Step 3: Received path from server: ${path}`);

        if (!path) {
          throw new Error("Invalid response path");
        }

        console.log(
          "Step 4: Waiting for 8 seconds before fetching the processed image."
        );
        setTimeout(async () => {
          console.log(
            `Step 5: Sending request to fetch processed image: http://localhost:8091/${path}`
          );
          const processedResponse = await fetch(
            `http://localhost:8091/${path}`
          );

          if (!processedResponse.ok) {
            throw new Error("Failed to fetch the processed image");
          }

          const blob = await processedResponse.blob();
          this.processedImage = URL.createObjectURL(blob);
          console.log(
            "Step 6: Successfully fetched and displayed the processed image."
          );
          this.loading = false;
        }, 8000);
      } catch (error) {
        console.error("Error during image processing:", error);
        this.loading = false;
        alert("Image processing failed");
      }
    },
    clearImages() {
      this.originalImage = null;
      this.processedImage = null;
      this.file = null;
      this.$refs.fileInput.value = "";
    },
  },

  watch: {
    originalImage(newVal) {
      if (newVal) {
        this.processImage();
      }
    },
  },
};
</script>

<style scoped>
.upload-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 2rem;
  box-sizing: border-box;
  background: #f8fafc;
  border-radius: 16px;
}

.upload-title {
  color: #1e293b;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.upload-box {
  border: 2px dashed #94a3b8;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s ease;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.upload-box:hover {
  border-color: #2563eb;
  background: #f8fafc;
  transform: translateY(-2px);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  font-size: 48px;
  color: #2563eb;
  margin-bottom: 1rem;
}

.upload-text {
  color: #1e293b;
  font-size: 1.1rem;
  margin: 0;
}

.browse-text {
  color: #2563eb;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.upload-hint {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.upload-box.dragging {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.05);
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.image-block {
  flex: 1;
  text-align: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
}

.image-block h3 {
  color: #1e293b;
  margin-bottom: 1rem;
}

.image-block img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.arrow {
  font-size: 24px;
  margin: 0 20px;
  color: #555;
}

.loading {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin-top: 20px;
}

.clear-btn {
  background: #ef4444;
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
  background: #dc2626;
  transform: translateY(-2px);
}

.type-btn {
  padding: 1rem 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ffffff;
  color: #64748b;
}

.type-btn.active {
  background: #2563eb;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.browse-btn {
  background: #2563eb;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.browse-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}
</style>
