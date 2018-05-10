<template>
  <div class="welcome-screen">
    <div class="welcome-text">
      <h1>Welcome to the Panda Code Editor</h1>
      <panda />
      <p>The Panda code editor is a project born from the Chingu Voyage 2.
Our MVP features were to provide VS code type clone,
 by implementing our own text editor from scratch.
It also has a full automated test fleet and auto deployment.
Check out the code at https://github.com/chingu-voyage4/Bears-Team-7</p>
      <div>Built with love by Alyssa and Matt ❤️</div>
    </div>
  </div>
</template>

<script>
import Panda from './Panda';

export default {
  name: 'WelcomeScreen',
  components: {
    panda: Panda,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.welcome-screen {
  background-color: $editor-background;
  color: $editor-fontColor;
  height: 100%;
  white-space: pre;
  font-size: 16px;
  text-align: center;
  padding-left: 60px;
  padding-top: 15px;
  overflow: scroll;
  :focus {
    outline: 0;
  }
  .welcome-text {
    max-width: 700px;
    margin: 0 auto;
  }
}
p {
  margin: 0;
}
</style>
