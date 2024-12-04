/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
	return new Promise((resolve, reject) => {
		if (typeof n !== "number" || n < 0) reject("Invalid Input Time");
		else setTimeout(resolve, n * 1000);
	});
}

module.exports = wait;
