// Runs before paint (right after <body>) so the language switch icon doesn't flash.
// If the visitor has no saved preference yet, adopt the language of the URL they
// landed on — otherwise first-time visitors to /en/ pages get bounced to Thai.

function setRootAttribute(targetLang) {
  document.documentElement.setAttribute('data-preferred-lang', targetLang)
}

var urlLang = (window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')) ? 'en' : 'th'

var localStorageLang = null
try {
  localStorageLang = localStorage.getItem('preferredLang')
} catch (err) {}

if (localStorageLang === 'th' || localStorageLang === 'en') {
  setRootAttribute(localStorageLang)
} else {
  try {
    localStorage.setItem('preferredLang', urlLang)
  } catch (err) {}
  setRootAttribute(urlLang)
}
