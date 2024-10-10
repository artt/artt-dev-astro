const wkdays = [5, 4, 1, 0.4, 0, 0.2, 0.2, 0.2, 0.6, 1.4, 0.2, 3.6, 4.2, 5, 8, 34.4, 40.6, 92.2, 196.4, 241.6, 263.4, 296.4, 325.6, 209.4, 125.4, 158.6, 180.4, 265.6, 216, 194, 188.6, 87.6, 58, 37.4, 29.4, 29, 13.8, 15.4, 9.8, 9.4, 6.6, 11.2, 18.2, 19.8, 9.4, 16.2, 10.6, 12.4]
const wknds = [9.5, 18.5, 16.5, 6.5, 0.5, 8.5, 13, 1.5, 0, 1, 1.5, 0.5, 0.5, 3.5, 21, 7, 71.5, 49.5, 73.5, 84, 68.5, 75, 72, 137.5, 126, 162, 95, 113, 95.5, 69, 44, 67, 114, 66, 54.5, 57.5, 42.5, 32, 14.5, 13.5, 26, 10.5, 25.5, 38.5, 15, 16, 5, 5.5]

export const time = {
	chart: {
		type: 'column',
	},
	series: [
		{
			data: wkdays,
			name: `วันธรรมดา`
		},
		{
			data: wknds,
			name: `วันเสาร์อาทิตย์`
		},
	],
	title: {
		text: 'วันและเวลาที่ทวิต'
	},
	plotOptions: {
		series: {
			pointStart: 0,
			marker: {
				// enabled: false,
			},
			line: {
				lineWidth: 0,
			},
			borderWidth: 0,
			pointWidth: 8,
		},
	},
	yAxis: {
		title: {
			text: `จำนวนครั้งเฉลี่ยที่ทวิตต่อวัน`
		},
		max: 350,
		tickInterval: 50,
	},
	xAxis: {
		gridLineWidth: 1,
		tickInterval: 6,
		max: 48,
		labels: {
			formatter: function() {
				if (this.value === 48)
					return ''
				return(this.value / 2) + ':00'
			}
		}
	},
}
