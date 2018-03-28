<template>
  <div
    class="editor"
    @keydown.prevent="handleKeyboardPress"
    tabindex="0"
    data-test="editor"
  >
    <div
      class="row"
      v-for="(row, index) in documentData"
      :class="[`${(currentRowNumber - 1) === index ? 'current' : ''}`]"
      v-bind:key=index>{{ row }}</div>
  </div>
</template>

<script>
import {
  getDefaultValue,
  setRowNumber,
  setValueToStorage,
  updateDocumentData,
} from './utilities';

export default {
  name: 'Editor',
  data: () => {
    const documentData = getDefaultValue();
    return {
      documentData,
      currentRowNumber: documentData.length,
    };
  },
  // define methods under the `methods` object
  methods: {
    handleKeyboardPress(event) {
      // handle key input
      this.documentData = updateDocumentData(
        this.documentData,
        this.currentRowNumber,
        event,
      );
      this.currentRowNumber = setRowNumber(
        this.documentData[this.currentRowNumber - 1],
        this.currentRowNumber,
        event,
      );
      setValueToStorage(this.documentData);
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
  overflow: scroll;
  :focus {
    outline: 0;
  }
  .row {
    height: 22px;
    padding-left: 60px;
  }
  .row.current {
    background-color: $editor-currentLineBackground;
  }
}
</style>
