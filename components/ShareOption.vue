<template>
  <div>
    <div class="inline-flex">
      <select
        name="snippetType"
        v-model="snippetType"
        class="select select-bordered select-primary"
        @change="onChangeView()"
      >
        <option selected="selected">Snippet</option>
        <option>Live</option>
        <option disabled="disabled">Picture (Very soon!)</option>
      </select>
      <label class="label">on</label>
      <select
        name="snippetView"
        v-model="snippetView"
        class="select select-bordered select-primary"
        @change="onChange()"
      >
        <option selected="selected">Public</option>
        <option selected="selected">Private</option>
        <!-- <option disabled="disabled">Private</option> -->
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snippetType: "Snippet",
      snippetView: "Public"
    };
  },
  methods: {
    async onChange(event) {
      this.$emit("change", this.snippetView);
      if (this.snippetType === "Live") {
        await this.$router.push("/live");
      }
    },
    async onChangeView(event) {
      this.$emit("change", this.snippetType);
      if (this.snippetType === "Live") {
        await this.$router.push("/live");
      }
    }
  }
};
</script>

<style></style>
