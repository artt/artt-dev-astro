import { navigate } from 'astro:transitions/client';

function removeTrailingSlash(path: string) {
  return path === "/" ? path : path.replace(/\/$/, "")
}

export function getLink(to: string, lang: string) {
  return removeTrailingSlash((lang === "en" ? "/en" : "") + to.replace(/^\/en/, ''))
}

export function getPreferredLang() {
  return localStorage.getItem('preferredLang') || 'th';
}

export function switchLang() {
  const currentPreferredLang = getPreferredLang()
  const newPreferredLang = currentPreferredLang === "th" ? "en" : "th"
  localStorage.setItem("preferredLang", newPreferredLang)
  navigate(getLink(window.location.pathname, newPreferredLang) || "/")
}
