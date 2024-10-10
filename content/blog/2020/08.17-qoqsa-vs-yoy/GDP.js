import deepmerge from "deepmerge"
import { combineMerge } from '@/lib/utils'

const gdp = [1067301, 1039924, 1086494, 1147308, 1179517, 1146232, 1135828, 1226603, 1265610, 1256367, 1231962, 1314936, 1313862, 1336374, 1323012, 1382117, 1318993, 1309139, 1282881, 1296888, 1244216, 1145060, 1155997, 1265055, 1259716, 1206997, 1246015, 1317543, 1346757, 1279194, 1276273, 1352158, 1378078, 1326723, 1322686, 1407869, 1441030, 1411214, 1414291, 1503042, 1550742, 1500109, 1511005, 1622511, 1651929, 1594896, 1596306, 1730192, 1715539, 1663994, 1672102, 1796955, 1810063, 1738304, 1746759, 1893689, 1928792, 1829463, 1842192, 1979091, 1992940, 1893939, 1883585, 1939874, 1907673, 1836030, 1874133, 2039253, 2139668, 2000920, 1982245, 2109563, 2209743, 2037494, 2029932, 2024390, 2272805, 2160308, 2132192, 2337519, 2395328, 2219187, 2185277, 2342295, 2386443, 2237767, 2208911, 2398963, 2459670, 2303091, 2285056, 2473591, 2541701, 2390578, 2357643, 2557996, 2635219, 2491927, 2460885, 2660328, 2768006, 2605754, 2539479, 2760505, 2848112, 2669232, 2606186, 2801548, 2791918, 2344660].map(x => x*1e-6)
const gdpsa = [1043940, 1051493, 1117265, 1128004, 1155167, 1159212, 1167189, 1204635, 1241364, 1271334, 1266064, 1287811, 1290178, 1355585, 1358694, 1350295, 1295068, 1332432, 1316869, 1264817, 1219543, 1169841, 1185583, 1234176, 1231096, 1235950, 1278567, 1286444, 1312743, 1310305, 1311035, 1322086, 1340916, 1357226, 1361128, 1377551, 1401122, 1441696, 1457612, 1470469, 1507410, 1531805, 1559613, 1585088, 1605528, 1630311, 1648705, 1687376, 1667251, 1703635, 1727030, 1750093, 1759029, 1782039, 1803808, 1843868, 1872883, 1876656, 1902482, 1930168, 1929934, 1943261, 1947130, 1896809, 1840470, 1882567, 1942163, 1998349, 2056195, 2050006, 2061029, 2069572, 2116333, 2086224, 2118242, 1985262, 2171537, 2212769, 2230635, 2288939, 2287281, 2273785, 2289937, 2288736, 2280316, 2294047, 2315336, 2341269, 2351798, 2361205, 2395762, 2413123, 2430024, 2451210, 2472603, 2495646, 2518106, 2554648, 2583451, 2594936, 2643133, 2671991, 2667738, 2692116, 2717859, 2738077, 2738802, 2731851, 2663466, 2405677].map(x => x*1e-6)

function growth(data, lag) {
	let ret = data.slice()
	for (let i = 0; i < lag; i ++) {
		ret[i] = null
	}
	for (let i = lag; i < data.length; i ++) {
		ret[i] = (data[i] / data[i - lag]) - 1
	}
	return(ret)
}

function movingAverage(data, size) {
	let ret = Array(data.length).fill(null)
	for (let i = size - 1; i < data.length; i ++) {
		let sum = 0
		for (let j = i - (size - 1); j <= i; j ++) {
			sum += data[j]
		}
		ret[i] = sum / size
	}
	return(ret)
}

