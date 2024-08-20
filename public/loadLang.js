// Adapted from https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt

// Insert this script in your index.html right after the <body> tag.
// This will help to prevent a flash if dark mode is the default.

// Change these if you use something different in your hook.

function setRootAttribute(targetLang) {
  document.documentElement.setAttribute('data-preferred-lang', targetLang)
}

var localStorageLang = null;
try {
  localStorageLang = localStorage.getItem('preferredLang');
} catch (err) {}
var localStorageExists = localStorageLang !== null;
if (localStorageExists) {
  localStorageLang = localStorageLang;
}

// Determine the source of truth
if (localStorageExists) {
  // source of truth from localStorage
  setRootAttribute(localStorageLang);
} else {
  localStorage.setItem('theme', 'th');
  setRootAttribute('th');
}
