const data = [348417, 347419, 342905, 341402, 332787, 326017, 325173, 338693, 337162, 345762, 342373, 383666, 386600, 370952, 356143, 353938, 336654, 329110, 324011, 329324, 330170, 330495, 328074, 358952, 343913, 361218, 351189, 352118, 341858, 336779, 344922, 344267, 353491, 366747, 374656, 568342, 438305, 421561, 407819, 402923, 388790, 385974, 389723, 387591, 396177, 401760, 408067, 454356, 440670, 434445, 439050, 441461, 428649, 424853, 422141, 426219, 435202, 444253, 446968, 490240, 472466, 492299, 487301, 485542, 477632, 473405, 475411, 477652, 482108, 491050, 497732, 559167, 552623, 539184, 540676, 539325, 528364, 523624, 527981, 536081, 534948, 547999, 559948, 636506, 607623, 601655, 600326, 608602, 592552, 589605, 602738, 599265, 608512, 638353, 655998, 714647, 687861, 690012, 677092, 681318, 665225, 670118, 667257, 655329, 666591, 674958, 678883, 753253, 737641, 720106, 723740, 721003, 692585, 691656, 686070, 684233, 692167, 691870, 706240, 773842, 726046, 748121, 739235, 741136, 724004, 712413, 718075, 714325, 732897, 736321, 768731, 842624, 813231, 814091, 809947, 810590, 797512, 798802, 791160, 798141, 798664, 818917, 816787, 923967, 871805, 874010, 861674, 884184, 863717, 850187, 851305, 858241, 858403, 881325, 905744, 1005884, 952644, 989633, 959835, 988499, 986226, 959686, 956046, 931947, 953034, 975098, 997476, 1114518, 1100045, 1102049, 1078922, 1104142, 1077226, 1096978, 1077381, 1070905, 1097308, 1174574, 1122459, 1248569, 1199239, 1176878, 1186863, 1200298, 1181269, 1174883, 1163566, 1181501, 1187388, 1192484, 1227276, 1350932, 1260118, 1271379, 1267943, 1261521, 1248795, 1239108, 1204422, 1228433, 1223582, 1237466, 1272879, 1425282, 1406816, 1415401, 1390413, 1367698, 1368424, 1336879, 1297353, 1294188, 1273571, 1309215, 1336883, 1503679, 1382306, 1415400, 1376723, 1422974, 1380338, 1353297, 1380641, 1357632, 1353766, 1395785, 1417244, 1539848, 1469128, 1475205, 1466563, 1484128, 1437469, 1452695, 1443153, 1412139, 1443269, 1469344, 1479714, 1627997, 1561448, 1567144, 1583329, 1581273, 1528340, 1530224, 1529505, 1530511, 1574179, 1574849, 1592800, 1734078, 1640390, 1693545, 1674741, 1668529, 1636305, 1626706, 1656103, 1631121, 1620538, 1611665, 1667873, 1784153, 1737923, 1731352, 1753619, 1741534, 1724737, 1702254, 1692047, 1710451, 1714170, 1725609, 1760823, 1859539, 1837294, 1832884, 1916228, 1980762, 1977420, 1958503, 1990040, 1957500, 1943489, 1962072]

export const circulation = {
	chart: {
		zoomType: 'x',
	},
	series: [
		{
			// type: 'spline',
			data: data,
			name: 'ปริมาณธนบัตรที่หมุนเวียนในระบบเศรษฐกิจ',
			tooltip: {
				pointFormat: '{point.y} ล้านบาท',
				xDateFormat: '%Y.%m',
			},
			lineWidth: 2,
		},
	],
	plotOptions: {
		series: {
			pointStart: Date.UTC(1997, 0, 1),
			pointIntervalUnit: 'month',
			pointInterval: 1,
		}
	},
	xAxis: {
		type: 'datetime',
	},
	yAxis: {
		title: {
			text: 'ล้านบาท',
		},
	},
	title: {
		text: 'ปริมาณธนบัตรที่หมุนเวียนในระบบเศรษฐกิจ'
	},
	legend: {
		enabled: false,
	},
}