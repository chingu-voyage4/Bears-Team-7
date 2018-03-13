<template>
  <div class="editor" v-on:keyup="handleKeyboardPress" tabindex="0">
    {{ documentData }}
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data: () => ({
    documentData: '',
  }),
  // define methods under the `methods` object
  methods: {
    handleKeyboardPress(event) {
      this.documentData = this.documentData + event.key;
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
}
.editor:focus {
  border: 1 solid black;
}
</style>
