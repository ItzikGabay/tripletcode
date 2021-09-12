<template>
  <div>
    <h1>Vue Prism Editor Nuxt</h1>
    <ClientOnly>
      <CodeEditor/>
    </ClientOnly>
  </div>
</template>
<script>
import CodeEditor from "~/components/CodeEditor.vue";
export default {
  components: {
    CodeEditor
  }
};
</script>

