<template>
  <prism-editor
    class="my-editor shadow-2xl rounded md:max-w-screen-sm max-w-sm"
    v-model="code"
    :highlight="highlighter"
    ref="test"
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
  name: "Home",
  components: {
    PrismEditor
  },
  data: () => ({
    // Snippet title & Snippet code
    title: "",
    code: 'console.log("Hello World")\n\n\n\n\n\n\n'
  }),
  computed: {
    // ADD: should to be only the last 5,
    latestSnippets() {
      return this.$store.state.list;
    }
  },
  methods: {
    // highlights code (prism default function)
    highlighter(code) {
      return highlight(code, languages.js);
    },
    // fetch data and save it on state
    fetchData() {
      this.$axios.get("http://localhost:5000/").then(response => {
        this.$store.commit("pushAll", response.data);
      });
    },
    // When the user click on "Share" button
    async userSnippetCreate() {
      // SNIPPET Schema
      let snippetSchema = {
        snippet_data: this.code,
        snippet_settings: {
          public_view: true
        }
      };

      // Title input validation,
      // with backend validation aswell (default: uuid for null)
      const snippetInputTitle = this.title;
      if (snippetInputTitle !== "") {
        snippetSchema.snippet_info = {
          title: snippetInputTitle
        };
      }

      // Send the data &
      // Store in state &
      // Redirect to snippet_id view
      await this.$axios
        .post("http://localhost:5000/", snippetSchema, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.$store.commit("add", res.data);
          this.$nuxt.$router.push(`${res.data._id}`);
        });
    },
    test() {
      console.log(this.$refs);
    }
  },
  created() {
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
