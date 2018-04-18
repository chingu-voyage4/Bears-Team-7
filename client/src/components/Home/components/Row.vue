<template>
  <div
    class="row"
    data-test="row"
    v-html="html"
  />
</template>

<script>
const parseTextToHTML = (text) => {
  let html = text;
  html = html.replace(/const/g, '<span class="red: red">const</span>');
  html = html.replace(/var/g, '<span class="red: red">var</span>');
  html = html.replace(/let/g, '<span class="red: red">let</span>');
  html = `<span>${html}</span>`;
  return html;
};
export default {
  name: 'Row',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  watch: {
    text: function text(newText) {
      this.html = parseTextToHTML(newText);
    },
  },
  data: function data() {
    return {
      html: parseTextToHTML(this.text),
    };
  },
};
</script>

<style scoped>
.row >>> .red {
  color: red;
}
</style>
