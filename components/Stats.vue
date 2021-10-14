<template>
  <div class="w-full shadow stats">
    <div class="stat place-items-center place-content-center">
      <div class="stat-title">Public Snippets</div>
      <div class="stat-value">1,905</div>
      <div class="stat-desc">Jan 1st - Feb 1st</div>
    </div>
    <div class="stat place-items-center place-content-center">
      <div class="stat-title">New Users</div>
      <div class="stat-value text-success">97</div>
      <div class="stat-desc text-success">↗︎ 400 (22%)</div>
    </div>
    <div class="stat place-items-center place-content-center">
      <div class="stat-title">Secret Snippets</div>
      <div class="stat-value text-error">1,200</div>
      <div class="stat-desc text-error">↘︎ 90 (14%)</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .stat {
    font-size: 18px !important;
    max-width: 100% !important;
  }
  .stat-title {
    font-size: 16px !important;
  }

  .stat-value {
    font-size: 22px !important;
  }

  .stat-desc {
    font-size: 10px !important;
  }
}
</style>
