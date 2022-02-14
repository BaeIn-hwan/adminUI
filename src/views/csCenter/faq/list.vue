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
									<select v-model="faq.category_id" class="common__form__select filter__select--division">
										<option value="">선택</option>
										<template v-for="(option, index) in filters.faq.divSelect">
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
									<input v-model="faq.q" type="text" class="common__form__input filter__select--search">
								</td>
							</tr>
						</tbody>
					</table>

					<div class="layout__controller align-center">
						<button type="button" class="btn btn-m btn-black" @click="filterReset()">초기화</button>
						<button type="button" class="btn btn-m btn-white" @click="filterSearch()">검색</button>
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
					<template v-if="loading.faq === true">
						<div class="layout__box">
							<span class="count">
								총 <em class="count__total">{{paginations.faq.total}}</em>개
							</span>

							<select v-model="paginations.faq.listLength" class="sort-select">
								<template v-for="(option, index) in filters.faq.sortMax">
									<option :key="index" :value="option.max">{{option.max}}</option>
								</template>
							</select>
						</div>
					</template>

					<table-list-component :loading="loading.faq" :grid="grid" />

					<pagination-component :pagination="paginations.faq" :loading="loading.paging" v-if="grid.body && grid.body.length" @move-page="pagingEvent($event)" />
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'
import History from '@/mixin/history.js'

export default {
	name: 'FaqList',
	mixins: [Mixin, History],
	data() {
		return {
			locationInfo: {
				title: 'FAQ',
				depth: [{
					depthDeep: '01',
					depthName: '고객센터',
				}, {
					depthDeep: '02',
					depthName: 'FAQ',
				}]
			},
			loading: {
				faq: false,
				paging: false,
			},
			grid: {
				url: '/faq/write?id=',
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
				faq: {
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
			},
			faq: {
				_sort: 'id',
				_order: 'DESC',
				category_id: '',
				q: '',
			},
			requests: {
				faq: {
					_sort: 'id',
					_order: 'DESC',
				}
			},
			faqList: [],
			paginations: {
				faq: {
					id: 'faq',
					current: 1,
					rowCount: 10,
					listLength: 10,
					total: 1,
				}
			},
		}
	},
	watch: {
		// 'requests.faq.category_id': {
		// 	handler(newValue) {
		// 		this.requests.faq.category_id = newValue;
		// 	}
		// },
		'paginations.faq.listLength': {
			handler(newValue) {
				this.paginations.faq = {
					id: 'faq',
					current: 1,
					rowCount: 10,
					listLength: newValue,
					total: 1,
				};
				this.faqList = [];
				this.requestFaqList();
			}
		}
	},
	created() {
		this.requestFaqList();
	},
	methods: {
		async requestFaqList(params) {
			try {
				const response = await this.$store.dispatch('requestMethods', {
					method: 'GET',
					url: params ? `/faq?${this.parserParameter(params)}` : `/faq?${this.parserParameter(this.requests.faq)}`,
				});

				this.faqList = [];
				this.loading.faq = true;
				this.loading.paging = true;

				if (response.data && response.data.length) {
					if (this.requests.faq.category_id === 0) {
						this.requests.faq.category_id = 0;
					}
					this.paginations.faq.total = response.data.length;
					this.dataParsing('faq', response.data);
					this.grid.body = this.faqList[0];
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
			const { id, pageNumber } = payload;
			
			this.paginations[id].current = pageNumber;
			this.grid.body = this.faqList[pageNumber - 1];
		},
		dataParsing(_target, data) {
			const { total, listLength } = this.paginations[_target];
			const pageCount = Math.ceil(total / listLength);
			let sPage = 0,
					ePage = listLength;
			
			for (let i = 0; i < pageCount; i++) {
				const list = data.slice(sPage, ePage);

				this.faqList.push(list);

				sPage += listLength;
				ePage += listLength;
			}
		},
		filterSearch() {
			const data = Object.assign(this.requests.faq, this.faq);

			this.requestFaqList(data);
		},
		filterReset() {
			this.faq = {
				_sort: 'id',
				_order: 'DESC',
				category_id: '',
				q: '',
			};
			
			const data = Object.assign(this.requests.faq, this.faq);
			
			this.requestFaqList(data);
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

			&--search {
				width: 200px;
			}
		}
	}
}
</style>