export function getAbsolutePosition(el: HTMLElement) {
  const pos = {x: 0, y: 0};
  let checkEl = el;
  while (checkEl) {
    pos.x += checkEl.offsetLeft;
    pos.y += checkEl.offsetTop;
    checkEl = checkEl.offsetParent as HTMLElement;
  }
  return pos;
}
