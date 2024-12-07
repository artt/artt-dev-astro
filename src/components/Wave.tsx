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
  className?: string,
  [x: string]: any, // any other props that go to `rest`
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
  
  const pathRef = React.useRef<SVGPathElement | null>(null)
  const startPath = getPath(initialSeed)

  function getPath(seed?: string | number) {
    seed = typeof seed === "number" ? seed.toString() : seed
    return genHLines(width, height, {...options, seed: seed || ''}, override)[0].curve + pathSuffix
  }

  // Convert easing array or string into a keySpline format if it's an array
  // keySplines expects a format like "x1 y1 x2 y2"
  const keySpline = Array.isArray(easing) ? easing.join(" ") : easing

  function animatePath(startPath: string) {
    
    if (!pathRef.current) return

    const time = duration[0] + Math.random() * (duration[1] - duration[0])
    const nextPath = getPath()

    // delete all children of pathRef.current
    while (pathRef.current.firstChild) {
      pathRef.current.removeChild(pathRef.current.firstChild)
    }
    
    // add animate element to pathRef.current
    const animateTag = document.createElementNS("http://www.w3.org/2000/svg", "animate")
    animateTag.setAttribute("attributeName", "d")
    animateTag.setAttribute("begin", "indefinite")
    animateTag.setAttribute("fill", "freeze")
    animateTag.setAttribute("from", startPath)
    animateTag.setAttribute("to", nextPath)
    animateTag.setAttribute("dur", `${time}s`)
    animateTag.setAttribute("keyTimes", "0;1")
    animateTag.setAttribute("keySplines", keySpline)
    animateTag.setAttribute("calcMode", "spline")
    pathRef.current.appendChild(animateTag)

    pathRef.current.setAttribute("d", startPath)
    animateTag.beginElement()

    setTimeout(() => animatePath(nextPath), time * 1000)
  }

  React.useEffect(() => {
    animatePath(startPath)
  }, [])

  return (
    <path
      ref={pathRef}
      className={className}
      {...rest}
    />
  )
}

type GroupProps = {
  numWaves: number,
  width: number,
  height: number,
  options?: Object,
  override?: Object,
  duration?: number[],
  delay?: number,
  easing?: string | number[],
  pathSuffix?: string,
  classNameSvg?: string,                // className that applies to the svg
  className?: string,                   // className that applies for each wave
  otherAttributes?: Object | Object[],  // either a single object that applies to all waves, or an array of objects of length equal to numWaves
}

// TODO: is there anything we could do to deduplicate the default values?
export const WaveGroup: React.FC<GroupProps> = ({
  numWaves,
  width,
  height,
  options={},
  override,
  duration=[4, 4],
  delay=0,
  easing=[0.37, 0, 0.63, 1],
  pathSuffix="",
  classNameSvg,
  className,
  otherAttributes,
}) => {

  if (otherAttributes) {
    // check if otherAttributes is an object or an array
    if (Array.isArray(otherAttributes)) {
      if (otherAttributes.length !== numWaves) {
        throw new Error("Length of otherAttributes must be equal to numWaves")
      }
    }
    else {
      otherAttributes = Array(numWaves).fill(otherAttributes)
    }
  }
  else {
    otherAttributes = Array(numWaves).fill({})
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={"mx-auto " + classNameSvg || ''} style={{width: `${width}px`}}>
      {[...Array(numWaves).keys()].map(i => (
        <Wave
          key={i}
          initialSeed={i}
          width={width}
          height={height}
          options={options}
          override={override}
          duration={duration}
          delay={delay}
          easing={easing}
          pathSuffix={pathSuffix}
          className={className}
          {...(otherAttributes as Object[])[i]}
        />
      ))}
    </svg>
  )
}

export default Wave