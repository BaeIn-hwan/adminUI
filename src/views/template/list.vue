<template>
	<div class="temp-list">
		<location-component :location-info="locationInfo" />

		<section class="layout-wrapper">
			<div class="layout-header">
				<h3 class="layout-header__title">템플릿 리스트</h3>
				<button type="button" class="btn btn-s btn-white">등록</button>
			</div>

			<div class="layout-content">
				<div class="layout-filter">
					<!-- <span class="list-count">
						총 <em class="list-count__total">N</em>개
					</span> -->

					<select class="list-sort">
						<option value="">20</option>
						<option value="">40</option>
						<option value="">60</option>
						<option value="">80</option>
						<option value="">100</option>
					</select>
				</div>

				<table-listComponent :loading="loading.sampleList" :columns="head" :body="list" />
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
			},
			head: [{
				label: '제목',
				width: '50%',
			}, {
				label: '작성자',
				width: '10%'
			}, {
				label: '조회수',
				width: '20%'
			}, {
				label: '등록일',
				width: '10%'
			}, {
				label: '관리',
				width: '10%'
			}],
			list: []
		}
	},
	created() {
		this.getSampleData();
	},
	methods: {
		getSampleData() {
			const response = [{
				id: 1,
				type: '공지',
				user_id: 'test',
				title: '제목제목제목제목제목제목',
				content: '',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 1
			}, {
				id: 2,
				type: '공지',
				user_id: 'test',
				title: '제목제목제목제목제목제목',
				content: '',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 2
			}, {
				id: 3,
				type: '공지',
				user_id: 'test',
				title: '제목제목제목제목제목제목',
				content: '',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 5
			}, {
				id: 4,
				type: '공지',
				user_id: 'test',
				title: '제목제목제목제목제목제목',
				content: '',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 10
			}, {
				id: 5,
				type: '공지',
				user_id: 'test',
				title: '제목제목제목제목제목제목',
				content: '',
				regdate: '2020-00-00',
				writer: '작성자',
				counter: 0
			}];

			this.list = response.map(list => {
				// console.log(list)
				this.head.filter(data => {
					console.log(data.label == list)
					if (data.label == list) {
						console.log(list)
						return list;
					}
					return list;
				})
			});
			console.log(this.list)
			this.loading.sampleList = true;
		}
	}
}
</script>
