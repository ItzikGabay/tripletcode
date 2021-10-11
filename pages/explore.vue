<template>
  <div>
    <div class="grid place-items-center mt-12 mb-12">
      <h1 class="text-2xl sm:text-3xl font-mono">Last 50 snippets by date:</h1>
      <div class="divider"></div>
      <button>Sort by date</button>
      <button @click="this.highestSortButton">Sort by score</button>
      <LastSnippets
        title="Last 50 snippets"
        :snippetsData="this.getSnippetsList"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("snippets", ["getSnippetsList"]),
    sortByHighest() {
      let result = [...this.getSnippetsList];
      result.sort(function(a, b) {
        return a.views - b.views;
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
    highestSortButton() {}
  },
  created() {
    // On created, fetch data and store in state.
    this.fetchExploreSnippets();
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
