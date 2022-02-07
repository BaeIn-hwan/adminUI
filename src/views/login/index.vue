<template>
	<div class="login">
		<header class="login-header">
			<h1 class="login-header__title">Admin Login</h1>
		</header>
		
		<form class="login-form" @submit.prevent="signIn($event)">
			<fieldset>
				<legend>로그인 폼</legend>

				<div class="login-form__row login-form__row--input">
					<input ref="loginId" v-model="signInfo.id" type="text" class="login-form__input login-form__input--id" placeholder="User ID">
				</div>

				<div class="login-form__row login-form__row--input">
					<input ref="loginPw" v-model="signInfo.pw" :type="pwPreview.type" class="login-form__input login-form__input--pw" placeholder="User Password">
					<label class="login-form__label login-form__label--pw-preview">
						<input v-model="pwPreview.flag" type="checkbox" class="blind" @change="loginPwPreview($event)">
						<i>
							<span class="blind">비밀번호 표시 On/Off</span>
						</i>
					</label>
				</div>

				<div class="login-form__row login-form__row--checkbox">
					<label class="login-form__label login-form__label--checkbox">
						<input v-model="signInfo.saveId" type="checkbox" class="blind">
						<span>Save ID</span>
					</label>
				</div>

				<div class="login-form__row login-form__row--button">
					<button type="submit" class="login-form__button login-form__button--submit">Sign In</button>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script>
export default {
	name: 'LoginPage',
	data() {
		return {
			signInfo: {
				id: '',
				pw: '',
				saveId: false,
			},
			pwPreview: {
				type: 'password',
				flag: true,
			},
		}
	},
	created() {
	},
	mounted() {
		this.isSaveId();
	},
	methods: {
		isSaveId() {
			const saveID = window.localStorage.getItem('saveID');

			if (saveID) {
				this.signInfo.id = saveID;
				this.signInfo.saveId = true;
			}
		},
		loginPwPreview() {
			const pwInputType = this.pwPreview.type;

			if (pwInputType === 'password') {
				this.pwPreview.type = 'text';
				this.pwPreview.flag = false;
			}
			else {
				this.pwPreview.type = 'password';
				this.pwPreview.flag = true;
			}
		},
		signIn() {
			if (this.signInfo.id === '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '아이디를 입력해주세요.',
				});
				
				return false;
			}
			else if (this.signInfo.pw === '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '패스워드를 입력해주세요.',
				});

				return false;
			}

			if (this.signInfo.saveId) {
				window.localStorage.setItem('saveID', this.signInfo.id);
			}
			else {
				window.localStorage.setItem('saveID', '');
			}

			this.$store.dispatch('login', this.signInfo);
		},
	}
}
</script>

<style lang="scss" scoped>
.login {
	width: 450px;
	padding: 50px 60px;
	border-radius: 10px;
	background: #2e3034;
	box-shadow: 0px 4px 15px 5px rgb(0 0 0 / 40%);

	&-header {
		&__title {
			font: {
				size: 36px;
				weight: 600;
			};
			color: $lightGreen;
			text-align: center;
		}
	}

	&-form {
		margin-top: 55px;

		&__row {
			&--input {
				position: relative;
				margin-top: 25px;

				&:first-of-type {
					margin-top: 0;
				}
			}

			&--checkbox {
				margin-top: 25px;
			}

			&--button {
				margin-top: 30px;
			}
		}

		&__input {
			width: 100%;
			height: 40px;
			padding: 0 15px;
			border-radius: 20px;
			border: 0;
			font-size: 16px;
			box-shadow: 2px 4px 8px 0px rgb(0 0 0 / 40%);

			&::placeholder {
				color: #999;
			}

			&--pw {
				padding-right: 45px;	
			}
		}

		&__label {
			&--pw-preview {
				display: block;
				position: absolute;
				top: 50%;
				right: 14px;
				transform: translate3d(0, -50%, 0);

				input {
					& + i {
						display: block;
						width: 20px;
						height: 20px;
						background: url('~@/assets/images/login/ico_login_pwEye.png') no-repeat 0 0 / 100% auto;
						cursor: pointer;
					}

					&:checked + i {
						background-image: url('~@/assets/images/login/ico_login_pwEye-on.png');
					}
				}
			}

			&--checkbox {
				display: inline-block;
				vertical-align: top;

				input {
					& + span {
						display: block;
						position: relative;
						padding-left: 32px;
						font-size: 14px;
						color: #FFF;
						line-height: 20px;
						cursor: pointer;
						user-select: none;

						&:before {
							content: '';
							display: block;
							position: absolute;
							top: 0;
							left: 0;
							width: 20px;
							height: 20px;
							background: #FFF;
    					line-height: 20px;
							text-align: center;
						}
					}

					&:checked + span {
						&:before {
							content: '\2714';
							background: $lightGreen;
						}
					}
				}
			}
		}

		&__button {
			&--submit {
				width: 100%;
				height: 48px;
				border: 2px solid $lightGreen;
				border-radius: 24px;
				background: $lightGreen;
				font: {
					size: 20px;
					weight: 500;
				};
				color: #FFF;
				box-shadow: 2px 4px 8px 0px rgb(0 0 0 / 70%);
			}
		}
	}
}
</style>