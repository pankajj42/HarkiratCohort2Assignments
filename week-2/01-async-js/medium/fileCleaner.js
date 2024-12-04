const fs = require("fs/promises");

const main = async function () {
	let fileHandle;
	const line = "-".repeat(20) + "\n";
	try {
		fileHandle = await fs.open("cleanFile.txt", "r+");
		console.log(`File Opened fd=${fileHandle.fd}`);
		const data = await fileHandle.readFile("utf-8");
		await fileHandle.truncate();
		await fileHandle.sync();
		console.log(`Data From File\n ${line + data + "\n " + line}`);
		const newData = data
			.split("\n")
			.map((line) =>
				line
					.trim()
					.split(" ")
					.filter((data) => data)
					.join(" ")
			)
			.filter((data) => data)
			.join("\n");
		console.log(`New Data To File\n ${line + newData + "\n " + line}`);
		await fileHandle.write(newData, 0, "utf-8");
	} catch (err) {
		console.log(`Error:${err}`);
	} finally {
		await fileHandle?.close();
	}
};

main();
