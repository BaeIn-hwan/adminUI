<template>
  <div>
    <router-view class="wrapper" />
    
    <alert-component v-if="$store.state.alert.isOpen" :alert-width="$store.state.alert.width" :alert-height="$store.state.alert.height" :alert-message="$store.state.alert.message"></alert-component>
  </div>
</template>

<script>
import AlertComponent from 'components/AlertComponent.vue'

export default {
  components: {
    AlertComponent
  },
}
</script>

<style>
  
</style>

<style lang="scss">
* {

}
</style>