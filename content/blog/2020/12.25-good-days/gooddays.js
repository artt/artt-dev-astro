import j from './df_date.json'

const data = j.data

export const regCount = {
	chart: {
		zoomType: 'x',
	},
	boost: {
		useGPUTranslations: true,
		seriesThreshold: 1,
	},
	series: [
		{
			type: 'column',
			borderColor: `rgba(0, 0, 0, 0)`,
			data: data,
			boostThreshold: 30,
			name: 'จำนวนนิติบุคคลจดทะเบียน',
			tooltip: {
				pointFormat: '{point.y} ราย',
			},
		},
	],
	xAxis: {
		type: 'datetime',
	},
	yAxis: {
		title: {
			text: 'จำนวน (ราย)',
		},
	},
	title: {
		text: 'จำนวนนิติบุคคลจดทะเบียนในแต่ละวัน'
	},
	legend: {
		enabled: false,
	},
}

const score = data.map((x => x[2]))
const date_counts = [0, 0.25, 0.5, 0.75, 1].map(x => score.filter(s => s === x).length)
const date_labels = ['วันกาลกิณี', 'วันโชคร้าย', 'วันโชคดีปานกลาง', 'วันโชคดี', 'วันมหาโชค']

// export const dateCount = {
// 	data: [{
// 		values: date_counts,
// 		labels: date_labels,
// 		type: 'pie',
// 		hole: 0.3,
// 		direction: 'clockwise',
// 		sort: false,
// 		pull: [0, 0, 0, 0, 0.2],
// 	}],
// 	layout: {
// 		title: {
// 			text: 'จำนวนวันประเภทต่าง ๆ',
// 		},
// 		hoverlabel: {
// 			bordercolor: 'white',
// 		},
// 		legend: {
// 			x: 0.9,
// 			y: 1,
// 			// xanchor: 'right',
// 		}
// 	},
// 	config: {
// 		// responsive: true,
// 	},
// }

export const dateCount = {
	chart: {
		type: 'pie',
	},
	series: [
		{
			name: 'จำนวนวัน',
			data: date_counts.map((x, i) => ({
				name: date_labels[i],
				y: x,
				sliced: date_labels[i] === 'วันมหาโชค',
			})),
			size: '80%',
			innerSize: '60%',
			dataLabels: {
				style: {
					textOutline: 'none',
					color: 'var(--color-neutral-80)',
				},
			},
		},
	],
	plotOptions: {
		pie: {
			borderColor: 'var(--color-background)',
		},
	},
}
