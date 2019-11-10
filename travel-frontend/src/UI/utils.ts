export const isOutOfViewport = (elem: HTMLElement) => {
	const bounding = elem.getBoundingClientRect();
	const out: any = {};
	out.top = bounding.top < 0;
	out.left = bounding.left < 0;
	out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	out.any = out.top || out.left || out.bottom || out.right;
	out.all = out.top && out.left && out.bottom && out.right;
	return out;
};

export const appIsInStandaloneMode = () => {
  if ((window.navigator as any).standalone) return true
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  if (document.referrer.includes('android-app://')) return true;

  return false;
}