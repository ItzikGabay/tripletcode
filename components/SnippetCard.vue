<template>
  <div
    class="grid place-items-center h-screen-sm mb-8 mt-4 shadow-2xl bordered pb-12"
  >
    <div>
      <h2 class="card-title font-extralight text-purple-500">
        {{ getComponentData.title }}
      </h2>
      <p class="text-2xl"><b>Author:</b></p>
      <p class="font-extralight">{{ getComponentData.author }}</p>

      <p class="text-2xl"><b>Date created:</b></p>
      <p class="font-extralight">{{ getComponentData.date_created }}</p>

      <p class="text-2xl"><b>Public:</b></p>
      <p class="font-extralight">{{ getComponentData.public }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("snippets", ["getComponentData"])
  }
};
</script>

<style>
.card-title {
  font-size: 3em;
}
</style>
