<template>
  <div>
    <UploadImage
      apiUrl="http://localhost:8091/predict/teeth"
      title="Upload Image for Teeth Detection"
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
