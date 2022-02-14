<template>
	<section class="location">
		<div class="location-inner">
			<div class="location__header">
				<h2 class="location__header--title">{{locationInfo.title}}</h2>
			</div>

			<ul class="brc">
				<li class="brc__list brc__list--home">
					<img src="@/assets/images/common/ico_brc_home.png" alt="">
					<span class="blind">홈</span>
				</li>

				<li v-for="(depth, index) in locationInfo.depth" :key="index" class="brc__list" :class="`brc__list--depth${depth.depthDeep}`">
					<span class="brc__list--title">{{depth.depthName}}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		locationInfo: {
			type: Object,
			require: true,
		}
	},
}
</script>


<style lang="scss" scoped>
.location {
	padding: 20px 15px;
	border: 1px solid #cecece;
	background: #fff;

	&-inner {
		display: flex;
		align-items: flex-end;
	}

	&__header {
		&--title {
			font: {
				size: 22px;
				weight: 600;
			};
		}
	}

	.brc {
		display: flex;
		align-items: center;
		margin-left: 14px;

		&__list {
			position: relative;
			margin-left: 10px;
			padding-left: 12px;
			font-size: 0;
			background: url('~@/assets/images/common/ico_brc_arrow.png') no-repeat 0 50%;

			&:first-child {
				margin-left: 0;
				padding-left: 0;
				background: none;
			}

			&--title {
				display: block;
				font-size: 13px;
				line-height: 17px;
			}
		}
	}
}
</style>
