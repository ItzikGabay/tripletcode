<template>
  <div>
    <Steps />
    <SnippetCard />

    <div id="card">
      <div id="title">
        <p>{{getSnippetData.title}}</p>
        <p>{{test}}</p>
      </div>
      <div id="owner">
        <p>{{getSnippetData.author}}</p>
      </div>
      <div id="created_at">
        <p>{{getSnippetData.date_created}}</p>
      </div>
      <div id="views">
        <p>{{getSnippetData.views}}</p>
      </div>
      <div id="public-view">
        <p>Public: {{getSnippetData.public}}</p>
      </div>
    </div>
    <div class="grid place-items-center h-screen-sm mb-20 mt-6">
      <prism-editor
        class="my-editor shadow-2xl rounded max-w-screen-sm"
        v-model="code"
        :highlight="highlighter"
      />
    </div>
  </div>
</template>

<script>
import daisyui from "daisyui";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import axios from 'axios';

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
  },
  data: () => ({
    title: "Loading..",
    code: 'Loading..',
    currentSnippet: {}
  }),
  computed: {
    setSnippetData() {
      let result = {
        title: this.$store.state.currentView.snippet_info?.title,
        date_created: this.$store.state.currentView.snippet_info?.date_created,
        author: this.$store.state.currentView.snippet_info?.owner_id,
        code: this.$store.state.currentView.snippet_data,
        public: this.$store.state.currentView.snippet_settings?.public_view,
        views: this.$store.state.currentView?.views,
        id: this.$store.state.currentView?._id,
      }
      this.$store.commit("setCurrentSnippetState", result)
      return result;
    },
    getSnippetData() {
      return this.$store.state.currentSnippet;
    },
    test() {
      return this.$store.state.currentView;
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },
    async getData() {
      let snippet_id = this.$route.params.id;
      axios.get(`http://localhost:4001/${snippet_id}`)
      .then(response => {
        this.code = response.data?.snippet_data;
        this.title = response.data?.snippet_data?.title;
        this.currentSnippet = response.data
        debugger;
        this.$store.commit("setCurrentViewState", response.data)
        return response.data
      })
    }
  },
  async created() {
    await this.getData()
    // this.currentSnippet = response.data
    // this.$store.commit("setCurrentViewState", response.data)
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