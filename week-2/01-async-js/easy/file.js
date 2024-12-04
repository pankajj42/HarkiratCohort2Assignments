const fs = require("fs");

console.log("Start Reading File");
fs.readFile("3-read-from-file.md", "utf-8", (err, data) => {
	console.log(data);
	console.log("Finish Reading File");
});

console.log("Start Operation 1");
let cnt = 1;
for (let i = 0; i < 100000; i++) cnt++;
console.log("End Operation 1");

console.log("Writing to File");
fs.writeFile("write demo.txt", "Hello World Written", "utf-8", (err) => {
	if (err) throw err;
	console.log("File Written");
});

console.log("Start Operation 2");
cnt = 1;
for (let i = 0; i < 100000; i++) cnt++;
console.log("End Operation 2");
