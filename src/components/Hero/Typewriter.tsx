import React from "react"
import { shuffle } from "@/utils"

// mostly from https://codepen.io/Coding_Journey/embed/BEMgbX?height=600&default-tab=result&embed-version=2#html-box

const artList = [
  "an economist",
  "an INFP",
  "a developer",
  "Thai",
  "creative",
  "a writer",
  "a musician",
  "a designer",
  "a photographer",
]

export default function Typewriter({ className }: { className?: string }) {

  const typingDelay = 100
  const typingDelayWindow = 20 // window width
  const erasingDelay = 100
  const erasingDelayWindow = 20
  const newTextDelay = 1000
  const maxWords = 7

  const firstrun = React.useRef(true)
  const ref = React.useRef(null)
  const letterIndex = React.useRef(0)
  const wordIndex = React.useRef(0)
  const [finalWord, setFinalWord] = React.useState("")
  const words = React.useRef([])
  // const [words, setWords] = React.useState([])

  function shuffleWords() {
    let tmp = artList.slice()
    tmp = shuffle(tmp).slice(0, maxWords)
    tmp.unshift("Art")
    words.current = tmp
  }

  function type() {
    if (!ref.current || words.current.length === 0) return
    if (letterIndex.current <= words.current[wordIndex.current].length) {
      if (!ref.current.classList.contains("typing"))
        ref.current.classList.add("typing")
      setFinalWord(words.current[wordIndex.current].substring(0, letterIndex.current))
      letterIndex.current ++
      let nextDelay = typingDelay + (Math.random() - 0.5) * typingDelayWindow
      if (words.current[wordIndex.current][letterIndex.current] === " ") {
        nextDelay /= 1.5
      }
      setTimeout(type, nextDelay)
    } 
    else {
      ref.current.classList.remove("typing")
      let nextDelay = newTextDelay
      if (wordIndex.current === 0) {
        nextDelay *= 2
      }
      setTimeout(erase, nextDelay)
    }
  }
  
  function erase() {
    if (!ref.current) return
    if (letterIndex.current > 0) {
      if (!ref.current.classList.contains("typing"))
        ref.current.classList.add("typing")
      setFinalWord(words.current[wordIndex.current].substring(0, letterIndex.current - 1))
      letterIndex.current --
      let nextDelay = erasingDelay + (Math.random() - 0.5) * erasingDelayWindow
      if (words.current[wordIndex.current][letterIndex.current] === " ") {
        nextDelay /= 1.5
      }
      setTimeout(erase, nextDelay)
    }
    else {
      ref.current.classList.remove("typing");
      // get new word
      wordIndex.current ++
      if (wordIndex.current >= words.current.length) {
        shuffleWords()
        wordIndex.current = 0
      }
      setTimeout(type, typingDelay)
    }
  }

  React.useEffect(() => {
    shuffleWords()
  }, [])

  React.useEffect(() => {
    if (firstrun.current && words.current.length > 0) {
      setTimeout(type, typingDelay)
      firstrun.current = false
    }
  }, [words.current])

  return(
    <span ref={ref} className={className}>{finalWord}</span>
  )

}