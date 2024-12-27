import { navigate } from 'astro:transitions/client';
import { addTrailingSlash } from '@/lib/utils';

export function getLink(to: string, lang: string) {
  return addTrailingSlash((lang === "en" ? "/en" : "") + to.replace(/^\/en/, ''))
}

export function getPreferredLang() {
  return localStorage.getItem('preferredLang') || 'th';
}

export function getOtherLang(lang: string) {
  return lang === 'th' ? 'en' : 'th';
}

export function switchLang() {
  const currentPreferredLang = getPreferredLang()
  const newPreferredLang = getOtherLang(currentPreferredLang)
  localStorage.setItem("preferredLang", newPreferredLang)
  navigate(getLink(window.location.pathname, newPreferredLang) || "/")
}

/**
 * Get text in the page's language
 * @param lang Preferred language or null (default to Thai)
 * @param th Text when preferred language is Thai or null
 * @param en Text when preferred language is English
 * @returns Text in the page's language
 */
export function getText(lang: string | null, { th, en }: { th: string, en: string }) {
  return lang === "en" ? en : th
}