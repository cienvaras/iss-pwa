<template>
  <div id="app">
    <header class="site-header">
      <h1>Where’s the ISS?</h1>
    </header>
    <station></station>
  </div>
</template>

<script>
import Station from './components/Station'

export default {
  name: 'app',
  components: {
    Station
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway');
* {
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
}
body {
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 2rem;
  margin: 1em 0;
  @media (min-width: 620px) {
    font-size: 2.4rem
  }
}
.site-header {
  overflow: hidden;
  background-color: #554a5d;
  color: #fff;
  margin-bottom: 40px;
}
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
