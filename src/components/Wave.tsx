import React from "react"
import { genHLines } from "random-shapes"

type Props = {
  initialSeed: string | number,
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
  initialSeed,
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
  
  // need to set the initial seed to avoid complaining about props not match
  const [attributes, setAttributes] = React.useState({ d: getPath(initialSeed), style: {} })

  function getPath(seed?: string | number) {
    seed = typeof seed === "number" ? seed.toString() : seed
    return genHLines(width, height, {...options, seed: seed || ''}, override)[0].curve + pathSuffix
  }

  function animatePath() {
    const time = duration[0] + Math.random() * (duration[1] - duration[0])
    setAttributes({
      d: getPath(),
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
    <path {...attributes} className={className} />
  )
}

export default Wave