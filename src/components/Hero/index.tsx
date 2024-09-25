import Wave from "@/components/Wave"
import { WaveGroup } from "@/components/Wave"
import Typewriter from "./Typewriter"
import clsx from "clsx"

import styles from "./styles.module.scss"
// const styles = require("./styles.module.scss")

const numLines = 5

const waveWidth = 10000
const xWidth = 2000
const contentWidth = 840
const windowWidth = 150

const xLeft = (waveWidth-xWidth)/2
const xRight = (waveWidth+xWidth)/2
const contentLeft = (waveWidth-contentWidth)/2
const contentRight = (waveWidth+contentWidth)/2

const waveHeight = 1000
const midHeight = 50

const midTop = (waveHeight-midHeight)/2
const midBottom = (waveHeight+midHeight)/2
const midTop2 = (waveHeight-midHeight*3)/2
const midBottom2 = (waveHeight+midHeight*3)/2

const override = new Array(17)
for (let i = 0; i < override.length; i ++)
  override[i] = {y: ["r", 0, waveHeight]}

override.splice(6, 5,
  {
    x: ["r", xLeft - windowWidth, xLeft + windowWidth],
  },
  {
    x: ["r", contentLeft - windowWidth, contentLeft + windowWidth],
    y: ["r", midTop2, midBottom2]
  },
  {
    y: ["r", midTop, midBottom]
  },
  {
    x: ["r", contentRight - windowWidth, contentRight + windowWidth],
    y: ["r", midTop2, midBottom2]
  },
  {
    x: ["r", xRight - windowWidth, xRight + windowWidth],
  }
)

// TODO: make wave change colors
// TODO: add "glistening" effect for the waves

const rng = Array.from(new Array(numLines), (x, i) => i)
const stylesA = rng.map(x => {
  return {fill: "transparent", stroke: `hsl(${(Math.random()*360) + x/numLines*360}, 100%, 30%)`, strokeWidth: 1 + Math.random()*2}
})
const stylesB = rng.map(x => {
  return {fill: "transparent", stroke: `hsl(${(Math.random()*360) + x/numLines*360}, 100%, 70%)`, strokeWidth: 1 + Math.random()*2}
})
const waveStyles = [stylesA, stylesB]
const waveOptions = {
  numLines: 1,
  numControls: 17,
  angleWindowSize: Math.PI / 6,
}

export default function Hero() {

  return(
    <div className={clsx(styles.heroSize, styles.container, "pointer-events-none")}>
      <div className={clsx(styles.heroSize, styles.positioner)}>
        <div className={clsx(styles.waves)}>
          <WaveGroup
            numWaves={numLines * 2}
            width={waveWidth}
            height={waveHeight}
            options={waveOptions}
            override={override}
            duration={[2, 10]}
            otherAttributes={waveStyles.flat()}
          />
        </div>
        <div className="pointer-events-auto">
          <div className={styles.top}>
            Hello!
          </div>
          <div className={styles.bottom}>
            I’m <Typewriter className={styles.typewriter} />
          </div>
        </div>
      </div>
    </div>
  )
}