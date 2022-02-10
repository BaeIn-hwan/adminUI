import xss from 'xss';

const mixin = {
	data() {
		return {

		}
	},
	methods: {
		getNowDate() {
			const now = new Date();
			const nowYear = now.getFullYear();
			const nowMonth = now.getMonth() + 1;
			const nowDate = now.getDate();
			const nowHour = now.getHours();
			const nowMinute = now.getMinutes();
			const nowSecond = now.getSeconds();

			return `${nowYear}.${nowMonth}.${nowDate} ${nowHour}:${nowMinute}:${nowSecond}`;
		},
		xssFilter(text) {
			return xss.filterXSS(text, { stripIgnoreTag : true })
		}
	}
}
export default mixin;