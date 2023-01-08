
export const ut = {
	//返回日期
	DateTime(arr?: any[], valObj?: any) {
		arr = arr || []
		const newdate = new Date()
		const narr = ["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds"];
		const vb = Object.assign({ YYYY: null, MM: null, DD: null, hh: newdate.getHours(), mm: newdate.getMinutes(), ss: newdate.getSeconds() }, valObj);
		const ND = valObj == undefined ? newdate : new Date(vb.YYYY, vb.MM, vb.DD, vb.hh, vb.mm, vb.ss);
		if ((arr || []).length > 0) {
			arr.forEach((i, par) => {
				ND["set" + narr[i]](narr[i] == "Month" ? parseInt(par) - 1 : parseInt(par));
			})
		};
		return {
			//返回此实例的Date值
			GetValue: () => ND,
			//获取此实例所表示日期的年份部分。
			GetYear: () => ND.getFullYear(),
			//获取此实例所表示日期的月份部分。
			GetMonth: () => ND.getMonth() + 1,
			//获取此实例所表示的日期为该月中的第几天。
			GetDate: () => ND.getDate(),
			//获取此实例所表示日期的小时部分。
			GetHours: () => ND.getHours(),
			//获取此实例所表示日期的分钟部分。
			GetMinutes: () => ND.getMinutes(),
			//获取此实例所表示日期的秒部分。
			GetSeconds: () => ND.getSeconds(),
		}
	},
	//补齐数位
	digit(num: number) {
		return num < 10 ? "0" + (num | 0) : num;
	},
	//判断是否为数字
	isNum(value: string) {
		return /^[+-]?\d*\.?\d*$/.test(value) ? true : false;
	},
	//获取本月的总天数
	getDaysNum(y: number, m: string | number) {
		var num = 31, isLeap = (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
		switch (parseInt(m)) {
			case 2: num = isLeap ? 29 : 28; break;
			case 4: case 6: case 9: case 11: num = 30; break;
		}
		return num;
	},
	//获取月与年
	getYM(y: number, m: number, n: number) {
		var nd = new Date(y, m - 1);
		nd.setMonth(m - 1 + n);
		return {
			y: nd.getFullYear(),
			m: nd.getMonth() + 1
		};
	},
	//获取上个月
	prevMonth(y: number, m: number, n?: number) {
		return this.getYM(y, m, 0 - (n || 1));
	},
	//获取下个月
	nextMonth(y: number, m: number, n?: number) {
		return this.getYM(y, m, n || 1);
	},
}
