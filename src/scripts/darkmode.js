
import { animate } from 'popmotion'

import styleDefinitions from '@styles/_darkmode.module.scss'

const colorTypes = styleDefinitions.colorTypes.replaceAll('\"', "").split(',').map((x) => x.trim())

const colorVariants = {
  light: colorTypes.reduce((acc, x) => {
    acc[`--color-${x}`] = styleDefinitions[`light--color-${x}`]
    return acc
  }, {}),
  dark: colorTypes.reduce((acc, x) => {
    acc[`--color-${x}`] = styleDefinitions[`dark--color-${x}`]
    return acc
  }, {}),
}

const switchTheme = (targetTheme, duration) => {

  if (duration === 0) {
    Object.keys(colorVariants[targetTheme]).forEach((key) => {
      document.body.style.setProperty(key, colorVariants[targetTheme][key])
    })
  }
  Object.keys(colorVariants[targetTheme]).forEach((key) => {
    animate({
      from: document.body.style.getPropertyValue(key),
      to: colorVariants[targetTheme][key],
      duration: duration,
      onUpdate: (value) => {
        document.body.style.setProperty(key, value)
      }
    })
  })

}

switchTheme(document.documentElement.getAttribute("data-theme"), 0)

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation)
    if (mutation.type === "attributes") {
      if (mutation.attributeName === "data-theme") {
        switchTheme(mutation.target.getAttribute("data-theme"), 500)
      }
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true //configure it to listen to attribute changes
});
