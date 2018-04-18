<template>
  <div
    class="row"
    data-test="row"
    v-html="html"
  />
</template>

<script>
import transformText from './textHighlights';

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
      this.html = transformText(newText);
    },
  },
  data: function data() {
    return {
      html: transformText(this.text),
    };
  },
};
</script>

<style scoped>
/* prettier-ignore */
.row >>> .red {
  color: red;
}
/* prettier-ignore */
.row >>> .blue {
  color: blue;
}
</style>
