<template>
  <div>
    <div class="grid place-items-center mt-12 mb-12">
      <h1 class="text-2xl sm:text-3xl font-mono mb-8">
        Last 50 snippets by date:
      </h1>
      <!-- <div class="divider"></div> -->
      <div class="sortBy mb-6">
        <button class="btn btn-wide btn-sm" @click="this.sortByDefault">
          Sort by date
        </button>
        <button
          class="btn btn-wide btn-sm btn-outline"
          @click="this.highestSortButton"
        >
          Sort by views 
        </button>
      </div>
      <LastSnippets title="Last 50 snippets" :snippetsData="this.list" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapGetters("snippets", ["getSnippetsList"]),
    sortByHighest() {
      let result = [...this.getSnippetsList];
      result.sort(function(a, b) {
        return b.views - a.views;
      });
      return result;
    }
  },
  methods: {
    ...mapActions("snippets", ["fetchExploreSnippets"]),
    // code editor default function
    highlighter(code) {
      return highlight(code, languages.js);
    },
    highestSortButton() {
      this.list = this.sortByHighest;
    },
    sortByDefault() {
      this.list = this.getSnippetsList;
    }
  },
  async created() {
    // On created, fetch data and store in state.
    await this.fetchExploreSnippets();
    this.list = this.getSnippetsList;

    /**
     *  NEW FIX:
     *
     * 1. fetch the data and load to store
     * 2. update this.code to show user
     * 3.
     **/
  }
};
</script>

<style>
body,
h1,
h2,
h3,
h4,
h5 {
  padding: 0;
  margin: 0;
}

.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>
