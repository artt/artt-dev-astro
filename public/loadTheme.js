// Adapted from https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
// Runs before paint (right after <body>) to avoid a flash of the wrong theme.
//
// Only an explicit choice from the day/night toggle is saved to localStorage.
// Without one, follow the system setting on every visit.

function setRootAttribute(targetTheme) {
  document.documentElement.setAttribute('data-theme', targetTheme)
  var meta = document.querySelector('meta[name="twitter:widgets:theme"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'twitter:widgets:theme'
    document.head.appendChild(meta)
  }
  meta.content = targetTheme
}

var localStorageTheme = null
try {
  localStorageTheme = localStorage.getItem('theme')
} catch (err) {}

if (localStorageTheme === 'dark' || localStorageTheme === 'light') {
  setRootAttribute(localStorageTheme)
} else {
  // Clean up invalid values written by older versions of this script ("true"/"false")
  if (localStorageTheme !== null) {
    try {
      localStorage.removeItem('theme')
    } catch (err) {}
  }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  setRootAttribute(prefersDark ? 'dark' : 'light')
}
