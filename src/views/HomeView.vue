<template>
  <div class="upload-container">
    <h2 id="upload-title">
      {{
        currentMode === "teeth"
          ? "Upload Image for Teeth"
          : "Upload Image for Smoke"
      }}
    </h2>
    <button class="toggle-btn" @click="toggleMode">
      {{ currentMode === "teeth" ? "Switch to Smoke" : "Switch to Teeth" }}
    </button>
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
    <div class="preview" v-if="previewUrl">
      <img :src="previewUrl" alt="Preview Image" />
    </div>
    <button class="clear-btn" v-if="previewUrl" @click="clearPreview">
      Clear Image
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMode: "teeth",
      previewUrl: null,
    };
  },
  methods: {
    toggleMode() {
      this.currentMode = this.currentMode === "teeth" ? "smoke" : "teeth";
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.clearPreview();
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
    clearPreview() {
      this.previewUrl = null;
      this.$refs.fileInput.value = "";
    },
  },
};
</script>
<style scoped></style>
