<template>
  <div
    class="editor"
    data-test="editor"
    @keydown="handleKeyDown"
    tabindex="0"
  >
    <div
      class="row"
      data-test="editor-row"
      v-for="(row, index) in documentData"
      :class="[`${(documentData.length - 1) === index ? 'current' : ''}`]"
      v-bind:key=index
    >
      <div class="row-number" data-test="row-number">{{ index + 1 }}</div>
      <div data-test="row-data" @click="handleClick($event, index)">{{ row }}</div>
    </div>
  </div>
</template>

<script>
import {
  getDefaultValue,
  listOfSpecialKeys,
  setValueToStorage,
  updateCaretAtInput,
  updateCaretAtSpecialKey,
  updateDocumentData,
} from './utilities';

export default {
  name: 'Editor',
  data: () => {
    const documentData = getDefaultValue();
    return {
      documentData,
      caret: {
        // use offset to determine caret position
        offset: documentData[documentData.length - 1].length,
        rowIndex: documentData.length - 1,
      },
    };
  },
  // define methods under the `methods` object
  methods: {
    handleKeyDown(event) {
      const documentData = this.documentData;
      if (listOfSpecialKeys[event.keyCode]) {
        this.caret = updateCaretAtSpecialKey(documentData, this.caret, event);
        return;
      }
      // cancel if the control, alt, or meta key is held
      // (we don't want to swallow up the browser shortcuts)
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }
      this.documentData = updateDocumentData(documentData, this.caret, event);
      this.caret = updateCaretAtInput(documentData, this.caret, event);
      setValueToStorage(this.documentData);
    },
    handleClick(event, index) {
      this.caret.offset = window.getSelection().anchorOffset;
      this.caret.rowIndex = index;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.editor {
  background-color: $editor-background;
  color: $editor-fontColor;
  height: 100%;
  white-space: pre;
  font-size: 16px;
  text-align: left;
  padding-left: 60px;
  padding-top: 15px;
  overflow: scroll;
  :focus {
    outline: 0;
  }
  .row {
    height: 22px;
    display: flex;
    .row-number {
      flex-basis: 60px;
      text-align: center;
      color: #484848;
    }
  }
  .row.current {
    background-color: $editor-currentLineBackground;
  }
}
</style>
