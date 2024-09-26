import React from "react"

const CustomAlbum = React.lazy(() => import('./CustomAlbum'))
// const CustomZoomableImage = React.lazy(() => import('./CustomZoomableImage'))

export const Album = (props: any) => {
  return(
    <React.Suspense fallback={<div>Loading...</div>}>
      <CustomAlbum {...props} />
    </React.Suspense>
  )
}

// export const ZoomableImage = (props: any) => {
//   return(
//     <React.Suspense fallback={<div>Loading...</div>}>
//       <CustomZoomableImage {...props} />
//     </React.Suspense>
//   )
// }

