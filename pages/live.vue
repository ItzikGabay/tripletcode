<template>
  <div>
    <Steps />

    <!-- CodeEditor Component -->
    <div class="grid place-items-center h-screen-sm mb-20 mt-4">
      <div class="p-10 card bg-base-200 mb-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="username"
            class="input"
            v-model="username"
          />
        </div>
      </div>

      <prism-editor
        class="my-editor shadow-2xl rounded max-w-screen-sm"
        v-model="code"
        :highlight="highlighter"
        v-on:keyup.enter="onEnter"
      />
      <!-- END CodeEditor Component -->
      <Share :codeData="this.code" />
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
import Pusher from "pusher-js";

export default {
  components: {
    PrismEditor
  },
  data: () => ({
    code:
      "// last updated: Fresh live. \n// Session started. please start type here: \n",
    messages: [],
    username: "",
    senderId: "",
    query_id: ""
  }),
  computed: {
    ...mapGetters("snippets", ["getCurrent"])
  },
  methods: {
    ...mapActions("snippets", ["fetchSnippetById"]),
    /**
     * Code editor module function.
     */
    highlighter(code) {
      return highlight(code, languages.js);
    },
    // disabled
    // createHotLoading() {
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(() => {
    //     this.codeDataFetch();
    //   }, 2000);
    // },
    async codeDataFetch() {
      await this.$axios.$post("https://triplet-code.herokuapp.com/live", {
        username: this.username,
        codeData: this.code,
        query_id: this.$route.query.id
      });
    },
    onEnter: function() {
      this.codeDataFetch();
    },
    createTimeByHour() {
      var today = new Date();
      var time = today.getMinutes() + "" + today.getSeconds();
      return time;
    },
    storeNickname(nickname) {
      if (process.client) {
        localStorage.setItem("LIVE_NICKNAME", nickname);
      }
    },
    validateUserNickname() {
      if (process.client) {
        let localNickname = localStorage.getItem("LIVE_NICKNAME");
        this.username = localNickname;
        console.log(localNickname);
        if (!this.username || !localNickname) {
          let newNickname = `Guest${this.createTimeByHour()}`;
          this.storeNickname(newNickname);
          this.username = newNickname;
        }
      }
    },
    getFullTimeFormat() {
      var today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return time;
    },
    manipulateCodeBoxInput(data) {
      this.senderId = data.id || "Guest";
      let time = this.getFullTimeFormat();
      let idxOfDuplicatedString = data.message.indexOf("\n");
      let result = data.message.substring(
        idxOfDuplicatedString + 1,
        data.message.length - 1
      );
      return `${data.message}`;
      // return `// last updated: ${this.senderId} - ${time}\n${result}\n`;
      // return `// last updated: ${this.senderId} - ${time}\n${result}\n`;
    },
    createPusherConnection() {
      var pusher = new Pusher("27c1635cedaefecbfb7c", {
        cluster: "eu"
      });

      var channel = pusher.subscribe(this.query_id);
      return {
        pusher,
        channel
      };
    },
    createPusherSubscription() {
      const { pusher, channel } = this.createPusherConnection();
      channel.bind("my-event", data => {
        if (data.id !== this.username)
          this.code = this.manipulateCodeBoxInput(data);
      });
    }
  },
  async created() {
    this.validateUserNickname();
    this.query_id = this.$route.query.id;
    if (!this.query_id || !Number(this.query_id)) {
      this.query_id = Math.floor(100000000 + Math.random() * 900000000);
      return this.$router.push("/live?id=" + this.query_id);
    }
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;
    this.createPusherSubscription();
  },
  watch: {
    username() {
      this.storeNickname(this.username);
    }
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
