import React from "react";

const CustomHighcharts = React.lazy(() => import('./CustomHighcharts'))

export default function Plotter(props: any) {

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CustomHighcharts
        {...props}
      />
    </React.Suspense>
  )
}