import xss from 'xss';

const mixin = {
	data() {
		return {

		}
	},
	methods: {
		/**
		 * @params Object : Request From 데이터 or QueryString
		 */
		parserParameter(obj) {
			let params = '';

			for (let [key, value] of Object.entries(obj)) {
				if (value) {
					params += `${key}=${value}&`
				}
			}

			return params.replace(/&$/, '');
		},
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

		getQueryString() {
			return new URLSearchParams(window.location.search);
		},

		xssFilter(text) {
			return xss.filterXSS(text, { stripIgnoreTag : true })
		}
	}
};

export default mixin;