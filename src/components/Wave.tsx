import React from "react"
import { genHLines } from "random-shapes"
import { log } from "node_modules/astro/dist/core/logger/core"

type Props = {
  width: number,
  height: number,
  options?: Object,
  override?: Object,
  duration?: number[],
  delay?: number,
  easing?: string | number[],
  pathSuffix?: string,
  class?: string,
  [x: string]: any,
}

const Wave: React.FC<Props> = ({
  width,
  height,
  options={},
  override,
  duration=[4, 4],
  delay=0,
  easing=[0.37, 0, 0.63, 1],
  pathSuffix="",
  className,
  ...rest
}) => {
  
  const [path, setPath] = React.useState({d: getPath(), style: {}})

  function getPath() {
    return genHLines(width, height, options, override)[0].curve + pathSuffix
  }

  function animatePath() {
    const time = duration[0] + Math.random() * (duration[1] - duration[0])
    setPath({
      d: genHLines(width, height, options, override)[0].curve + pathSuffix,
      style: {
        transition: `d ${time}s cubic-bezier(${typeof easing === "string" ? easing : easing.join(", ")})`,
      },
    })
    setTimeout(animatePath, time * 1000)
  }

  React.useEffect(() => {
    animatePath()
  }, [])

  return (
    <path {...path} className={className} />
  )
}

export default Wave