const commonLevelGrowth = {
	series: [
		{
			tooltip: {
				valueDecimals: 2,
				valueSuffix: ' ล้านล้านบาท'
			},
			yAxis: 0,
			type: 'spline',
			lineWidth: 2,
		},
		{
			tooltip: {
				valueDecimals: 2,
			},
			yAxis: 1,
			type: 'column',
			borderWidth: 0,
			pointPadding: 0.05
		}
	],
	xAxis: {
		type: 'datetime',
		crosshair: true,
	},
	plotOptions: {
		series: {
			pointStart: Date.UTC(1993, 0, 1),
			pointIntervalUnit: 'month',
			pointInterval: 3,
		}
	},
	yAxis: [
		{ // Primary yAxis
			top: '0%',
			height: '45%',
			offset: 0,
			title: {
				text: 'GDP (ล้านล้านบาท)',
			},
		},
		{ // Secondary yAxis
			top: '55%',
			height: '45%',
			offset: 0,
			title: {
				text: 'GDP growth',
			},
		}
	],
	tooltip: {
		shared: true,
		xDateFormat: '%YQ%q',
	},
	legend: {
		enabled: false,
	},
}

const overrideQoQ = {
	series: [
		{
			data: gdp,
			name: 'GDP',
		},
		{
			data: growth(gdp, 1).map(x => x*100),
			name: 'GDP Growth',
			tooltip: {
				valueSuffix: '% QoQ'
			},
		}
	],
	title: {
		text: 'GDP',
	},
	yAxis: [
		{ // Primary yAxis
			title: {
				text: 'GDP (ล้านล้านบาท)',
			},
		},
		{ // Secondary yAxis
			title: {
				text: 'GDP growth',
			},
		}
	],
}

const overrideQoQSA = {
	series: [
		{
			data: gdpsa,
			name: 'GDPSA',
		},
		{
			data: growth(gdpsa, 1).map(x => x*100),
			name: 'GDPSA Growth',
			tooltip: {
				valueSuffix: '% QoQSA'
			},
		},
	],
	title: {
		text: 'GDPSA',
	},
	yAxis: [
		{ // Primary yAxis
			title: {
				text: 'GDPSA (ล้านล้านบาท)',
			},
		},
		{ // Secondary yAxis
			title: {
				text: 'GDPSA growth',
			},
		}
	],
}

const overrideYoY = {
	series: [
		{
			data: gdp,
			name: 'GDP',
		},
		{
			data: growth(gdp, 4).map(x => x*100),
			name: 'GDP Growth',
			tooltip: {
				valueSuffix: '% YoY'
			},
		}
	],
	title: {
		text: 'GDP',
	},
	yAxis: [
		{ // Primary yAxis
			title: {
				text: 'GDP (ล้านล้านบาท)',
			},
		},
		{ // Secondary yAxis
			title: {
				text: 'GDP growth',
			},
		}
	],
}

export const compare = {
	series: [
		{
			data: growth(gdp, 4).map(x => x*100),
			name: 'YoY Growth',
			tooltip: {
				valueDecimals: 2,
				valueSuffix: '% YoY'
			},
			lineWidth: 2,
		},
		{
			data: growth(gdpsa, 1).map(x => Math.pow(1 + x, 4) - 1).map(x => x*100),
			name: 'QoQSAAR Growth',
			tooltip: {
				valueDecimals: 2,
				valueSuffix: '% QoQSAAR'
			},
			lineWidth: 2,
		},
		{
			data: movingAverage(growth(gdpsa, 1).map(x => Math.pow(1 + x, 4) - 1).map(x => x*100), 4),
			name: 'QOQSAAR Growth, moving average',
			tooltip: {
				valueDecimals: 2,
				valueSuffix: '%'
			},
			lineWidth: 2,
		},
	],
	title: {
		text: 'ความแตกต่างระหว่าง % QoQSAAR กับ % YoY',
	},
	xAxis: {
		type: 'datetime',
		crosshair: true,
	},
	plotOptions: {
		series: {
			pointStart: Date.UTC(1993, 0, 1),
			pointIntervalUnit: 'month',
			pointInterval: 3,
		}
	},
	yAxis: [
		{ // Primary yAxis
			offset: 0,
			labels: {
			},
			title: {
				text: 'GDP growth',
			},
		},
	],
	tooltip: {
		shared: true,
		xDateFormat: '%YQ%q',
	},
}

export const qoq = deepmerge(commonLevelGrowth, overrideQoQ, {arrayMerge: combineMerge})
export const qoqSA = deepmerge(commonLevelGrowth, overrideQoQSA, {arrayMerge: combineMerge})
export const yoy = deepmerge(commonLevelGrowth, overrideYoY, {arrayMerge: combineMerge})

