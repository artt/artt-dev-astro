import { navigate } from 'astro:transitions/client';
import { addTrailingSlash } from '@/lib/utils';


export function getLink(to: string, lang: string) {
  return addTrailingSlash((lang === "en" ? "/en" : "") + to.replace(/^\/en/, ''))
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
