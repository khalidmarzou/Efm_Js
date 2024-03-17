// sum of all value in this array :
let a = [15, 16, 17, 18, 19].reduce((accumulator, currentValue) => {
  return accumulator + currentValue; //accumulator : the previous value but at first it's the initial value or we can defined witch initial value we want
}, 0);

// console.log(a);

// find max number :
let max = [5, 4, 1, 9, 30, 10, 22, 1, 3, 15].reduce(
  (accumulator, currentValue) => {
    if (currentValue > accumulator) {
      return currentValue;
    } else {
      return accumulator;
    }
  }
);

// find min number :
let min = [5, 4, 1, 9, 30, 10, 22, 1, 3, 15].reduce(
  (accumulator, currentValue) => {
    if (currentValue < accumulator) {
      return currentValue;
    } else {
      return accumulator;
    }
  }
);
console.log(min);

console.log(Math.max(...[5, 4, 1, 9, 30, 10, 22, 1, 3, 15]));
