import Wave from "./Wave"

const waveWidth = 2560
const waveHeight = 120
const numLayers = 2
const waveOptions = {
  numLines: 1,
  numControls: 12,
  angleWindowSize: Math.PI / 6,
}

export default function FooterWave() {
  return (
    <svg viewBox={`0 0 ${waveWidth} ${waveHeight}`} style={{width: `${waveWidth}px`}}>
      {Array.from({ length: numLayers }).map((_, i) => (
        <Wave
          key={i}
          width={waveWidth}
          height={waveHeight}
          options={waveOptions}
          pathSuffix={`V ${waveHeight} H 0 Z`}
          duration={[2, 4]}
          className="fill-primary opacity-10 text-red-500"
        />
      ))}
    </svg>
  )
}