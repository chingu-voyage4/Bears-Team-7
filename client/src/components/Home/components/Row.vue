<template>
  <div
    class="line"
    data-test="line"
    v-html="html"
  />
</template>

<script>
const parseTextToHTML = (text) => {
  let html = text;
  html = html.replace(/const/g, '<span style="color: red">const</span>');
  html = html.replace(/var/g, '<span style="color: red">var</span>');
  html = html.replace(/let/g, '<span style="color: red">let</span>');
  html = `<span>${html}</span>`;
  return html;
};
export default {
  name: 'Line',
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
