import { useEffect, useState } from 'react';

export function addTouchClass() {
  var isTouch = false; // var to indicate current input type (is touch versus no touch)
  var isTouchTimer;
  var curRootClass = ''; // var indicating current document root class ("can-touch" or "")

  // eslint-disable-next-line no-unused-vars
  function addtouchclass(e) {
    clearTimeout(isTouchTimer);
    isTouch = true;
    if (curRootClass !== 'can-touch') {
      // add "can-touch' class if it's not already present
      curRootClass = 'can-touch';
      document.documentElement.classList.add(curRootClass);
    }
    isTouchTimer = setTimeout(function () {
      isTouch = false;
    }, 500); // maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
  }

  // eslint-disable-next-line no-unused-vars
  function removetouchclass(e) {
    if (!isTouch && curRootClass === 'can-touch') {
      // remove 'can-touch' class if not triggered by a touch event and class is present
      isTouch = false;
      curRootClass = '';
      document.documentElement.classList.remove('can-touch');
    }
  }

  document.addEventListener('touchstart', addtouchclass, false); // this event only gets called when the input type is touch
  document.addEventListener('mouseover', removetouchclass, false); // this event gets called when the input type is everything from touch to mouse/trackpad
}

export function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  console.log('intersect', isIntersecting);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  console.log('intersect', isIntersecting);

  return isIntersecting;
}

export function isLast(participants, id) {
  if (participants.length === 0) return false;
  const last = participants.at(-1);
  return last.id === id;
}

// access the id of the neighbor to the active player
export function neighborId(
  participants,
  active,
  dir = +1,
  { wrap = true } = {},
) {
  const n = participants.length;
  if (!n) return undefined;

  const i = participants.findIndex((p) => p.id === active);
  if (i === -1) return participants[dir > 0 ? 0 : n - 1]?.id;

  let j = i + dir;
  if (wrap) {
    j = (j + n) % n;
  } else if (j < 0 || j >= n) {
    return undefined;
  }
  return participants[j]?.id;
}
