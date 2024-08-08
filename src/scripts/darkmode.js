
import { animate } from 'popmotion'
import { lighten } from 'color2k'
import { theme } from './theme'

const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

const switchTheme = (targetTheme, duration) => {

  if (duration === 0) {
    Object.keys(theme[targetTheme]).forEach((key) => {
      document.body.style.setProperty(`--color-${kebabize(key)}`, theme[targetTheme][key])
    })
  }

  Object.keys(theme[targetTheme]).forEach((key) => {
    animate({
      from: document.body.style.getPropertyValue(`--color-${kebabize(key)}`),
      to: theme[targetTheme][key],
      duration: duration,
      onUpdate: (value) => {
        document.body.style.setProperty(`--color-${kebabize(key)}`, value)
      }
    })
  })

}

switchTheme(document.documentElement.getAttribute("data-theme"), 0)

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
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
