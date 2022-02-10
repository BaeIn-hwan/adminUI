<template>
	<div id="wrapper">
    <header-component />
     <main class="container">
      <router-view/>
    </main>
    <footer-component />     
  </div>
</template>

<script>
import HeaderComponent from 'views/include/HeaderComponent.vue'
import FooterComponent from 'views/include/FooterComponent.vue'

export default {
	components: {
    HeaderComponent,
    FooterComponent,
  },
}
</script>

<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 12px;
}
</style>