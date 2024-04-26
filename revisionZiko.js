const table = [1, 12, 5, 3, 2];
table.sort(function (a, b) {
  return b - a;
});
console.log(table);

console.log(Math.min(...table))