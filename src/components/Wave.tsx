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
        // ...style,
        transition: `d ${time}s cubic-bezier(${typeof easing === "string" ? easing : easing.join(", ")})`,
      },
    })
    setTimeout(animatePath, time * 1000)
  }

  React.useEffect(() => {
    animatePath()
  }, [])

  return (
    <path {...attributes} className={className} {...rest} />
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
  className,
  otherAttributes,
}) => {

  console.log(otherAttributes)

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
    <svg viewBox={`0 0 ${width} ${height}`} className={"mx-auto"} style={{width: `${width}px`}}>
      {[...Array(numWaves).keys()].map(i => (
        <Wave
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