let a = [1, 9, 8, 7, 10, 1, 3];

for (let i = 0; i < a.length; i++) {
  console.log(i); //index
  console.log(a[i]); //value
}

for (let x in a) {
  console.log(x); //index
}
for (let x of a) {
  console.log(x); //value
}
