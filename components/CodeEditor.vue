<template>
  <prism-editor
    class="my-editor shadow-2xl rounded md:max-w-screen-sm max-w-sm"
    v-model="this.code"
    :highlight="highlighter"
  />
</template>

<script>
// import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs";

export default {
  name: "",
  // props: ["codeData"],
  components: {
    PrismEditor
  },
  data: () => ({
    // Snippet title & Snippet code
    title: "",
    code: 'console.log("Hello World from code editor")\n\n\n\n\n\n\n'
  }),
  computed: {},
  methods: {
    // highlights code (prism default function)
    highlighter(code) {
      return highlight(code, languages.js);
    },
    onInputChange(event) {
      // this.$emit("inputChanged", this.code);
      // this.$emit("change", this.code);
    }
  },
  created() {
    // this.code = this.codeData;
    // Whenever created, fetch data
    // and store in state.
    // this.fetchData();
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
