/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait(t) {
	return new Promise((resolve, reject) => {
		if (typeof t !== "number" || t < 0) reject("Invalid Input Time");
		else setTimeout(resolve, t * 1000);
	});
}

// function wait2(t) {}

// function wait3(t) {}

async function calculateTime(t1, t2, t3) {
	const start = Date.now();
	let time = 0;
	await wait(t1)
		.then(() => wait(t2))
		.then(() => wait(t3))
		.catch(() => {
			console.log("Error In Promise Chain Execution");
			time = -1;
		})
		.finally(() => {
			time = Date.now() - start;
		});
	return time;
}

module.exports = calculateTime;
