<template>
  <router-view id="app" :key="$route.path"/>
</template>

<script>
export default { name: 'app' }
</script>

<style lang="scss">
@import './sass/app';
</style>
