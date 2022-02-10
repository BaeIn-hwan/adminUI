<template>
	<div class="temp-write">
		<section class="layout__wrapper">
			<div class="layout__header">
				<h3 class="layout__title">템플릿 등록</h3>

				<div class="layout__header__btn">
					<button type="button" class="btn btn-s btn-white" @click="save();" :disabled="saving">저장</button>
					<button type="button" class="btn btn-s btn-black" @click="back()">취소</button>
				</div>
			</div>

			<div class="layout__content">
				<table class="cols-table">
					<caption>게시글 등록</caption>
					
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>

					<tbody class="cols-table__tbody">
						<tr class="cols-table__tr">
							<th class="cols-table__th">
								<span class="cols-table__th--require">제목</span>
							</th>
							<td class="cols-table__td">
								<input v-model="sampleWrite.title" type="text" class="common__form__input" maxlength="100" @input="textWrite($event, 'title')">
							</td>
						</tr>

						<tr class="cols-table__tr">
							<th class="cols-table__th">
								<span class="cols-table__th--require">내용</span>
							</th>
							<td class="cols-table__td">
								<textarea v-model="sampleWrite.content" cols="30" rows="10" class="common__form__textarea" maxlength="100" @input="textWrite($event, 'content')"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'TemplateWrite',
	data() {
		return {
			saving: false,
			sampleWrite: {
				title: '',
				content: ''
			}
		}
	},
	methods: {
		textWrite(e, target) {
			this.sampleWrite[target] = e.target.value;
		},
		save() {
			if (this.sampleWrite.title == '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '제목을 입력해주세요.',
				});
				
				return false;
			}
			else if (this.sampleWrite.content == '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '내용을 입력해주세요.',
				});
				
				return false;
			}

			this.saving = true;
		},
		back() {
			history.back();
		}
	}
}
</script>

<style>

</style>