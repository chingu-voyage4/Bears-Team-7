<template>
  <div class="sidebar">
    <div><i class="fas fa-file" /></div>
    <div><i class="fas fa-search" /></div>
    <div><i class="fas fa-cog" /></div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
div.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 60px;
  background-color: $sidebar-background;
  div {
    color: $sidebar-icon;
    font-size: 2rem;
    text-align: center;
    padding: 20px 0px 20px 4px;
    :hover {
      color: $sidebar-iconActive;
      cursor: pointer;
    }
    .fa-cog {
      position: absolute;
      bottom: 30px;
      left: 17px;
    }
  }
}
</style>
