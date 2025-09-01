/* Local storage helpers for client-side safe usage
   Exports (named):
   - hasSavedCardLocal(): boolean
   - markSavedCardLocal(value: boolean): void
*/
const SAVED_CARD_KEY = "hasSavedCard"

/** Safely read boolean flag from localStorage */
export function hasSavedCardLocal() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false
    const v = window.localStorage.getItem(SAVED_CARD_KEY)
    return v === "1" || v === "true"
  } catch {
    return false
  }
}

/** Safely write boolean flag to localStorage */
export function markSavedCardLocal(value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return
    window.localStorage.setItem(SAVED_CARD_KEY, value ? "1" : "0")
  } catch {
    // ignore
  }
}
