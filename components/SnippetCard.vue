<template>
  <div class="h-screen-sm mb-8 mt-4 shadow-2xl bordered pb-12 main text-center">
    <div class="content">
      <h2 class="card-title bold text-purple-500">
        {{ getComponentData.title }}
      </h2>
      <!-- <p class="text-2xl"><b>Author:</b></p> -->
      <!-- <p class="font-extralight">Owner: {{ getComponentData.author }}</p> -->

      <!-- <p class="text-2xl"><b>Date created:</b></p> -->
      <p class="">
        Posted <b class="bold">{{ this.manipulatedDateFormat }}</b>
      </p>
      <p>
        Snippet by <b class="bold">@{{ getComponentData.author }}</b>
      </p>
      <p class="font-extralight">
        This snippet is <b class="bold">{{ this.manipulatePublicView }}</b>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("snippets", ["getComponentData"]),
    manipulatedDateFormat() {
      if (this.getComponentData.date_created) {
        let newDate = this.getComponentData.date_created;
        newDate = newDate.slice(0, -5);
        newDate = newDate.split("T");
        let date = newDate[0];
        let time = newDate[1];
        return `${date} on ${time}`;
      }
    },
    manipulatePublicView() {
      if (!this.getComponentData.public) {
        return `private.`;
      }
      return `public.`;
    }
  }
};
</script>

<style>
.card-title {
  font-size: 2.5em;
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  margin: 0 auto;
}
</style>
