<template>
  <div class="grid place-items-center h-screen-sm mb-8 mt-4 shadow-2xl bordered pb-12">
<div>
    <h2 class="card-title font-extralight text-purple-500">{{getCurrent.title}}</h2> 
    <p class="text-2xl"><b>Author:</b></p>
    <p class="font-extralight">{{getCurrent.author}}</p>
    
    <p class="text-2xl"><b>Date created:</b></p>
    <p class="font-extralight">{{getCurrent.date_created}}</p>

    <p class="text-2xl"><b>Public:</b></p>
    <p class="font-extralight">{{getCurrent.public}}</p>
</div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
    ...mapGetters("snippets", ["getCurrent"]),
  },

}
</script>

<style>

</style>