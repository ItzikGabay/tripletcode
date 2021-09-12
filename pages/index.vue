<template>
  <div>
    <!-- <Message/> -->
    <Steps />
    <div class="grid place-items-center h-screen-sm">
      <p class="font-extrabold text-5xl mb-6 mt-4">
        Create your TripletCode Now:
      </p>
      <input
        type="text"
        placeholder="Snippet Name"
        v-model="title"
        class="input input-primary input-bordered mb-6"
      />
      <prism-editor
        class="my-editor shadow-2xl rounded max-w-screen-sm"
        v-model="code"
        :highlight="highlighter"
      />
      <ShareOption class="mt-6" />
      <button class="btn btn-primary mt-6 mb-4" @click="alert">
        Share Code
      </button>
    </div>
    <Stats />
    <div class="grid place-items-center mt-12 mb-12">
      <LastSnippets />
    </div>
  </div>
</template>

<script>
import daisyui from "daisyui";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

import { mapActions, mapState, mapMutations } from "vuex";
import axios from 'axios';

export default {
  name: 'index',
  components: {
    PrismEditor,
  },
  data: () => ({
    title: "",
    code: 'console.log("Hello World")\n\n\n\n\n\n\n',
  }),
  computed: {
    // ...mapActions("root",["getLatestSnippets"]),
    latestSnippets() {
      return this.$store.state.list;
    },
  },
  // async asyncData(ctx) {
  //   // debugger;
  //   let result = await ctx.app.$axiosController.index();
  // },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
    retriveSnippetsList() {
      axios.get('http://localhost:4001')
      .then(response => {
        let result = response.data
        this.$store.commit("pushAll", result)
      })
      // this.$store.dispatch("getSnippetById", "613ce161c25c8c09510e7350");
    },
    async alert() {
      // this.$store.dispatch("addNewSnippet")
      let object = {
        snippet_data: this.code,
        snippet_settings: {
          public_view: true,
        },
      };
      if (this.title !== "") {
        object = {
          ...object,
          snippet_info: {
            title: this.title,
          },
        };
      }
      await axios.post('http://localhost:4001/', object, {
      headers: {
      'Content-Type': 'application/json'
      }
      })
      .then(res => {
        this.$store.commit("add", res.data);
      })
      
      // const result = await this.$axiosController.create(object);
    },
  },
  created() {
    this.retriveSnippetsList();
  },
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