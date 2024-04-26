<template>
  <article>
    <router-view></router-view>
  </article>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

article {
  flex: 1;
}

section {
  min-height: 100vh;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
