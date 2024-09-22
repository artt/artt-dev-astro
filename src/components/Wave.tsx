// import React from "react"
// import { genHLines } from "random-shapes"
// import { motion } from "framer-motion"

// type Props = {
//   width: number,
//   height: number,
//   options?: Object,
//   override?: Object,
//   duration?: number[],
//   delay?: number,
//   easing?: string | number[],
//   pathSuffix?: string,
//   [x: string]: any,
// }


// const Wave: React.FC<Props> = ({
//   width,
//   height,
//   options={},
//   override,
//   duration=[4, 4],
//   delay=0,
//   easing=[0.37, 0, 0.63, 1],
//   pathSuffix="",
//   ...rest
// }) => {
  
//   const [finalDuration, setFinalDuration] = React.useState(duration[0] + Math.random() * (duration[1] - duration[0]))
//   const [animationQueue, setAnimationQueue] = React.useState('')
//   const [firstPath, setFirstPath] = React.useState('')

//   React.useEffect(() => {
//     setFirstPath(genHLines(width, height, options, override)[0].curve + pathSuffix)
//     setAnimationQueue(genHLines(width, height, options, override)[0].curve + pathSuffix)
//   }, [])

//   if (firstPath === '') return null

//   return(
//     <motion.path
//       d={genHLines(width, height, options, override)[0].curve + pathSuffix}
//       animate={{
//         d: animationQueue,
//       }}
//       onAnimationComplete={definition => {
//         setFinalDuration(duration[0] + Math.random() * (duration[1] - duration[0]))
//         setAnimationQueue(genHLines(width, height, options, override)[0].curve + pathSuffix)
//       }}
//       transition={{
//         duration: finalDuration,
//         delay: delay,
//         ease: easing,
//       }}
//       {...rest}
//     />
//   )
// }

// export default Wave