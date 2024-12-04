const start = Date.now();
let count = 0;

const clock = function () {
	const cur = new Date(start + 1000 * count);
	console.clear();
	console.log(cur.toLocaleTimeString("en-GB"));
	console.log(
		cur.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})
	);
	count++;
	setTimeout(clock, 1000);
};

clock();
