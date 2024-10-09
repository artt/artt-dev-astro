import clsx from "clsx"

import styles from "./diagram.module.scss"

function Car({ style, ...rest }) {
  return(
    <g className={styles.car} style={style}>
      <rect {...rest} />
      <text x={rest.x + 10} y={rest.y + 30} className={styles.carText}>{rest.label}</text>
    </g>
  )
}

function Dot(props) {
  return(
    <g className={styles.dot}>
      <circle cx={props.cx} cy={props.cy} />
      <text x={props.cx + 10} y={props.cy + 20} className={styles.dotText}>{props.label}</text>
    </g>
  )
}

function MeasuringLine({ className, x, y, length, label }) {
  return(
    <g className={clsx(styles.measure, className)}>
      <line x1={x} y1={y} x2={x - length} y2={y} />
      <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
      {/* make a traiangular arrow on the left of the line */}
      <polygon points={`${x - length - 5},${y} ${x - length},${y - 3} ${x - length},${y + 3}`} />
      <text x={x - length/2} y={y - 5}>{label}</text>
    </g>
  )
}

export default function Diagram({ step }) {

  const carDimensions = {width: 140, height: 70}
  const carAngle = Math.atan2(carDimensions.height, carDimensions.width)
  const topLine = 100
  const obs = {x: 50, y: 280}
  const carA = {x: 380, y: topLine}
  const angle = Math.atan2(obs.y - carA.y, obs.x - carA.x)
  const distanceObsToRef = 150
  const ref = {x: obs.x - distanceObsToRef * Math.cos(angle), y: obs.y - distanceObsToRef * Math.sin(angle)}
  const carDiagonal = - carDimensions.width / Math.cos(angle)
  // set carB so that the lower right is on the line from obs to ref
  const carB = {x: carA.x + carDimensions.height / Math.tan(angle) - carDimensions.width, y: carA.y}
  const carC = {x: carA.x - carDimensions.width, y: carA.y}

  if (step === 1) {
    return(
      <figure>
        <svg className={styles.main} viewBox="0 0 600 330" xmlns="http://www.w3.org/2000/svg">
          <Car
            {...carA}
            {...carDimensions}
            label={"A"}
          />
          <Car
            {...carB}
            {...carDimensions}
            label={"B"}
          />
          {/* draw a line from upper left of box A to lower right of box B */}
          <line x1={carA.x} y1={carA.y} x2={obs.x} y2={obs.y} strokeDasharray={"5 5"} />
          <Dot cx={obs.x} cy={obs.y} label="ผู้สังเกตการณ์" />
          <Dot cx={ref.x} cy={ref.y} label="จุดอ้างอิง" />
          <MeasuringLine
            className={styles.green}
            x={carA.x + carDimensions.width}
            y={topLine - 50}
            length={carA.x - carB.x}
            label={"ระยะทางจริง"}
          />
          <MeasuringLine
            className={styles.orange}
            x={carA.x + carDimensions.width}
            y={carA.y - 20}
            length={carDiagonal}
            label={"ระยะทแยง"}
          />
          <g className={styles.orange}>
            <path d={`M ${carA.x + carDimensions.width} ${carA.y} L ${carA.x} ${carA.y + carDimensions.height} A ${carDiagonal} ${carDiagonal} 45 0 1 ${carA.x + carDimensions.width - carDiagonal} ${topLine}`} />
          </g>
        </svg>
      </figure>
    )
  }
  else if (step === 2) {
    return(
      <figure>
        <svg className={styles.main} viewBox="0 0 600 330" xmlns="http://www.w3.org/2000/svg">
          <Car
            {...carA}
            {...carDimensions}
            label={"A"}
            style={{
              transformOrigin: `${carA.x}px ${carA.y}px`,
              transform: `rotate(${-carAngle}rad)`,
            }}
          />
          <Car
            {...carC}
            {...carDimensions}
            label={"B"}
            style={{
              transformOrigin: `${carA.x}px ${carA.y + carDimensions.height}px`,
              transform: `translate(0, -${carDimensions.height}px) rotate(${-carAngle}rad)`
            }}
          />
          {/* draw a line from upper left of box A to lower right of box B */}
          <line x1={carA.x} y1={carA.y} x2={obs.x} y2={obs.y} strokeDasharray={"5 5"} />
          <Dot cx={obs.x} cy={obs.y} label="ผู้สังเกตการณ์" />
          <Dot cx={ref.x} cy={ref.y} label="จุดอ้างอิง" />
          <MeasuringLine
            className={styles.orange}
            x={carA.x + carDiagonal}
            y={carA.y}
            length={carDiagonal}
            label={"ระยะทแยง"}
          />
        </svg>
      </figure>
    )
  }

}