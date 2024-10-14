// Adapted from https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt

// Insert this script in your index.html right after the <body> tag.
// This will help to prevent a flash if dark mode is the default.

// Change these if you use something different in your hook.

function setRootAttribute(targetTheme) {
  document.documentElement.setAttribute('data-theme', targetTheme)
  const meta = document.createElement('meta')
  meta.name = "twitter:widgets:theme"
  meta.content = targetTheme
  document.getElementsByTagName('head')[0].appendChild(meta);
}

var preferDarkQuery = '(prefers-color-scheme: dark)';
var mql = window.matchMedia(preferDarkQuery);
var supportsColorSchemeQuery = mql.media === preferDarkQuery;
var localStorageTheme = null;
try {
  localStorageTheme = localStorage.getItem('theme');
} catch (err) {}
var localStorageThemeExists = localStorageTheme !== null;
if (localStorageThemeExists) {
  localStorageTheme = localStorageTheme;
}

// Determine the source of truth
if (localStorageThemeExists) {
  // source of truth from localStorage
  setRootAttribute(localStorageTheme);
} else if (supportsColorSchemeQuery) {
  // source of truth from system
  setRootAttribute(mql.matches ? 'dark' : 'light');
  localStorage.setItem('theme', mql.matches);
} else {
  // source of truth from document
  localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
}
