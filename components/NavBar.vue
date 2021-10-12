<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box"
  >
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold">
        <img src="~/assets/codetemp.png" class="inline-block w-10" />
        <NuxtLink to="/">TripletCode</NuxtLink>
      </span>
    </div>
    <div class="flex-none hidden px-2 mx-2 lg:flex">
      <div class="flex items-stretch">
        <NuxtLink class="btn btn-ghost btn-sm rounded-btn" to="/"
          >Share</NuxtLink
        >
        <NuxtLink class="btn btn-primary btn-sm rounded-btn" to="/live"
          >Start Session</NuxtLink
        >
        <NuxtLink class="btn btn-ghost btn-sm rounded-btn" to="/explore"
          >Explore</NuxtLink
        >
      </div>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
