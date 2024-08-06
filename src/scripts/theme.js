import { lighten, desaturate } from 'color2k'

const arttBlue = "#077185"
const arttOrange = "#D76D07"
const offWhiteBackground = "#F4F1F0"
const offBlackBackground = "#1a202c"
const codeBackgroundLight = "#E8E1DE"
const codeBackgroundDark = "#090b0e"

export const theme = {
  light: {
    background: offWhiteBackground,
    text: 'rgba(0, 0, 0, 0.87)',
    primary: arttBlue,
    heading: arttBlue,
  },
  dark: {
    background: offBlackBackground,
    text: 'rgba(255, 255, 255, 0.87)',
    primary: lighten(arttBlue, 0.1),
    // heading: scale-color($artt-blue, $lightness: 50%, $saturation: -40%),
    heading: desaturate(lighten(arttBlue, 0.5), 0.4),
  }
}
