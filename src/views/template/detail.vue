<template>
	<div class="temp-detail">
		<location-component :location-info="locationInfo" />

		<section class="layout__wrapper">
			<h3 class="blind">템플릿 상세</h3>

			<div class="layout__header">
				<span class="list-count">
					총 <em class="list-count__total">N</em>개
				</span>

				<select class="list-sort">
					<option value="">20</option>
					<option value="">40</option>
					<option value="">60</option>
					<option value="">80</option>
					<option value="">100</option>
				</select>
			</div>

			<div class="layout__content">
				
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'TemplateDetail',
	data() {
		return {
			locationInfo: {
				title: '상세 가이드',
				depth: [{
					depthDeep: '01',
					depthName: '템플릿',
				}, {
					depthDeep: '02',
					depthName: '상세',
				}]
			},
		}
	}
}
</script>

<style>

</style>