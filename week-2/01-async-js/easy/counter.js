// let count = 1;
// setInterval(function () {
// 	console.log(count++);
// }, 1000);

// Without using setInterval

let count = 0;
const counter = function () {
	console.log(count++);
	setTimeout(counter, 1000);
};
counter();
