<template>
	<div id="wrapper" class="wrapper">
    <header-component />
     <main class="container">
      <router-view/>
    </main>
    <footer-component />

    <alert-component v-if="$store.state.alert.isOpen" :alert-width="$store.state.alert.width" :alert-height="$store.state.alert.height" :alert-message="$store.state.alert.message"></alert-component>
  </div>
</template>

<script>
import HeaderComponent from 'views/include/HeaderComponent.vue'
import FooterComponent from 'views/include/FooterComponent.vue'
import AlertComponent from 'components/AlertComponent.vue'

export default {
	components: {
    HeaderComponent,
    FooterComponent,
    AlertComponent
  },
}
</script>

<style>

</style>