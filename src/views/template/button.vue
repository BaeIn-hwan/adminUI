<template>
	<div class="temp-button">
		<location-component :location-info="locationInfo" />

		<section class="layout-wrapper">
			<h3 class="blind">템플릿 상세</h3>

			<div class="layout-header">
			
			</div>

			<div class="layout-content">
				<section class="temp-button__section">
					<h4>버튼 사이즈</h4>

					<div class="layout-btn">
						<button type="button" class="btn btn-s btn-black" style="background: yellow;">버튼 S</button>
						<button type="button" class="btn btn-m btn-black" style="background: green;">버튼 M</button>
						<button type="button" class="btn btn-l btn-black" style="background: blue;">버튼 L</button>
					</div>
				</section>

				<section class="temp-button__section">
					<h4>버튼 색상</h4>
					
					<div class="layout-btn">
						<button type="button" class="btn-xs" style="background: red;">확인</button>
						<button type="button" class="btn-s" style="background: yellow;">취소</button>
						<button type="button" class="btn-m" style="background: green;">등록</button>
						<button type="button" class="btn-l" style="background: blue;">수정</button>
						<button type="button" class="btn-xl" style="background: purple;">삭제</button>
					</div>
				</section>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'TemplateButton',
	data() {
		return {
			locationInfo: {
				title: '버튼 가이드',
				depth: [{
					depthDeep: '01',
					depthName: '템플릿',
				}, {
					depthDeep: '02',
					depthName: '버튼',
				}]
			},
		}
	}
}
</script>

<style>

</style>