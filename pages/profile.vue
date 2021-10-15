<template>
  <div id="app" class="container text-center">
    <h4 class=""><strong>Example to Print div in Vue</strong></h4>
    <div>
      <a href="http://techformist.com/save-div-image-javascript" target="_blank"
        >Accompanying Blog Post</a
      >
    </div>
    <button @click="printThis">Print!</button>

    <div class="text-center" ref="printcontent">
      <div><strong>Example content to print</strong></div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="green"
          stroke-width="4"
          fill="yellow"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  methods: {
    async printThis() {
      console.log("printing..");
      const el = this.$refs.printcontent;

      const options = {
        type: "dataURL"
      };
      const printCanvas = await html2canvas(el, options);

      const link = document.createElement("a");
      link.setAttribute("download", "download.png");
      link.setAttribute(
        "href",
        printCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();

      console.log("done");
    }
  },
  data: () => ({})
};
</script>

<style></style>
