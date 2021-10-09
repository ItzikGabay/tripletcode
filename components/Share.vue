<template>
  <div>
    <div class="card sm:card-side bordered max-w-4xl shadow-inner mt-8">
      <div class="card-body">
        <h2 class="card-title font-extralight text-purple-500">
          Share & Like & Comment & Copy!
        </h2>
        <div class="card-actions">
          <button class="btn btn-primary" @click="copyCode()">Copy!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.card-actions {
  margin: 0 auto;
}
</style>
