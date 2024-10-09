function foo(x) {
	return 87.915 / (6.4 + (87.915 / (x / 3.6))) * 3.6
}

// create an array from 0 to 200, step 0.05
const x = Array.from({length: 200 / 0.05 + 1}, (_, i) => i * 0.05)

export const speedPlot = {
	chart: {
		type: 'line',
	},
	series: [{
		name: 'ความเร็วรถยนต์',
		data: x.map(x => [x, foo(x)]),
		lineWidth: 2,
	}],
	legend: {
		enabled: false,
	},
	title: {
		text: 'ความเร็วรถทั้งสองคันที่ทำให้จุดชนห่างไปประมาณ 100 เมตร',
	},
	xAxis: {
		title: {
			text: "ความเร็วรถยนต์ (กม./ชม.)",
		},
	},
	yAxis: {
		title: {
			text: "ความเร็วรถมอเตอร์ไซค์ (กม./ชม.)",
		},
	},
	annotations: [
		{
			labels: [{
				point: {x: 76.175, y: foo(76.175), xAxis: 0, yAxis: 0},
				text: 'ความเร็วที่อาจารย์<br />สายประสิทธิ์คำนวณได้',
				borderColor: 'var(--color-neutral-80)',
				backgroundColor: 'var(--color-neutral-80)',
				style: {
					color: 'var(--color-background)',
				},
			}],
		},
		{
			labels: [{
				point: {x: 177, y: foo(177), xAxis: 0, yAxis: 0},
				text: 'ความเร็วรถที่ 177 กม./ชม.',
				borderColor: 'var(--color-neutral-80)',
				backgroundColor: 'var(--color-neutral-80)',
				style: {
					color: 'var(--color-background)',
				},
			}],
		},
	],
	tooltip: {
		formatter: function() {
			return `ความเร็วรถยนต์ ${this.x.toFixed(0)} กม./ชม.<br />ความเร็วรถจักรยานยนต์ ${this.y.toFixed(1)} กม./ชม.`
		}
	}
}
