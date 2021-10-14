<template>
  <div>
    <Steps />
    <SnippetCard />
    <!-- CodeEditor Component -->
    <div class="grid place-items-center h-screen-sm mb-20 mt-4">
      <prism-editor
        class="my-editor shadow-2xl rounded max-w-screen-sm"
        v-model="code"
        :highlight="highlighter"
      />
      <!-- <CodeEditor /> -->
      <!-- END CodeEditor Component -->
      <Share />
    </div>
  </div>
</template>

<script>
import daisyui from "daisyui";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    PrismEditor
  },
  data: () => ({
    // loading state
    code: "Loading.."
  }),
  computed: {
    ...mapGetters("snippets", ["getComponentData"])
  },
  methods: {
    ...mapActions("snippets", ["fetchSnippetById"]),

    highlighter(code) {
      return highlight(code, languages.js);
    },
    changeInput(e) {
      // console.log(e);
      // this.code =
    }
  },
  async created() {
    /**
     * Checks if the state already loaded,
     * IF TRUE: load again from the state.
     * IF FALSE: make DB request and push to state.
     */
    let currentStateId = this.getComponentData.id;
    let params = this.$route.params.id;
    let currentStateCode = this.getComponentData.code;
    this.code = currentStateCode;

    // if (!(currentStateId === params)) {
    await this.fetchSnippetById({ snippet_id: params });
    this.code = this.getComponentData.code;
    // }

    // this.$axios.get(`http://localhost:5000/${params}`).then(res => {
    //   console.log(res);
    //   this.code = res.data.snippet_data;
    // });
  }
};
</script>

<style>
/* Reset basic CSS configuration */
/* ########## */
body,
h1,
h2,
h3,
h4,
h5 {
  padding: 0;
  margin: 0;
}
/* ########## */
/* END Reset basic CSS configuration */

/* Editor Styling */
/* ########## */
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
/* ########## */
/* END Editor Styling */
</style>
