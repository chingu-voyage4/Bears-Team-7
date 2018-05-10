<template>
  <div class="main">
    <sidebar />
    <welcome />
  </div>
</template>

<script>
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';

export default {
  name: 'Home',
  components: {
    editor: Editor,
    sidebar: Sidebar,
    welcome: WelcomeScreen,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
