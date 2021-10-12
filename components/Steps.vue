<template>
  <ul class="w-full steps mt-6 mb-6">
    <li class="step" v-bind:class="{ 'step-primary': this.step1 }">Join</li>
    <li class="step" v-bind:class="{ 'step-primary': this.step2 }">Create</li>
    <li class="step" v-bind:class="{ 'step-primary': this.step3 }">Share</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      step1: true,
      step2: false,
      step3: false,
      step4: false
    };
  },
  created() {
    if (this.$route.path === "/") {
      this.step1 = true;
    }
    if (this.$route.path === "/live") {
      this.step1 = true;
      this.step2 = true;
      this.step3 = true;
    }
    if (this.$route.params.id) {
      this.step2 = true;
    }
  }
};
</script>

<style></style>
