import React, { useState } from "react";
import { XYPlot, RadialChart, DiscreteColorLegend } from "react-vis";
import "react-vis/dist/style.css";

const ExpenseTracker = () => {
	const [expenses, setExpenses] = useState([]);
	const [expenseName, setExpenseName] = useState("");
	const [expenseValue, setExpenseValue] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Food");
	const [income, setIncome] = useState(null);
	const categories = [
		"Food",
		"Living expenses",
		"Misc",
		"Health expenses",
		"Transportation",
		"Fees",
	];

	const handleAddExpense = () => {
		if (expenseName && expenseValue) {
			const newExpense = {
				category: selectedCategory,
				name: expenseName,
				value: parseFloat(expenseValue),
			};
			setExpenses([...expenses, newExpense]);
			setExpenseName("");
			setExpenseValue("");
		}
	};

	const handleEditExpense = (index) => {
		const updatedExpenses = [...expenses];
		const newName = prompt("Enter new name:");
		const newValue = prompt("Enter new value:");

		if (newName !== null && newValue !== null) {
			updatedExpenses[index] = {
				...updatedExpenses[index],
				name: newName,
				value: parseFloat(newValue),
			};
			setExpenses(updatedExpenses);
		}
	};

	const handleDeleteExpense = (category, index) => {
		const updatedExpenses = expenses.filter(
			(expense) =>
				!(
					expense.category === category &&
					expenses.indexOf(expense) === index
				)
		);
		setExpenses(updatedExpenses);
	};

	const categoryTotals = categories.map((category) => {
		const totalValue = expenses
			.filter((expense) => expense.category === category)
			.reduce((acc, expense) => acc + expense.value, 0);

		return { category, totalValue };
	});

	// Define a color palette for each category
	const colorPalette = [
		"#FF5733",
		"#33FF57",
		"#5733FF",
		"#FF33D1",
		"#D1FF33",
		"#33D1FF",
	];

	// Calculate the total expenditure for all categories
	const totalExpenditure = categoryTotals.reduce(
		(acc, category) => acc + category.totalValue,
		0
	);

	return (
		<>
			<h1 className="text-6xl text-center font-mono mt-2">
				Income Expense Tracker
			</h1>

			<div className="flex flex-row justify-between mt-10">
				<div className="flex flex-row">
					<div className="p-4 pl-44">
						{/* Radial Chart */}
						<RadialChart
							data={categoryTotals.map((item, index) => ({
								angle: item.totalValue,
								label: item.category,
								color: colorPalette[index],
							}))}
							width={300}
							height={300}
							className="pl-20"
						/>
						<DiscreteColorLegend
							items={categoryTotals.map((item, index) => ({
								title: item.category,
								color: colorPalette[index],
							}))}
							orientation="horizontal"
						/>
					</div>
					<div className="flex flex-col mt-20">
						<h1 className="text-2xl mt-4 text-center">
							Total Expenditure: ₹{totalExpenditure}
						</h1>
						<h1 className="text-2xl mt-4 text-center">
							Saving: ₹{income - totalExpenditure}
						</h1>
					</div>
				</div>
				<div>
					<div className="flex-1 p-4">
						{/* Expense entry section */}
						<div>
							<input
								type="number"
								placeholder="Income"
								value={income}
								onChange={(e) => setIncome(e.target.value)}
								className="p-2 border border-gray-300 w-48"
							/>
							<button className="ml-2 p-2 bg-blue-400 active:bg-blue-600">
								SET
							</button>
						</div>
						<div className="mb-2 mt-2">
							<input
								type="text"
								placeholder="Expense Name"
								value={expenseName}
								onChange={(e) => setExpenseName(e.target.value)}
								className="p-2 border border-gray-300"
							/>
						</div>
						<div className="mb-2">
							<input
								type="number"
								placeholder="Expense Value"
								value={expenseValue}
								onChange={(e) =>
									setExpenseValue(e.target.value)
								}
								className="p-2 border border-gray-300"
							/>
						</div>
						<div className="flex items-center mb-2">
							<select
								value={selectedCategory}
								onChange={(e) =>
									setSelectedCategory(e.target.value)
								}
								className="p-2 border border-gray-300 mr-2"
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
							<button
								onClick={handleAddExpense}
								className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
							>
								Add Expense
							</button>
						</div>
					</div>
					<div className="flex-1 p-4 border-2 border-black mr-4">
						{/* List of entered expenses */}
						{categories.map((category) => (
							<div key={category}>
								<h2 className="text-lg font-bold mb-2">
									{category}
								</h2>
								{expenses
									.filter(
										(expense) =>
											expense.category === category
									)
									.map((expense, index) => (
										<div
											key={index}
											className="flex justify-between mb-2 p-2 border border-gray-300 rounded"
										>
											<div>
												{expense.name}: ₹{expense.value}
											</div>
											<div>
												<button
													onClick={() =>
														handleEditExpense(
															expenses.indexOf(
																expense
															)
														)
													}
													className="text-blue-500 mr-2 hover:text-blue-700"
												>
													Edit
												</button>
												<button
													onClick={() =>
														handleDeleteExpense(
															category,
															expenses.indexOf(
																expense
															)
														)
													}
													className="text-red-500 hover:text-red-700"
												>
													Delete
												</button>
											</div>
										</div>
									))}
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Display total expenditure */}
		</>
	);
};

export default ExpenseTracker;
