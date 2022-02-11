<template>
	<div class="faq-write">
		<section class="layout__wrapper">
			<div class="layout__header">
				<h3 class="layout__title">FAQ 등록</h3>
			</div>

			<div class="layout__content">
				<form @submit.prevent="save()">
					<fieldset>
						<legend>FAQ 등록</legend>

						<table class="cols-table">
							<caption>FAQ 등록</caption>
							
							<colgroup>
								<col style="width: 20%;">
								<col style="width: 80%;">
							</colgroup>

							<tbody class="cols-table__tbody">
								<tr class="cols-table__tr">
									<th class="cols-table__th">
										<span class="cols-table__th--require">분류</span>
									</th>
									<td class="cols-table__td">
										<select v-model="faq.category_id" class="common__form__select common__form__select--division" @change="changeCategoryName()">
											<option value="">선택</option>
											<template v-for="(option, index) in filters.divSelect">
												<option :key="index" :value="option.category_id">{{option.name}}</option>
											</template>
										</select>
									</td>
								</tr>

								<tr class="cols-table__tr">
									<th class="cols-table__th">
										<span class="cols-table__th--require">질문</span>
									</th>
									<td class="cols-table__td">
										<input v-model.trim="faq.question" type="text" class="common__form__input" maxlength="100" @input="textWrite($event, 'question')">
									</td>
								</tr>

								<tr class="cols-table__tr">
									<th class="cols-table__th">
										<span class="cols-table__th--require">답변</span>
									</th>
									<td class="cols-table__td">
										<textarea v-model.trim="faq.answer" cols="30" rows="10" class="common__form__textarea" maxlength="100" @input="textWrite($event, 'answer')"></textarea>
									</td>
								</tr>
							</tbody>
						</table>

						<div class="layout__controller align-center">
							<button type="button" class="btn btn-m btn-black" @click="back()">취소</button>
							<button type="submit" class="btn btn-m btn-white" :disabled="saving">저장</button>
						</div>
					</fieldset>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
	name: 'FaqWrite',
	mixins: [Mixin],
	data() {
		return {
			faq: {
				category_id: '',
				category_name: '',
				question: '',
				answer: '',
				regdate: ''
			},
			filters: {
				divSelect: [{
					category_id: 1,
					name: '분류01'
				}, {
					category_id: 2,
					name: '분류02'
				}, {
					category_id: 3,
					name: '분류03'
				}, {
					category_id: 4,
					name: '분류04'
				}]
			},
			requests: {
				faq: {
					id: null,
				}
			},
			saving: false,
		}
	},
	created() {
		const _id = this.getQueryString().get('id');

		if (_id) {
			this.requests.faq.id = _id;
			this.requestFaqDetail();
		}
	},
	methods: {
		async requestFaqDetail() {
			try {
				const response = await this.$store.dispatch('requestMethods', {
					method: 'GET',
					url: `/faq?${this.parserParameter(this.requests.faq)}`,
				});

				console.log('response', response);
				if (response && response.data) {
					this.faq = response.data[0];
				}
			}
			catch(err) {
				console.error('requestFaqDetail error', err);
			}
		},
		textWrite(e, target) {
			this.faq[target] = e.target.value;
		},
		validationCheck() {
			const faq = this.faq;

			if (faq.category_id === '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '분류를 선택해주세요.',
				});
				
				return false;
			}
			else if (faq.question === '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '제목을 입력해주세요.',
				});
				
				return false;
			}
			else if (faq.answer === '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '내용을 입력해주세요.',
				});
				
				return false;
			}

			return true;
		},
		async save() {
			const faq = this.faq;

			try {
				if (this.validationCheck()) {
					this.saving = true;

					const response = await this.$store.dispatch('requestMethods', {
						method: 'POST',
						url: `/faq`,
						data: {
							category_id: faq.category_id,
							category_name: faq.category_name,
							question: this.xssFilter(faq.question),
							answer: this.xssFilter(faq.answer).replace(/(\n|\r\n)/g, '<br>'),
							regdate: this.getNowDate(),
						}
					});

					if (response && response.status == 201) {
						this.$router.push('/faq/list')
					}
				}
			}
			catch(err) {
				console.log('save error', err);
			}
		},
		back() {
			window.history.back();
		},
		changeCategoryName() {
			const faq = this.faq;

			switch (faq.category_id) {
				case 1:
					faq.category_name = '분류01';
					break;
				case 2:
					faq.category_name = '분류02';
					break;
				case 3:
					faq.category_name = '분류03';
					break;
				case 4:
					faq.category_name = '분류04';
					break;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.faq-write {
	.common__form {
		&__select {
			&--division {
				width: 160px;
			}
		}
	}
}
</style>