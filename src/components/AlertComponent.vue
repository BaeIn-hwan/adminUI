<template>
	<div class="layer-popup">
		<div class="layer-popup__wrapper alert-layer__wrapper" :style="`width: ${$store.state.alert.width == 0 ? '' : $store.state.alert.width +'px'}; height: ${$store.state.alert.height == 0 ? '' : $store.state.alert.height +'px'};`">
			<p class="alert-layer__content">{{$store.state.alert.message}}</p>

			<div class="alert-layer__btn align-center">
				<button ref="alertClose" type="button" class="btn btn-m btn-white" @click="alertClose()" v-focus>확인</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AlertComponent',
	methods: {
		alertClose() {
			const url = this.$store.state.alert.returnURL;

			if (url !== '') {
				this.$router.push(url);
			}

			this.$store.dispatch('alertClose', {
				isOpen: false,
				width: 0,
				height: 0,
				message: '',
				returnURL: '',
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.alert-layer {
	&__wrapper {
		min-width: 250px;
		max-width: 450px;
		padding: 25px 20px 20px;
	}

	&__content {
		display: flex;
		justify-content: center;
		align-content: center;
		margin-bottom: 25px;
		font-size: 14px;
		line-height: 18px;
		text-align: center;
		word-break: break-all;
		word-wrap: break-word;
	}
}
</style>
