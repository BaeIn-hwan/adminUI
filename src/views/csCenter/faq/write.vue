<template>
	<div class="temp-write">
		<section class="layout-wrapper">
			<div class="layout-header">
				<h3 class="layout-header__title">FAQ 등록</h3>
			</div>

			<div class="layout-content">
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
										<select v-model="faq.category_id" class="cols-table__select">
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
										<input v-model.trim="faq.question" type="text" class="cols-table__input" maxlength="100" @input="textWrite($event, 'question')">
									</td>
								</tr>

								<tr class="cols-table__tr">
									<th class="cols-table__th">
										<span class="cols-table__th--require">답변</span>
									</th>
									<td class="cols-table__td">
										<textarea v-model.trim="faq.answer" cols="30" rows="10" class="cols-table__textarea" maxlength="100" @input="textWrite($event, 'answer')"></textarea>
									</td>
								</tr>
							</tbody>
						</table>

						<div class="layout-content__btn align-center">
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
			saving: false,
		}
	},
	methods: {
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
							category_name: this.changeCategoryName(faq.category_id),
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
		changeCategoryName(id) {
			let categoryName;

			switch(id) {
				case '1':
					categoryName = '분류01';
					break;
				case '2':
					categoryName = '분류02';
					break;
				case '3':
					categoryName = '분류03';
					break;
				case '4':
					categoryName = '분류04';
					break;
			}

			console.log('categoryName', categoryName)

			return categoryName;
		}
	}
}
</script>

<style lang="scss">

</style>