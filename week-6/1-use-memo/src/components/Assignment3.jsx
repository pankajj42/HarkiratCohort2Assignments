import React, { useState, useMemo } from "react";
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
	const [items, setItems] = useState([
		{ name: "Chocolates", value: 10 },
		{ name: "Chips", value: 20 },
		{ name: "Onion", value: 30 },
		{ name: "Tomato", value: 30 },
		// Add more items as needed
	]);

	// Your code starts here
	const totalValue = useMemo(() => {
		console.log("Recalculating Total Value");
		return items.reduce(({ value: v1 }, { value: v2 }) => {
			return { value: v1 + v2 };
		}).value;
	}, [items]);
	// Your code ends here
	return (
		<div>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						{item.name} - Price: $
						<input
							id={index}
							type="number"
							value={item.value}
							onChange={(e) => {
								items[e.target.id].value = parseInt(
									e.target.value
								);
								setItems([...items]);
							}}
						></input>
					</li>
				))}
			</ul>
			<p>Total Value: {totalValue}</p>
		</div>
	);
};
