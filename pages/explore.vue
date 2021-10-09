<template>
  <div>
    <div class="grid place-items-center mt-12 mb-12">
      <h1 class="text-2xl sm:text-3xl font-mono">Last 50 snippets by date:</h1>
      <div class="divider"></div>
      <LastSnippets title="Last 50 snippets" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    latestSnippets() {
      return this.$store.state.list;
    }
  },
  methods: {
    // code editor module default function
    highlighter(code) {
      return highlight(code, languages.js);
    },
    // fetch data and save it on state
    fetchData() {
      this.$axios.get("http://localhost:5000/explore").then(response => {
        this.$store.commit("pushAll", response.data);
      });
    }
  },
  created() {
    // Whenever created, fetch data
    // and store in state.
    this.fetchData();
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
