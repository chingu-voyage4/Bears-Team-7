<template>
  <div class="editor" @keydown.prevent="handleKeyboardPress" tabindex="0" data-test="editor">
    {{ documentData }}
  </div>
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
    cursor: {
      // use a Selection object
    },
  }),
  // define methods under the `methods` object
  methods: {
    handleKeyboardPress(event) {
      // handle key actions
      switch (event.keyCode) {
        // Backspace
        case 8:
          this.documentData = this.documentData.slice(0, -1);
          break;
        // Left
        case 37:
          break;
        // Up
        case 38:
          break;
        // Right
        case 39:
          break;
        // Down
        case 40:
          break;
        // Text input
        default: 
          this.documentData =
              this.documentData + getKeyValueToRender(event.keyCode, event.key);
      
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
