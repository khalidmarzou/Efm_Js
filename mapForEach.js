let a = [1, 99, 4, 5, 3, 6, 7];

let aMap = a.map((value, index, array) => {
  return index; // return another array from what u want
});
console.log(aMap);

a.forEach((value, index, array) => {
  return console.log(value); // return value , if we give it to a var , return undifined
});
