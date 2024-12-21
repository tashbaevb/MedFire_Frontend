<template>
  <div>
    <UploadImage
      apiUrl="http://localhost:8091/predict/fire"
      title="Upload Image for Fire Detection"
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
