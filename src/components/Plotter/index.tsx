import React from "react";

// Highcharts (~470KB) lives in its own chunk thanks to this dynamic import.
// The chunk is only requested the first time <CustomHighcharts> renders.
const CustomHighcharts = React.lazy(() => import('./CustomHighcharts'))

// Highcharts' default chart height; used to reserve space so the page doesn't
// jump when the chart replaces the placeholder.
const DEFAULT_CHART_HEIGHT = 400

/**
 * Returns a ref and whether that element has come within `rootMargin` of the
 * viewport. Once true it stays true (we only need to trigger the load once).
 */
function useNearViewport<T extends Element>(rootMargin = '400px') {
  const ref = React.useRef<T>(null)
  const [isNear, setIsNear] = React.useState(false)

  React.useEffect(() => {
    if (isNear || !ref.current) return
    if (!('IntersectionObserver' in window)) {
      setIsNear(true)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setIsNear(true)
        observer.disconnect()
      }
    }, { rootMargin })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isNear, rootMargin])

  return [ref, isNear] as const
}

// Loads Highcharts as soon as it renders (no viewport check). Used directly by
// custom chart components in posts, e.g. content/blog/2020/12.25-good-days.
export function LazyHighcharts(props: any) {
  return (
    <React.Suspense fallback={<div style={{ minHeight: DEFAULT_CHART_HEIGHT }} aria-hidden="true" />}>
      <CustomHighcharts {...props} />
    </React.Suspense>
  )
}

export default function Plotter(props: any) {
  const [ref, isNear] = useNearViewport<HTMLElement>()

  const height = typeof props.options?.chart?.height === 'number'
    ? props.options.chart.height
    : DEFAULT_CHART_HEIGHT
  const placeholder = <div style={{ minHeight: height }} aria-hidden="true" />

  return (
    <figure ref={ref}>
      {isNear ? (
        <React.Suspense fallback={placeholder}>
          <CustomHighcharts {...props} />
        </React.Suspense>
      ) : placeholder}
    </figure>
  )
}
