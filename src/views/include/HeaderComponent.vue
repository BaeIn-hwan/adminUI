<template>
	<header id="header" class="header">
		<div class="header-inner" :style="`border-bottom: 2px solid ${pointColor}`">
			<h1 class="header__logo">
				<router-link class="header__logo--link" to="/">로고</router-link>
			</h1>

			<div class="util">
				<ul class="util-box">
					<li class="util-box__list">
						<button type="button" class="util-box__button util-box__button--setting" @click="settingOpen();">
							<span class="blind">설정</span>
						</button>

						<div ref="setting" class="setting">
							<div class="setting-inner">
								<span class="setting-name">
									<template v-if="$store.state.user && $store.state.user.email">
										<strong>{{$store.state.user.email}}</strong>님
									</template>
								</span>
								
								<ul class="setting-color">
									<li v-for="(chip, index) in $store.state.colorChip" :key="index" class="setting-color__list">
										<label class="setting-color__label">
											<input v-model="pointColor" type="radio" name="settingColor" class="blind" :value="chip.colorCode" @change="colorChnage(chip.colorCode);">
											<i :style="`background: ${chip.colorCode};`"><span class="blind">{{chip.colorName}}</span></i>
										</label>
									</li>
								</ul>
							</div>

							<div class="setting-close">
								<button type="button" class="setting-close__button" @click="settingClose()">Close</button>
							</div>
						</div>
					</li>

					<li class="util-box__list">
						<button type="button" class="util-box__button util-box__button--search">
							<span class="blind">검색</span>
						</button>
					</li>

					<li class="util-box__list">
						<button type="button" class="util-box__button util-box__button--logout" @click="signOut()">
							<span class="blind">로그아웃</span>
						</button>
					</li>
				</ul>
			</div>
		</div>

		<nav id="gnb" class="gnb">
			<h2 class="blind">GNB</h2>
			
			<ul class="gnb-box gnb-depth01__box">
				<li v-for="(depth1, depth1Index) in gnb" :key="depth1Index" class="gnb-box__list gnb-depth01__list" @mouseleave="menuClose()">
					<a href="#" class="gnb-depth01__title" @click.prevent @mouseenter="menuOpen(depth1Index)">{{depth1.title}}</a>

					<ul v-if="menuId === depth1Index" class="gnb-sub__box">
						<li class="gnb-sub__list">
							<template v-if="depth1.subTitle && depth1.subTitle !== ''">
								<span class="gnb-sub__title" :style="`background: ${pointColor}`">서브뎁스 타이틀</span>
							</template>

							<ul class="gnb-depth02__box">
								<li v-for="(depth2, depth2Index) in depth1.depth02" :key="depth2Index" class="gnb-depth02__list">
									<router-link class="gnb-depth02__title" :to="depth2.url">{{depth2.title}}</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li class="gnb-box__list gnb-depth01__list" @mouseleave="menuClose()">
					<a href="#" class="gnb-depth01__title" @click.prevent @mouseenter="menuOpen(1)">Layouts</a>

					<ul v-if="menuId == 1" class="gnb-sub__box">
						<li class="gnb-sub__list">
							<span class="gnb-sub__title" :style="`background: ${pointColor}`">템플릿 가이드</span>

							<ul class="gnb-depth02__box">
								<li class="gnb-depth02__list">
									<router-link class="gnb-depth02__title" to="/template/list">리스트 페이지</router-link>
								</li>

								<li class="gnb-depth02__list">
									<router-link class="gnb-depth02__title" to="/template/detail">상세 페이지</router-link>
								</li>

								<li class="gnb-depth02__list">
									<router-link class="gnb-depth02__title" to="/template/layouts">레이아웃 페이지</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'HeaderCompoennt',
	data() {
		return {
			gnb: [{
				title: '고객센터',
				depth02: [{
					title: '공지사항',
					url: '/notice/list'
				}, {
					title: 'FAQ',
					url: '/faq/list'
				}]
			}],
			menuId: null,
			pointColor: this.$store.state.pointColor,
		}
	},
	methods: {
		signOut() {
			this.$store.dispatch('logout');
		},
		settingOpen() {
			const settingBtn = this.$refs.setting;

			settingBtn.classList.add('open');
		},
		settingClose() {
			const settingBtn = this.$refs.setting;

			settingBtn.classList.remove('open');
		},
		menuOpen(idx) {
			this.menuId = idx;
		},
		menuClose() {
			this.menuId = null;
		},
		colorChnage(colorCode) {
			this.$store.dispatch('colorChange', colorCode);
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	&-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px;
	}

	&__logo {
		display: block;

		&--link {
			display: block;
		}
	}

	.util {
		&-box {
			display: flex;
			align-items: center;

			&__list {
				position: relative;
				z-index: 6;
				margin-left: 3px;

				&:first-child {
					margin-left: 0;
				}
			}

			&__button {
				width: 30px;
				height: 30px;
				border-radius: 4px;

				&--setting {
					background: #343a43 url('~@/assets/images/header/ico_comm_setting.png') no-repeat 50% 50%;
				}

				&--search {
					background: #343a43 url('~@/assets/images/header/ico_comm_search.png') no-repeat 50% 50%;
				}

				&--logout {
					background: #343a43 url('~@/assets/images/header/ico_comm_logout.png') no-repeat 50% 50%;
				}
			}
		}	
	}

	.setting {
		display: none;
		position: absolute;
    top: 40px;
    left: 50%;
    width: 180px;
    margin-left: -90px;
    border: 1px solid #000;
    border-radius: 3px;
    background: #343a43;
    box-shadow: 0 3px #b2b2b2;

		&:before {
			content: "";
			display: block;
			position: absolute;
			width: 0;
			top: -7px;
			left: 50%;
			border: {
				right: 7px solid transparent;
				bottom: 7px solid #343a43;
				left: 7px solid transparent;
			};
			transform: translate3d(-50%, 0, 0);
		}

		&.open {
			display: block;
		}

		&-inner {
			padding: 10px 14px 12px;
		}

		&-name {
			display: block;
			margin-bottom: 15px;
			font-size: 14px;
			color: #fff;

			strong {
				font-weight: 500;
			}
		}

		&-color {
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;

			&__list {
				margin-left: 5px;

				&:first-child {
					margin-left: 0;
				}
			}

			&__label {
				input {
					& + i {
						display: block;
						width: 23px;
						height: 23px;
						cursor: pointer;
					}
					
					&:checked + i {
						border: 2px solid #fff;
					}
				}
			}
		}

		&-close {
			padding: 8px 10px 8px 0;
			border-top: 1px solid #000;
			font-size: 0;
			text-align: right;

			&__button {
				padding-left: 12px;
				background: url('~@/assets/images/header/ico_comm_setting-close.png') no-repeat 0 50%;
				font-size: 11px;
				color: #737a83;
				letter-spacing: 0.25px;
			}
		}
	}

	.gnb {
		position: relative;
		z-index: 5;
		background: #f8f8f8;
		border-bottom: 1px solid #aaa;

		&-box {
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
		}

		&-sub {
			&__box {
				position: absolute;
				top: 50px;
				left: 0;
				border: 1px solid #aaa;
				background: #FFF;
				min-width: 150px;
			}

			&__title {
				display: block;
				padding: 12px 10px;
				font: {
					size: 14px;
					weight: 500;
				};
				color: #FFF;
				line-height: 20px;
			}
		}

		&-depth {
			&01 {
				&__list {
					position: relative;
				}
				
				&__title {
					display: block;
					height: 50px;
					padding: 0 25px;
					font: {
						size: 15px;
						weight: 500;
					};
					color: #000;
					line-height: 50px;
				}
			}

			&02 {
				&__box {
					padding: 15px 10px;
				}
				
				&__list {
					margin-top: 15px;
					font-size: 0;

					&:first-child {
						margin-top: 0;
					}
				}

				&__title {
					font-size: 13px;
					color: #000;

					&:hover {
						text-decoration: underline;	
					}
				}
			}
		}
	}
}
</style>