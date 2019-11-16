export const appIsInStandaloneMode = () => {
  if ((window.navigator as any).standalone) return true
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  if (document.referrer.includes('android-app://')) return true;

  return false;
}