<template>
	<div>
		<template v-if="loading === false">
			<table class="n-table">
				<caption>템플릿 테이블</caption>

				<colgroup>
					<template>
						<col>
					</template>
				</colgroup>

				<thead class="n-table__thead">
					<tr class="n-table__tr">
						<th class="n-table__th">
							<span></span>
						</th>
					</tr>
				</thead>

				<tbody class="n-table__tbody">
					<tr class="n-table__tr">
						<td class="n-table__td">
							<span></span>
						</td>
					</tr>
				</tbody>
			</table>
		</template>

		<template v-else-if="loading === true">
			<table class="n-table">
				<caption>템플릿 테이블</caption>

				<colgroup>
					<template v-for="(column, index) in grid.header">
						<col :key="index" :style="`width: ${column.width}`">
					</template>
				</colgroup>

				<thead class="n-table__thead">
					<tr class="n-table__tr">
						<th v-for="(column, index) in grid.header" :key="index" class="n-table__th">
							<span>{{column.label}}</span>
						</th>
					</tr>
				</thead>

				<template v-if="grid.body && grid.body.length">
					<tbody class="n-table__tbody">
						<tr class="n-table__tr" v-for="(rows) in grid.body" :key="rows.id">
							<td v-for="(key, index) in tableColumns" :key="index" class="n-table__td" :class="`align-${grid.header[index].align}`">
								<template v-if="key !== 'controller'">
									<span>{{rows[key]}}</span>
								</template>

								<template v-else>
									<button type="button" class="btn btn-s btn-black">수정</button>
								</template>
							</td>
						</tr>
					</tbody>
				</template>

				<template v-else>
					<tbody class="n-table__tbody">
						<tr class="n-table__tr">
							<td class="n-table__td--none align-center" :colspan="grid.header.length">리스트가 없습니다.</td>
						</tr>
					</tbody>
				</template>
			</table>
		</template>

		<template v-else-if="loading === 'error'">
			<div>
				에러입니다.
			</div>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		loading: {
			type: Boolean || String,
			default: false,
			require: true,
		},
		grid: {
			type: Object,
			require: true,
			default: () => {
				return {
					header: [],
					body: [],
				}
			},
		},
	},
	data() {
		return {
			gridSet: [],
			sortKey: '',
		}
	},
	computed: {
		tableColumns() {
			return this.grid.header.map(rows => {
				return rows.key;
			});
		} 
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
.n-table {
	width: 100%;

	&__tbody {
		.n-table__tr {
			&:hover {
				.n-table__td {
					background: #f2f2f2;
					font-weight: 500;
				}
			}
		}
	}

	&__tr {
		
	}

	&__th {
		padding: 12px 8px;
		border: {
			top: 2px solid #111;
			right: 1px solid #ccc;
			bottom: 1px solid #111;
			left: 1px solid #ccc;
		};
		background: #eee;
		
		span {
			display: block;
			min-height: 14px;
			font: {
				size: 14px;
				weight: 500;
			};
			color: #000;
		}
	}

	&__td {
		padding: 8px;
		border: 1px solid #ccc;

		span {
			display: block;
			min-height: 12px;
			font-size: 12px;
      color: #333;
      line-height: 16px;
      word-break: keep-all;
      word-wrap: break-word;
		}

		&--none {
			padding: 8px;
			border: 1px solid #ccc;
			font-size: 12px;

			&:hover {
				background: inherit;
			}
		}
	}
}
</style>