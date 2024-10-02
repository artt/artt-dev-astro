import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsData from "highcharts/modules/data"
import highchartsMore from "highcharts/highcharts-more"
import highchartsAnnotations from "highcharts/modules/annotations"
import deepmerge from "deepmerge"
import React from 'react'

const commonStyles = {
  font: '--font-body',
  color: '--color-neutral-80',
  title: {
    font: '--font-heading',
    size: 21.6,
    color: '--color-neutral-80',
  },
  axis: {
    title: {
      font: '--font-body',
      color: '--color-neutral-60',
      size: 14.4,
    },
    labels: {
      font: '--font-body',
      color: '--color-neutral-80',
      size: 14.4,
    },
    tickColor: '--color-neutral-80',
    zeroLineColor: '--color-neutral-80',
    gridColor: '--color-neutral-10',
    minorGridColor: '--color-neutral-5',
  }
}

const buttonTheme = {
  stroke: `transparent`,
  r: 5,
  fill: `var(--color-neutral-10)`,
  style: {
    color: `var(--color-neutral-80)`,
  },
  states: {
    hover: {
      fill: `var(--color-neutral-20)`,
    }
  }
}

function CustomHighcharts({ options }: any) {

  const defaultAxisOptions = {
    lineColor: `var(${commonStyles.axis.zeroLineColor})`,
    gridLineColor: `var(${commonStyles.axis.gridColor})`,
    minorGridLineColor: `var(${commonStyles.axis.minorGridColor}})`,
    tickColor: `var(${commonStyles.axis.tickColor})`,
    title: {
      style: {
        color: `var(${commonStyles.axis.title.color})`,
        fontSize: `${commonStyles.axis.title.size}px`,
      }
    },
    labels: {
      style: {
        color: `var(${commonStyles.axis.labels.color})`,
        fontSize: `${commonStyles.axis.labels.size}px`,
      }
    },
  }

  const defaultOptions = {
    colors: [
      "var(--color-secondary)",
      "var(--color-heading)",
      '#2ca02c',  // cooked asparagus green
      '#d62728',  // brick red
      '#9467bd',  // muted purple
      "#2b908f",
      // '#8c564b',  // chestnut brown
      '#e377c2',  // raspberry yogurt pink
      '#7f7f7f',  // middle gray
      // '#bcbd22',  // curry yellow-green
      // '#17becf'   // blue-teal
      // "var(--neutral-color-60)",
      // "var(--x-green-color)",
      // // "#90ed7d",
      // // "#f7a35c",
      // // "#e4d354",
      // // "#f45b5b",
      // // "#91e8e1",
    ],
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: `var(${commonStyles.font})`,
        // marginTop: '2rem',
        // marginBottom: '2rem',
      },
      type: 'spline',
      resetZoomButton: {
        theme: buttonTheme,
      },
    },
    mapNavigation: {
      bottonOptions: {
        theme: buttonTheme,
      },
    },
    title: {
      text: '',
      style: {
        fontFamily: `var(${commonStyles.title.font})`,
        color: `var(${commonStyles.title.color})`,
        fontSize: `${commonStyles.title.size}px`,
      },
    },
    subtitle: {
      style: {
        color: 'var(--color-neutral-60)',
      }
    },
    legend: {
      itemStyle: {
        color: 'var(--color-neutral-80)',
      },
      itemHoverStyle: {
        color: 'var(--color-neutral-100)',
      },
      itemHiddenStyle: {
        color: 'var(--color-neutral-60)',
      },
      navigation: {
        activeColor: 'var(--color-neutral-100)',
        inactiveColor: 'var(--color-neutral-20)',
        
      },
    },
    tooltip: {
      shadow: false,
    },
    
  }

  const finalOptions: any = deepmerge(defaultOptions, options)
  for (const axis of ['xAxis', 'yAxis', 'zAxis']) {
    if (finalOptions[axis]) {
      if (Array.isArray(finalOptions[axis])) {
        for (const [i, axisOptions] of finalOptions[axis].entries()) {
          finalOptions[axis][i] = deepmerge(defaultAxisOptions, axisOptions)
        }
      } else {
        finalOptions[axis] = deepmerge(defaultAxisOptions, finalOptions[axis])
      }
    }
    else {
      finalOptions[axis] = defaultAxisOptions
    }
  }

  // // TODO: move this inside the component and check whether you need to load different modules
  React.useEffect(() => {
    Highcharts.dateFormats = {
      q: function (timestamp) {
        const date = new Date(timestamp)
        return(Math.floor(date.getUTCMonth() / 3) + 1).toFixed(0);
      }
    };
    highchartsData(Highcharts)
    highchartsMore(Highcharts)
    highchartsAnnotations(Highcharts)
    Highcharts.setOptions({
      lang: {
        weekdays: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
        shortWeekdays: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
        shortMonths: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
        months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
        thousandsSep: ",",
      },
    })
  }, [])

  return(
    <figure>
      <HighchartsReact
        highcharts={Highcharts}
        options={finalOptions}
      />
    </figure>
  )
}

export default CustomHighcharts

// TODO: extract common options some more, like annotations styling