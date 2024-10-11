export const forecasts = {
  plotOptions: {
    series: {
      pointStart: Date.UTC(2023, 0, 1),
      pointIntervalUnit: 'month',
      connectNulls: true,
    },
  },
  series: [
    // {
    //   name: 'Concensus Economics, Min–Max',
    //   data: [
    //     [2.7,5],
    //     [2.7,5],
    //     [2.5,4.5],
    //     [2.5,4.5],
    //     [2.5,4.5],
    //     [3,4],
    //     [3,4],
    //     [3,4],
    //     [2.5,3.7],
    //     [2.5,3.4],
    //     [2.1,3.4],
    //     [2,3.2],
    //   ],
    //   type: 'areasplinerange',
    //   marker: {
    //     enabled: false
    //   },
    //   color: 'var(--text-color)',
    //   fillOpacity: 0.1,
    //   lineWidth: 0,
    // },
    {
      name: 'Concensus Economics, P10–P90',
      data: [
        [3.2,4],
        [3.32,4],
        [3.3,4],
        [3.13,4],
        [3.03,4],
        [3.3,4],
        [3.2,3.97],
        [3.2,3.99],
        [2.6,3.57],
        [2.6,3.1],
        [2.6,3.1],
        [2.13,2.89],
      ],
      type: 'areasplinerange',
      marker: {
        enabled: false
      },
      color: 'var(--color-text)',
      fillOpacity: 0.1,
      lineWidth: 0,
    },
    {
      name: 'Concensus Economics, P25–P75',
      data: [
        [3.4,3.9],
        [3.5,4],
        [3.325,3.8],
        [3.3,3.8],
        [3.3,3.8],
        [3.3,3.8],
        [3.3,3.7],
        [3.3,3.7],
        [2.725,3.2],
        [2.7,3],
        [2.7,3],
        [2.3,2.575],
      ],
      type: 'areasplinerange',
      marker: {
        enabled: false
      },
      color: 'var(--color-text)',
      fillOpacity: 0.2,
      lineWidth: 0,
    },
    {  
      name: "สำนักงานเศรษฐกิจการคลัง",
      data: [3.8,null,null,3.6,null,null,3.5,null,null,2.7,null,null,1.8],
    },
    {  
    name: "สภาพัฒน์ฯ",
      data: [null,3.2,null,null,3.2,null,null,2.75,null,null,2.5,null,null],
    },
    {  
      name: "แบงก์ชาติ",
      data: [null,null,3.6,null,null,3.6,null,null,2.8,null,2.4,null,null],
    },
  ],
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'GDP growth forecasts (%)',
    }
  }
}