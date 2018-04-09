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
      :class="[`${caret.rowIndex === index ? 'current' : ''}`]"
      @click="handleClick($event, index)"
      v-bind:key=index
    >
      <div
        class="row-number"
        data-test="row-number"
        >{{ index + 1 }}
      </div>
      <div
        data-test="row-data-caret"
        @click="handleClick($event, index)"
        v-if="caret.rowIndex === index"
        ><span
          class="row-before-caret"
          data-test="row-before-caret"
          >{{ row.slice(0, caret.offset) }}</span>
        <span
          class="row-after-caret"
          data-test="row-after-caret"
          >{{ row.slice(caret.offset) }}</span>
      </div>
      <div
        data-test="row-data"
        @click="handleClick($event, index)"
        v-else
        >{{ row }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDefaultValue,
  caretMovementKeys,
  listOfSpecialKeys,
  setValueToStorage,
  updateCaret,
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
        return;
      }
      // cancel if the control, alt, or meta key is held
      // (we don't want to swallow up the browser shortcuts)
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }
      // Do not update the document if the key pressed is simply meant
      // to move the caret.
      if (!caretMovementKeys[event.keyCode]) {
        this.documentData = updateDocumentData(documentData, this.caret, event);
        setValueToStorage(this.documentData);
      }
      this.caret = updateCaret(documentData, this.caret, event);
    },
    handleClick(event, index) {
      const sel = window.getSelection();
      let offset = sel.anchorOffset;
      // if the offset taken from window.getSelection is related to
      // the row-after-caret element, add the caret offset, which is
      // the length of the row-before-caret element
      if (sel.anchorNode.parentElement.className === 'row-after-caret') {
        offset += this.caret.offset;
      }
      this.caret.offset = offset;
      this.caret.rowIndex = index;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  .row-before-caret::after {
    content: '';
    background: $editor-fontColor;
    width: 1px;
    position: absolute;
    animation: blink 2s step-end infinite;
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
