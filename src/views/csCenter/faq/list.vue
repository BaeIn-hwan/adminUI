<template>
	<div class="faq-list">
		<location-component :location-info="locationInfo" />

		<div class="layout__row">
			<section class="layout__section">
				<div class="layout__header">
					<h3 class="layout__title">필터</h3>	
				</div>

				<div class="layout__content">
					<table class="cols-table">
						<caption>필터</caption>

						<colgroup>
							<col style="width: 20%;">
							<col style="width: 80%;">
						</colgroup>

						<tbody class="cols-table__tbody">
							<tr class="cols-table__tr">
								<th class="cols-table__th">
									<span>분류</span>
								</th>
								<td class="cols-table__td">
									<select class="common__form__select filter__select--division">
										<option value="">선택</option>
										<template v-for="(option, index) in filters.divSelect">
											<option :key="index" :value="option.category_id">{{option.name}}</option>
										</template>
									</select>
								</td>
							</tr>

							<tr class="cols-table__tr">
								<th class="cols-table__th">
									<span>조건 검색</span>
								</th>
								<td class="cols-table__td">
									<select class="common__form__select filter__select--type">
										<option value="">--선택--</option>
										<option value="">A</option>
										<option value="">B</option>
										<option value="">C</option>
									</select>

									<input type="text" class="common__form__input filter__select--search">
								</td>
							</tr>
						</tbody>
					</table>

					<div class="filter__box align-center">
						<button type="button" class="btn btn-m btn-black">취소</button>
						<button type="button" class="btn btn-m btn-white">검색</button>
					</div>
				</div>
			</section>
		</div>

		<div class="layout__row">
			<section class="layout__section">
				<div class="layout__header">
					<h3 class="layout__title">FAQ</h3>

					<router-link to="/faq/write" class="btn btn-s btn-white">등록</router-link>
				</div>

				<div class="layout__content">
					<div class="layout__box">
						<span class="count">
							총 <em class="count__total">{{grid.body.length}}</em>개
						</span>

						<select v-model="paginations.listLength" class="sort-select">
							<template v-for="(option, index) in filters.sortMax">
								<option :key="index" :value="option.max">{{option.max}}</option>
							</template>
						</select>
					</div>

					<table-list-component :loading="loading.faq" :grid="grid" />

					<pagination-component :pagination="paginations" :loading="loading.paging" v-if="grid.body && grid.body.length" @move-page="pagingEvent($event);" />
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
	name: 'FaqList',
	mixins: [Mixin],
	data() {
		return {
			locationInfo: {
				title: 'FAQ 리스트',
				depth: [{
					depthDeep: '01',
					depthName: '고객센터',
				}, {
					depthDeep: '02',
					depthName: 'FAQ 리스트',
				}]
			},
			loading: {
				faq: false,
				paging: false,
			},
			grid: {
				header: [{
					key: 'category_name',
					label: '분류',
					width: '10%',
					align: 'center',
				}, {
					key: 'question',
					label: '질문',
					width: '35%',
					align: 'left',
				}, {
					key: 'answer',
					label: '답변',
					width: '35%',
					align: 'left',
				}, {
					key: 'regdate',
					label: '등록일',
					width: '20%',
					align: 'center',
				}],
				body: [],
			},
			filters: {
				divSelect: [{
					category_id: 0,
					name: '전체'
				}, {
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
				}],
				sortMax: [{
					max: 10
				}, {
					max: 15
				}, {
					max: 20
				}, {
					max: 25
				}, {
					max: 30
				}]
			},
			request: {
				faq: {
					_sort: 'id',      // 정렬대상
					_order: 'DESC',		// 정렬방식(오름차순, 내림차순)
					_page: 1,					// 시작 번호
					_limit: 10,				// 최대 갯수
				}
			},
			paginations: {
				id: 'faqList',
				current: 1,
				rowCount: 10,
				listLength: 10,
				total: 1,
			},
		}
	},
	created() {
		this.requestFaqList();
	},
	methods: {
		async requestFaqList() {
			try {
				const response = await this.$store.dispatch('requestMethods', {
					method: 'GET',
					url: `/faq?${this.parserParameter(this.request.faq)}`,
					// data: this.request.faq
				});

				console.log('response', response);

				this.loading.faq = true;
				this.loading.paging = true;

				if (response.data && response.data.length) {
					this.grid.body = response.data;
					this.paginations.total = response.data.length;
					// this.paginations.total = 101;
				}
				else {
					// @TODO: 검색 시, 없는거 처리
					// this.loading.faq = 'noSearch';
				}
			}
			catch(err) {
				console.error('requestFaqList error', err);
				this.loading.faq = 'error';
			}
		},
		pagingEvent(payload) {
			const { pageNumber } = payload;
			
			this.request.faq._page = pageNumber;
			this.paginations.current = pageNumber;
		}
	}
}
</script>

<style lang="scss" scoped>
.faq-list {
	.filter {
		&__select {
			&--division {
				width: 120px;
			}
	
			&--type {
				width: 120px;		
			}

			&--search {
				width: 200px;
				margin-left: 10px;
			}
		}
	}
}
</style>