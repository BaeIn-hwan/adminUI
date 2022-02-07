<template>
	<footer id="footer" class="footer">
		<div class="footer-inner">
			<p class="footer__copyright">Copyright © 2022 Bae Inhwan All Rights Reserved.</p>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'FooterPage',
}
</script>

<style lang="scss" scoped>
.footer {
	height: 40px;
	background: #dfdfdf;

	&-inner {
		text-align: right;
		padding: 0 15px;
	}

	&__copyright {
		font-size: 12px;
		color: #222;
		line-height: 40px;
		text-align: right;
	}
}
</style>