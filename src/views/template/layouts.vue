<template>
  <div class="index">
    <location-component :location-info="locationInfo" />

    <div class="layout__row layout__row--02">
			<section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성01</h3>	
				</div>

        <div class="layout__content">2열</div>
      </section>

      <section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성01</h3>	
				</div>

        <div class="layout__content">2열</div>
      </section>
    </div>

    <div class="layout__row layout__row--03">
			<section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성02</h3>	
				</div>

        <div class="layout__content">3열</div>
      </section>

      <section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성02</h3>	
				</div>

        <div class="layout__content">3열</div>
      </section>

      <section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성02</h3>	
				</div>

        <div class="layout__content">3열</div>
      </section>
    </div>

    <div class="layout__row layout__row--04">
			<section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성03</h3>	
				</div>

        <div class="layout__content">4열</div>
      </section>

      <section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성03</h3>	
				</div>

        <div class="layout__content">4열</div>
      </section>

      <section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성03</h3>	
				</div>

        <div class="layout__content">4열</div>
      </section>

      <section class="layout__section">
        <div class="layout__header">
					<h3 class="layout__title">구성03</h3>	
				</div>

        <div class="layout__content">4열</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      locationInfo: {
        title: '템플릿 레이아웃',
				depth: [{
					depthDeep: '01',
					depthName: '레이아웃',
				}, {
					depthDeep: '02',
					depthName: '템플릿 레이아웃',
				}]
      },
    }
  }
}
</script>

<style lang="scss" scoped>

</style>