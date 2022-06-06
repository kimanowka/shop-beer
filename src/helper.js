export function throttle(cb, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      cb(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
