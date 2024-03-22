const test = [10, 15, 2, 13, 15, 20, 1];
// let a = [1, 3, 10, 2, 4].reduce((accumulator, currentValue) => {
//   console.log(accumulator);
//   return accumulator + currentValue; //accumulator : the previous value but at first it's the initial value or we can defined witch initial value we want
// }, 0);
// console.log(a);

let a = [];
test.forEach((value) => a.push(value * 2));

console.log(test.indexOf(15));

console.log(
  test.find((value, index) => {
    return index === 0;
  })
);

console.log(test.findIndex((value, index, array) => value === 15));

const testCopy = test.slice(0, 2);
console.log(testCopy);
test.splice(0, 3);
console.log(test);

console.log("khalid".charAt(1));
console.log("khalid".concat(" marzoug"));
console.log("khalid".indexOf("k"));
console.log("khalidk".replace("k", "$"));
console.log("khalid".split("").join("-"));
console.log("khalid".substring(0, 3));
console.log(Math.ceil(3.1));
console.log(Math.floor(3.9));
console.log(Math.abs(-3.9));
console.log(!isNaN(NaN));

// setInterval(() => {
//   console.log("str");
// },1000);

const khalid = [1, 2, 5, 999, 9, 99, 101];
console.log(Math.max(...khalid));
console.log(
  khalid.reduce((acc, cuurentValue) => {
    return Math.max(acc, cuurentValue);
  })
);
