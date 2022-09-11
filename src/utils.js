// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export function setupCustomVh() {
  const onResize = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  window.addEventListener("resize", onResize);
  onResize();
}

export function arrayCompare(a, a2) {
  if (!Array.isArray(a) || !Array.isArray(a2) || a.length !== a2.length) {
    return false;
  }

  // .concat() to not mutate arguments
  const arr1 = a.concat().sort();
  const arr2 = a2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
