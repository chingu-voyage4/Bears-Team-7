<template>
  <div
    class="editor"
    @keydown.prevent="handleKeyboardPress"
    tabindex="0"
    data-test="editor"
  >{{documentData}}</div>
</template>

<script>
const getKeyValueToRender = (keyCode, keyValue) => {
  switch (keyCode) {
    // Enter
    case 13:
      return '\n';
    // Tab
    case 9:
      return '\xa0\xa0';
    default:
      return keyValue;
  }
};

export default {
  name: 'Editor',
  data: () => ({
    documentData: '',
  }),
  mounted() {
    if (localStorage && localStorage.documentData) {
      this.documentData = localStorage.documentData;
    }
  },
  // define methods under the `methods` object
  methods: {
    handleKeyboardPress(event) {
      // handle key actions
      // backspace
      if (event.keyCode === 8) {
        this.documentData = this.documentData.slice(0, -1);
      } else {
        // handle key input
        this.documentData =
          this.documentData + getKeyValueToRender(event.keyCode, event.key);
      }
      localStorage.setItem('documentData', this.documentData);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.editor {
  background-color: #1e2127;
  color: #9ba1a2;
  height: 100%;
  white-space: pre;
  font-size: 16px;
  text-align: left;
  padding-left: 120px;
  overflow: scroll;
}
.editor:focus {
  outline: 0;
}
</style>
