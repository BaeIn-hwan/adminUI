<template>
	<div class="temp-list">
		<location-component :location-info="locationInfo" />

		<section class="layout-wrapper">
			<div class="layout-header">
				<h3 class="layout-header__title">필터</h3>
			</div>

			<div class="layout-content">
				<table class="filter-table">
					<caption>필터</caption>

					<colgroup>
						<col style="width: 15%;">
						<col style="width: 35%;">
						<col style="width: 15%;">
						<col style="width: 35%;">
					</colgroup>

					<tbody class="filter-table__tbody">
						<tr class="filter-table__tr">
							<th class="filter-table__th">
								<span>Input 타입</span>
							</th>
							<td class="filter-table__td">
								<input type="text" class="filter-table__input">
							</td>
							<th class="filter-table__th">
								<span>Select 타입</span>
							</th>
							<td class="filter-table__td">
								<select class="filter-table__select">
									<option value="">분류</option>
									<option value="">옵션01</option>
									<option value="">옵션02</option>
									<option value="">옵션03</option>
								</select>
							</td>
						</tr>

						<tr class="filter-table__tr">
							<th class="filter-table__th">
								<span>Radio 타입</span>
							</th>
							<td class="filter-table__td">
								<label class="filter-table__label filter-table__label--radio">
									<input type="radio" class="blind" name="tempRadio">
									<span>선택01</span>
								</label>

								<label class="filter-table__label filter-table__label--radio">
									<input type="radio" class="blind" name="tempRadio">
									<span>선택02</span>
								</label>
							</td>
							<th class="filter-table__th">
								<span>Checkbox 타입</span>
							</th>
							<td class="filter-table__td">
								<label class="filter-table__label filter-table__label--checkbox">
									<input type="checkbox" class="blind" name="tempCheckbox">
									<span>선택01</span>
								</label>

								<label class="filter-table__label filter-table__label--checkbox">
									<input type="checkbox" class="blind" name="tempCheckbox">
									<span>선택02</span>
								</label>
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
				<h3 class="layout-header__title">템플릿 리스트</h3>
				<div class="layout-header__btn">
					<router-link to="/template/write" class="btn btn-s btn-white">등록</router-link>
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

				<table-list-component :loading="loading.sampleList" :grid="grid" />

				<pagination-component :pagination="paginations" :loading="loading.paginationLoading" v-if="grid.body && grid.body.length" ref="pagination" @move-page="pagingEvent($event);" />
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'TemplateList',
	data() {
		return {
			locationInfo: {
				title: '리스트 가이드',
				depth: [{
					depthDeep: '01',
					depthName: '템플릿',
				}, {
					depthDeep: '02',
					depthName: '리스트',
				}]
			},
			loading: {
				sampleList: false,
				mediaListLoading: false,
			},
			grid: {
				header: [{
					key: 'title',
					label: '제목',
					width: '50%',
					align: 'left',
				}, {
					key: 'writer',
					label: '작성자',
					width: '10%',
					align: 'center',
				}, {
					key: 'counter',
					label: '조회수',
					width: '10%',
					align: 'center',
				}, {
					key: 'regdate',
					label: '등록일',
					width: '20%',
					align: 'center',
				}, {
					key: 'controller',
					label: '관리',
					width: '10%',
					align: 'center',
				}],
				body: [],
			},
			paginations: {
				id: "itemList",
				current: 1,
				rowCount: 10,
				listLength: 10,
				total: 201,
			},
		}
	},
	created() {
		this.getSampleData();
	},
	methods: {
		getSampleData() {
			const response = [{
				id: 1,
				title: '블라블라블라블라블라블라블라블라블라블라',
				content: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 1
			}, {
				id: 2,
				title: '제목제목제목제목제목제목',
				content: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 1
			}, {
				id: 3,
				title: '제목제목제목제목제목제목',
				content: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 1
			}, {
				id: 4,
				title: '제목제목제목제목제목제목',
				content: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 1
			}, {
				id: 5,
				title: '제목제목제목제목제목제목',
				content: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 1
			}];

			this.grid.body = response;
			this.loading.sampleList = true;
		},
		pagingEvent(payload) {
			const {id, pageNumber} = payload;
			
			this.paginations.current = pageNumber;
		}	
	}
}
</script>