<template>
  <div>
    <!-- <Message/> -->
    <Steps />
    <div class="grid place-items-center h-screen-sm">
      <p class="font-extrabold md:text-5xl text-4xl mb-6 mt-4">
        Create your first <i>TripletCode</i> Now:
      </p>
      <input
        type="text"
        name="snippet_name"
        placeholder="Your snippet name"
        v-model="title"
        class="input input-primary input-bordered mb-6"
      />
      <prism-editor
        class="my-editor shadow-2xl rounded md:max-w-screen-sm max-w-sm"
        v-model="code"
        :highlight="highlighter"
      />
      <!-- <CodeEditor :codeData="this.code"/> -->
      <ShareOption class="mt-6" @change="changeSnippetView" />
      <button class="btn btn-primary mt-6 mb-4" @click="userSnippetCreate()">
        Share Now
      </button>
    </div>
    <Stats />
    <div class="grid place-items-center mt-12 mb-12">
      <LastSnippets
        title="5 Most viewed snippets latley"
        :snippetsData="this.getTopSnippets"
      />
    </div>
  </div>
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
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    PrismEditor
  },
  data: () => ({
    // Snippet title & Snippet code
    title: "",
    code: 'console.log("Hello World")\n\n\n\n\n\n\n',
    public: true
  }),
  computed: {
    ...mapGetters("snippets", [
      "getTopSnippets",
      "getComponentData",
      "getCurrentSnippet"
    ])
  },
  methods: {
    ...mapActions("snippets", ["fetchTopSnippets", "fetchSnippetPOST"]),

    highlighter(code) {
      return highlight(code, languages.js);
    },
    requestAddSnippet(snippetSchema) {
      this.fetchSnippetPOST({ snippetSchema }).then(res => {
        this.$nuxt.$router.push(this.getComponentData.id);
        this.$store.commit("add", this.getCurrentSnippet);
      });
    },
    // When the user click on "Share" button
    async userSnippetCreate() {
      // title
      // const snippetInputTitle = this.title || "RandomSnippet";
      const snippetInputTitle = this.title;
      // rest of schema
      let snippetSchema = {
        snippet_data: this.code,
        snippet_settings: {
          public_view: this.public
        },
        snippet_info: { title: snippetInputTitle }
      };

      // disbaling null title if null,
      // joi(backend) validate "" as true,
      // so we must to delete in order to get uuid4.
      if (!snippetSchema.snippet_info.title)
        delete snippetSchema.snippet_info.title;

      this.requestAddSnippet(snippetSchema);
    },
    changeSnippetView(value) {
      if (value === "Public") {
        this.public = true;
      }
      if (value === "Private") {
        this.public = false;
      }
    },
    updateCodeData(v) {
      console.log(v);
    }
  },
  created() {
    this.fetchTopSnippets();
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
