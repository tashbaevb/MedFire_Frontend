<template>
  <div class="upload-container">
    <h2>{{ title }}</h2>
    <div
      class="upload-box"
      @dragover.prevent
      @drop="handleDrop"
      @dragleave="resetBoxStyle"
    >
      <p @click="triggerFileInput">
        Drag & Drop an image here or <span>click to browse</span>
      </p>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFileSelect"
        hidden
      />
    </div>
    <div v-if="loading" class="loading">
      <p>Processing...</p>
    </div>

    <!-- Display images -->
    <div v-if="originalImage || processedImage" class="image-container">
      <div class="image-block">
        <h3>Original Image:</h3>
        <img v-if="originalImage" :src="originalImage" alt="Original Image" />
      </div>
      <div class="arrow">→</div>
      <div class="image-block">
        <h3>Processed Image:</h3>
        <img
          v-if="processedImage"
          :src="processedImage"
          alt="Processed Image"
        />
      </div>
    </div>

    <button
      class="clear-btn"
      v-if="originalImage || processedImage"
      @click="clearImages"
    >
      Clear Images
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
  text-align: center;
  padding: 20px;
}

.upload-box {
  border: 2px dashed #ccc;
  padding: 20px;
  cursor: pointer;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.image-block {
  width: 45%;
  text-align: center;
}

.image-block img {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  margin-top: 20px;
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
