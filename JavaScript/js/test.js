// var count = 0
// function foo(x) {
//     x += 1
//     console.log(x)
// }
// foo(count)
// foo(count)

// console.log(1);

// setTimeout(() => {
//   console.log(2);
//   setTimeout(() => {
//     console.log(3);
//     setTimeout(() => {
//       console.log(4);
//     }, 0) ;
//   }, 0) ;
// }, 0);

// setTimeout(() => {
//   console.log(5);
//   setTimeout(() => {
//     console.log(6);
//   }, 0);
// }, 0);

// console.log('ok'); // 1 ok 2 5 3 6 4


console.log(1);
    
setTimeout(() => {
  console.log('setTimeout');
}, 0);

let promise = new Promise(resolve => {
  console.log(3);
  resolve();
}).then(data => {
  console.log(100);
}).then(data => {
  console.log(200);
});
   
console.log(2);