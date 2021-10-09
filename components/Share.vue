<template>
  <div>
    <div class="card sm:card-side bordered max-w-4xl shadow-inner mt-8">
      <div class="card-body">
        <p class="share-text card-title font-extralight text-purple-500">
          Copy and Share Snippet:
        </p>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Share link:</span>
          </label>
          <input
            type="text"
            :value="this.absolutePath"
            placeholder="username"
            class="input input-primary input-bordered"
          />
        </div>
        <label class="label">
          <span class="label-text">OR</span>
        </label>

        <button class="btn btn-primary" @click="copyCode()">
          Copy code to clipboard
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    absolutePath() {
      return `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}`;
    }
  },
  methods: {
    copyCode() {
      document.execCommand("copy");
    }
  }
};
</script>

<style>
.card-title {
  display: flex;
}
.share-text {
  font-size: 1.5em !important;
}
.card-actions {
  margin: 0 auto;
}
</style>
