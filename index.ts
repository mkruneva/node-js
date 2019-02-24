// const rect = require('./reactangle');
import rect from './reactangle';

interface Options {
  area: Function
  perimeter: Function
}

function solveRect (l: number, b: number){
  rect(l, b, (err: Error, rectangle: Options) => {
    console.log('Solving Reactangle with l and b ', l, b);
    if (err) {
      console.log('ERROR: ', err.message);
    } else {
      console.log('Rect area is : ', rectangle.area());
      console.log('Rect perimeter is : ', rectangle.perimeter());
    }
  });
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 4);
