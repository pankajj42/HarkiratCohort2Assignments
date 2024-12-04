/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
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
	await Promise.all([wait(t1), wait(t2), wait(t3)])
		.catch(() => {
			console.log("Error in Promise.all Reolution");
			time = -1;
		})
		.finally(() => {
			time = Date.now() - start;
		});
	return time;
}

module.exports = calculateTime;
