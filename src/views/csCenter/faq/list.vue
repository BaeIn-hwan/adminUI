<template>
	<div class="faq-list">
		<location-component :location-info="locationInfo" />

		<section class="layout-wrapper">
			<div class="layout-header">
				<h3 class="layout-header__title">필터</h3>
			</div>

			<div class="layout-content">
				<table class="filter-table">
					<caption>필터</caption>

					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>

					<tbody class="filter-table__tbody">
						<tr class="filter-table__tr">
							<th class="filter-table__th">
								<span>분류</span>
							</th>
							<td class="filter-table__td">
								<select class="filter-table__select">
									<option value="">선택</option>
									<template v-for="(option, index) in filters.divSelect">
										<option :key="index" :value="option.category_id">{{option.name}}</option>
									</template>
								</select>
							</td>
						</tr>

						<tr class="filter-table__tr">
							<th class="filter-table__th">
								<span>조건 검색</span>
							</th>
							<td class="filter-table__td">
								<select class="filter-table__select">
									<option value="">--선택--</option>
									<option value="">A</option>
									<option value="">B</option>
									<option value="">C</option>
								</select>

								<input type="text" class="filter-table__input">
							</td>
						</tr>
					</tbody>
				</table>

				<div class="filter-btn align-center">
					<button type="button" class="btn btn-m btn-white">검색</button>
					<button type="button" class="btn btn-m btn-black">취소</button>
				</div>
			</div>
		</section>

		<section class="layout-wrapper">
			<div class="layout-header">
				<h3 class="layout-header__title">FAQ</h3>
				<div class="layout-header__btn">
					<router-link to="/faq/write" class="btn btn-s btn-white">등록</router-link>
				</div>
			</div>

			<div class="layout-content">
				<div class="layout-content__top">
					<span class="count">
						총 <em class="count__total">{{grid.body.length}}</em>개
					</span>

					<select class="sort-select">
						<option value="">20</option>
						<option value="">40</option>
						<option value="">60</option>
						<option value="">80</option>
						<option value="">100</option>
					</select>
				</div>

				<table-list-component :loading="loading.faq" :grid="grid" />

				<pagination-component :pagination="paginations" :loading="loading.paginationLoading" v-if="grid.body && grid.body.length" @move-page="pagingEvent($event);" />
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'FaqList',
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
				}]
			},
			request: {
				faq: {
					
				}
			},
			paginations: {
				id: 'faqList',
				current: 1,
				rowCount: 10,
				listLength: 10,
				total: 0,
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
					url: `/faq?_sort=id&_order=DESC`,
				});

				this.loading.faq = true;

				if (response.data && response.data.length) {
					this.grid.body = response.data;
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
		}
	}
}
</script>

<style>

</style>