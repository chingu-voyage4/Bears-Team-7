<template>
  <div
    class="editor"
    data-test="editor"
    @keydown="handleKeyboardPress"
    @keyup="handleKeyboardPress"
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
  listOfSpecialKeys,
  setValueToStorage,
  updateDocumentData,
} from './utilities';

const KEY_DOWN_EVENT = 'keydown';
const KEY_UP_EVENT = 'keyup';

const keysPressed = (() => {
  let currentShortcutKeysPressed = [];
  const addEventToRegister = ({ keyCode, type }) => {
    const hasProperty = Object.prototype.hasOwnProperty.call(
      listOfSpecialKeys,
      keyCode,
    );
    if (hasProperty) {
      if (type === KEY_DOWN_EVENT) {
        currentShortcutKeysPressed = [...currentShortcutKeysPressed, keyCode];
      } else {
        currentShortcutKeysPressed = currentShortcutKeysPressed.filter(
          (item) => item === keyCode,
        );
      }
    }
  };
  const shortcutKeyIsBeingPressed = () => currentShortcutKeysPressed.length > 0;
  const isShift = ({ keyCode }) => keyCode === 16;
  return {
    addEventToRegister,
    currentShortcutKeysPressed,
    isShift,
    shortcutKeyIsBeingPressed,
  };
})();

export default {
  name: 'Editor',
  data: () => {
    const documentData = getDefaultValue();
    return {
      documentData,
    };
  },
  // define methods under the `methods` object
  methods: {
    handleKeyboardPress(event) {
      // handle key input
      keysPressed.addEventToRegister(event);
      if (
        event.type === KEY_UP_EVENT ||
        keysPressed.shortcutKeyIsBeingPressed()
      ) {
        return;
      }
      if (event.type === KEY_DOWN_EVENT && keysPressed.isShift(event)) {
        return;
      }
      this.documentData = updateDocumentData(this.documentData, event);
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
