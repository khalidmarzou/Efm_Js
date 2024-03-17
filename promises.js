// methode 01 :

// let myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("promise resolved"); //when seccessfull
//     reject("promise rejected"); // when there is error
//   }, 2000);
// });

// myPromise
//   .then((response) => {
//     return console.log(response); // response is the value that return in resolve
//   })
//   .catch((error) => {
//     return console.log("there is an error in ur promise --> ", error); // error is the value that return in reject
//   });

// methode 02 (with callback function) :

function getData(myCallBackFunction) {
  setTimeout(() => {
    return myCallBackFunction(["KADIRI", "MARZOUG", "SIDQUI"]); // return the data in the settings of the callback function
  }, 2000);
}

getData((response) => {
  console.log(response);
});
