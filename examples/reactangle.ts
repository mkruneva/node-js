export default (x: number, y: number, callback: Function) => {
  if (x <= 0 || y <= 0) {
    setTimeout(() => {
      callback(new Error('Reactangle dimentions should be greater than 0'), null);
    }, 1000);
  } else {
      setTimeout(() => {
        callback(null, {
          perimeter: () => (2 * (x + y)),
          area: () => (x * y)
        });
      }, 1000);
  }
}

// exports.perimeter = (x: number, y: number) => (2 * (x + y));
// exports.area = (x: number, y: number) => (x * y);

// export const perimeter = (x: number, y: number) => (2 * (x + y));
// export const area = (x: number, y: number) => (x * y);
