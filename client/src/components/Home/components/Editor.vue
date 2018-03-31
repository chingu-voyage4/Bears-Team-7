<template>
<div id="editor"
     class="editor"
     @keydown.prevent="handleKeyDown"
     @mouseup="handleMouseUp"
     tabindex="0"
     data-test="editor">{{documentData}}</div>
</template>

<script>
const getKeyValueToRender = (keyCode, keyValue) => {
  switch (keyCode) {
    case 13:
      // Enter
      return '\n';
    case 9:
      // Tab
      return '\xa0\xa0';
    default:
      return keyValue;
  }
};

export default {
  name: 'Editor',
  data: () => ({
    documentData: '',
    caret: {
      // use offset to determine caret position
      offset: 0,
    },
  }),
  // define methods under the `methods` object
  methods: {
    handleKeyDown(event) {
      // cancel if the control, shift, alt, or meta key is held
      if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
        return;
      }

      // handle key actions
      switch (event.keyCode) {
        // Backspace
        case 8:
          this.documentData =
            this.documentData.slice(
              0,
              Math.max(0, this.caret.offset - 1),
            ) + this.documentData.slice(this.caret.offset);
          // move caret to the index before the deleted character
          this.caret.offset = Math.max(0, this.caret.offset - 1);
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
            this.documentData.slice(0, this.caret.offset) +
            getKeyValueToRender(event.keyCode, event.key) +
            this.documentData.slice(this.caret.offset);
          // move caret to the index after the appended character.
          this.caret.offset += 1;
          break;
      }
    },
    handleMouseUp() {
      const sel = window.getSelection();
      // check whether selected element is the editor
      if (document.activeElement === document.getElementById('editor')) {
        this.caret.offset = sel.anchorOffset;
      }
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
  padding-top: 15px;
  padding-left: 120px;
  overflow: scroll;
}
.editor:focus {
  outline: 0;
}
</style>
