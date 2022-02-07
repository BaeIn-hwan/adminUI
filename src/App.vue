b<template>
  <div id="wrapper">
    <header-component />
     <main class="container">
      <router-view/>
    </main>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '@/views/include/HeaderComponent.vue'
import FooterComponent from '@/views/include/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  created() {
    this.$store.dispatch('fetchUser');
    console.log(this.$store.state.user)
  }
}
</script>

<style lang="scss">
.container {
  background: #f2f2f2;
  padding: 12px;
}
</style>