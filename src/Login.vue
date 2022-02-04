<template>
  <div>
    <div id="wrapper" class="wrapper">
      <router-view/>
    </div>

    <alert-component v-if="$store.state.alert.isOpen" :alert-width="$store.state.alert.width" :alert-height="$store.state.alert.height" :alert-message="$store.state.alert.message"></alert-component>
  </div>
</template>

<script>
import AlertComponent from '@/components/AlertComponent.vue'
// import

export default {
  name: 'LoginLayout',
  components: {
    AlertComponent,
  },
  mounted() {
    console.log(123)
    this.$store.dispatch('fetchUser');
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #666;
}
</style>
