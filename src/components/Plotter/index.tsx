import React from "react";

const CustomHighcharts = React.lazy(() => import('./CustomHighcharts'))

export function LazyHighcharts(props: any) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CustomHighcharts
        {...props}
      />
    </React.Suspense>
  )
}

export default function Plotter(props: any) {

  return (
    <figure>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CustomHighcharts
          {...props}
        />
      </React.Suspense>
    </figure>
  )
}