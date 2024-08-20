// Adapted from https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt

// Insert this script in your index.html right after the <body> tag.
// This will help to prevent a flash if dark mode is the default.

// Change these if you use something different in your hook.

console.log('loadTheme.js loaded');

function setRootAttribute(targetTheme) {
  document.documentElement.setAttribute('data-theme', targetTheme)
}

var preferDarkQuery = '(prefers-color-scheme: dark)';
var mql = window.matchMedia(preferDarkQuery);
var supportsColorSchemeQuery = mql.media === preferDarkQuery;
var localStorageLang = null;
try {
  localStorageLang = localStorage.getItem('theme');
} catch (err) {}
var localStorageExists = localStorageLang !== null;
if (localStorageExists) {
  localStorageLang = localStorageLang;
}

// Determine the source of truth
if (localStorageExists) {
  // source of truth from localStorage
  setRootAttribute(localStorageLang);
} else if (supportsColorSchemeQuery) {
  // source of truth from system
  setRootAttribute(mql.matches ? 'dark' : 'light');
  localStorage.setItem(storageKey, mql.matches);
} else {
  // source of truth from document
  // var isDarkMode = document.documentElement.setAttribute('data-theme') === 'dark';
  localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
}
