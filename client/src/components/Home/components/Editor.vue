<template>
  <div
    class="editor"
    data-test="editor"
    @keydown="handleKeyDown"
    @keyup="handleKeyDown"
    @mouseup="handleMouseUp"
    tabindex="0"
  >
    <div
      class="row"
      data-test="editor-row"
      v-for="(row, index) in documentData"
      :class="[`${(documentData.length - 1) === index ? 'current' : ''}`]"
      v-bind:key=index
    >
      <div class="row-number" data-test="row-number">{{ index }}</div>
      <div data-test="row-data">{{ row }}</div>
    </div>
  </div>
</template>

<script>
import {
  getDefaultValue,
  // listOfSpecialKeys,
  setValueToStorage,
  updateDocumentData,
} from './utilities';

// const KEY_DOWN_EVENT = 'keydown';
// const KEY_UP_EVENT = 'keyup';

// const keysPressed = (() => {
//   let currentShortcutKeysPressed = [];
//   const addEventToRegister = ({ keyCode, type }) => {
//     const hasProperty = Object.prototype.hasOwnProperty.call(
//       listOfSpecialKeys,
//       keyCode,
//     );
//     if (hasProperty) {
//       if (type === KEY_DOWN_EVENT) {
//         currentShortcutKeysPressed = [...currentShortcutKeysPressed, keyCode];
//       } else {
//         currentShortcutKeysPressed = currentShortcutKeysPressed.filter(
//           (item) => item === keyCode,
//         );
//       }
//     }
//   };
//   const shortcutKeyIsBeingPressed = () => currentShortcutKeysPressed.length > 0;
//   const isShift = ({ keyCode }) => keyCode === 16;
//   return {
//     addEventToRegister,
//     currentShortcutKeysPressed,
//     isShift,
//     shortcutKeyIsBeingPressed,
//   };
// })();

export default {
  name: 'Editor',
  data: () => {
    const documentData = getDefaultValue();
    return {
      documentData,
      caret: {
        // use offset to determine caret position
        offset: 0,
      },
    };
  },
  // define methods under the `methods` object
  methods: {
    handleKeyUp() {},
    handleKeyDown(event) {
      // cancel if the control, shift, alt, or meta key is held
      if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
        return;
      }
      // handle key input
      // keysPressed.addEventToRegister(event);
      // if (
      //   event.type === KEY_UP_EVENT ||
      //   keysPressed.shortcutKeyIsBeingPressed()
      // ) {
      //   return;
      // }
      // if (event.type === KEY_DOWN_EVENT && keysPressed.isShift(event)) {
      //   return;
      // }
      this.documentData = updateDocumentData(this.documentData, event);
      setValueToStorage(this.documentData);

      // handle key actions
      // switch (event.keyCode) {
      //   // Backspace
      //   case 8:
      //     this.documentData =
      //       this.documentData.slice(
      //         0,
      //         Math.max(0, this.caret.offset - 1),
      //       ) + this.documentData.slice(this.caret.offset);
      //     // move caret to the index before the deleted character
      //     this.caret.offset = Math.max(0, this.caret.offset - 1);
      //     break;
      //   // Left
      //   case 37:
      //     break;
      //   // Up
      //   case 38:
      //     break;
      //   // Right
      //   case 39:
      //     break;
      //   // Down
      //   case 40:
      //     break;
      //   // Text input
      //   default:
      //     this.documentData =
      //       this.documentData.slice(0, this.caret.offset) +
      //       getKeyValueToRender(event.keyCode, event.key) +
      //       this.documentData.slice(this.caret.offset);
      //     // move caret to the index after the appended character.
      //     this.caret.offset += 1;
      //     break;
      // }
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
