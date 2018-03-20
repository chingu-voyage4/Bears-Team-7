<template>
  <div class="editor" @keydown.prevent="handleKeyboardPress" tabindex="0" data-test="editor">
    {{ documentData }}
  </div>
</template>

<script>
const getKeyValueToRender = (keyCode, keyValue) => {
  // Enter
  if (keyCode === 13) {
    return '\n';
  }
  return keyValue;
};

export default {
  name: 'Editor',
  data: () => ({
    documentData: '',
  }),
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
  background-color: burlywood;
  width: 500px;
  height: 500px;
  white-space: pre;
}
.editor:focus {
  border: 1 solid black;
}
</style>
