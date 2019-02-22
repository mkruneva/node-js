const rect = {
  perimeter: (x: number, y: number) => (2 * (x + y)),
  area: (x: number, y: number) => (x*y)
}

function solveRect (l: number, b: number){
  console.log('Solving Reactangle with l and b ', l, b);

  if (l <= 0 || b <= 0) {
    console.log('reactangle dimentions should be greater than 0');
  } else {
    console.log('the area of rectange is ', rect.area(l, b));
    console.log('the perimeter of rectange is ', rect.perimeter(l, b));
  }
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 4);
