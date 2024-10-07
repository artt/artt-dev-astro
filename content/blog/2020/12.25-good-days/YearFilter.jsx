import React from "react"
import { LazyHighcharts } from "@/components/Plotter"
import { quantile } from "d3"

import j from './df_date.json'

const data = j.data
const reg_date = data.map((x => x[4]))
const count = data.map((x => x[1]))
const score = data.map((x => x[2]))
const year = data.map((x => x[3]))

const catname = ['วันกาลกิณี', 'วันโชคร้าย', 'วันโชคดีปานกลาง', 'วันโชคดี', 'วันมหาโชค']

const computeBoxPlotStatistics = (data) => {
  const sortedData = [...data].sort((a, b) => a - b)
  const q1 = quantile(sortedData, 0.25)
  const median = quantile(sortedData, 0.5)
  const q3 = quantile(sortedData, 0.75)
  const iqr = q3 - q1
  const low = Math.max(q1 - 1.5 * iqr, sortedData[0])
  const high = Math.min(q3 + 1.5 * iqr, sortedData[sortedData.length - 1])
  return { low, q1, median, q3, high }
}

const boxPlotDataAll = [0, 0.25, 0.5, 0.75, 1].map((s, j) => ({
	name: catname[j],
	y: count.filter((_, i) => score[i] === s),
	text: reg_date.filter((_, i) => score[i] === s),
}))

const boxPlotDataEx2020 = [0, 0.25, 0.5, 0.75, 1].map((s, j) => ({
	name: catname[j],
	y: count.filter((_, i) => (score[i] === s) && (year[i] < 2020)),
	text: reg_date.filter((_, i) => (score[i] === s) && (year[i] < 2020)),
}))

export default function YearFilter() {

	const [showAll, setShowAll] = React.useState(true)

	let options = {
		chart: {
			type: 'boxplot',
		},
		series: [
			{
				name: "Summary",
				data: (showAll ? boxPlotDataAll : boxPlotDataEx2020).map((x) => ({
					name: x.name,
					...computeBoxPlotStatistics(x.y),
				})),
				colorByPoint: true,
				fillColor: "var(--color-neutral-20)",
			},
			{
				name: "Observation",
				type: "scatter",
				data: (showAll ? boxPlotDataAll : boxPlotDataEx2020).map((dayType, i) => dayType.y.map((p, j) => ({
					name: dayType.text[j],
					x: i - 0.15,
					y: p,
					color: "var(--color-neutral-80)",
				}))).flat(),
				jitter: {
					x: 0.1,
				},
				marker: {
					radius: 1.5,
				},
				colorByPoint: true,
			},
		],
		xAxis: {
			categories: catname,
			title: {
					text: 'ประเภทของวัน'
			},
		},
		yAxis: {
			max: 500,
			title: {
				text: "จำนวน (ราย)"
			}
		},
		plotOptions: {
			boxplot: {
				pointWidth: 30,
				pointStart: 0.15,
				relativeXValue: true,
			},
		},
		tooltip: {
			formatter: function(tooltip) {
				let tmp = tooltip.defaultFormatter.call(this, tooltip);
				if (tmp[1][0] === "x") {
					// scatter tooltip
					tmp[0] = tmp[0].replace(" Observation", this.key)
					tmp[1] = `จำนวน <b>${this.y}</b> ราย`
				}
				else {
					// boxplot tooltip
					const s = tmp[1].split("<br/>")
					tmp[0] = tmp[0].replace(/>.*?</, ">" + s[0].replace("Summary", this.key) + "<")
					tmp[1] = s.slice(1).join('<br/>')
				}
				return tmp
			}
		},
		legend: {
			enabled: false,
		},
	}

	function handle2020(e) {
		setShowAll(e.target.checked)
	}

	return(
		<figure>
			<LazyHighcharts options={options} />
			<div style={{textAlign: `center`, fontSize: `0.8rem`}}>
				<label>
					<input type="checkbox" onChange={handle2020} defaultChecked={showAll} style={{marginRight: '0.5em'}} />
					รวมข้อมูลปี 2563
				</label>
			</div>
		</figure>
	)

}