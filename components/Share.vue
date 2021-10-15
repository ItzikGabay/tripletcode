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
        <input type="text" v-model="message" style="display: none;" />
        <button
          class="btn btn-primary"
          :disabled="!this.message"
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          Copy code to clipboard
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  props: ["codeData"],
  computed: {
    absolutePath() {
      let query = "";
      if (this.$route.query.id) {
        console.log(this.$route.query.id);
        query = `?id=${this.$route.query.id}`;
      }
      // console.log(
      //   `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}`
      // );
      return `${process.env.baseUrl.slice(0, -1)}${this.$router.history.base}${
        this.$route.path
      }${query}`;
    }
  },
  methods: {
    onCopy: function(e) {
      alert("You just copied: " + e.text);
    },
    onError: function(e) {
      alert("Failed to copy texts");
    }
  },
  watch: {
    codeData() {
      this.message = this.codeData.trim();
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
