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
      <div class="row-number" data-test="row-number">{{ index + 1 }}</div>
      <div data-test="row-data" @click="handleClick($event, index)">
        <row
          v-bind:text=row
          v-bind:caretOffset="caret.rowIndex === index ? caret.offset : -1"/>
      </div>
    </div>
  </div>
</template>

<script>
import Row from './Row';
import {
  getDefaultValue,
  caretMovementKeys,
  listOfSpecialKeys,
  setValueToStorage,
  updateCaret,
  updateDocumentData,
} from './utilities';

// recursively look for node in element
const findNodeInParent = (node, parent) => {
  // return false if the parent does not contain node
  if (!parent.contains(node)) {
    return -1;
  }
  // return false once we've recursed all the way to 'parent', or to
  // the document element
  if (node === parent || node === document) {
    return -1;
  }

  const nodeIndex = Array.prototype.indexOf.call(parent.childNodes, node);
  // recursively call function on the node's parent if node is not
  // found in 'parent'
  if (nodeIndex === -1) {
    return findNodeInParent(node.parentNode, parent);
  }
  return nodeIndex;
};

const getOffsetRelativeToElement = (sel, el) => {
  // return 0 as the offset if the row is empty
  if (!el) {
    return 0;
  }

  const anchorNodeInEl = findNodeInParent(sel.anchorNode, el);
  let offset = sel.anchorOffset;
  // return the original offset if the anchorNode is the first child
  // in 'el', or is not at all within 'el'.
  if (anchorNodeInEl < 1) {
    return offset;
  }

  // loop through child nodes of 'el' until we reach the anchor node
  // (or the element which contains it)
  for (let i = 0; i < anchorNodeInEl; i += 1) {
    // add the text length of each child node to the offset
    const text = el.childNodes.item(i).textContent;
    if (typeof text !== 'undefined') {
      offset += text.length;
    }
  }

  return offset;
};

export default {
  name: 'Editor',
  components: {
    row: Row,
  },
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
      // window.getSelection() only gets the offset relative to the
      // direct element or text node holding the text. We have to get
      // the offset relative to the entire row.
      const offset = getOffsetRelativeToElement(
        sel,
        document.querySelectorAll('.row-text > span')[index],
      );
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
