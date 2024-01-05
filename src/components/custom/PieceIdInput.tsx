import React from "react";

const PieceIdInput = ({ category }: { category: string }) => {
	const [error, setError] = React.useState("");

	// Route to the piece judging page if the ID is valid and exists in the database
	const handleIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let ID = (e.currentTarget.elements[0] as HTMLInputElement).value
			.toString()
			.trim();

		// Check if the ID is valid
		if (ID.length === 0) {
			return setError("Please enter an ID");
		}

		// Check if this judge has already judged this piece
		// TODO: ADD more database checks here

		setError("");
	};

	return (
		<div className="bg-slate-200 p-4 rounded-lg pb-10">
			<h3 className="text-xl m-4 text-center font-[500] uppercase text-orient">
				Enter the unique ID of the {category} piece you want to score:
			</h3>
			<form
				className="flex flex-col justify-center md:flex-row"
				onSubmit={(e) => handleIdSubmit(e)}>
				{" "}
				<input
					className="md:w-1/2 mx-4 md:m-4 p-2 tracking-wider text-center border-2 border-slate-700 rounded-md [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					type="text"
					placeholder="Enter Piece ID"
				/>
				<button
					type="submit"
					className="bg-slate-700 text-white rounded-md p-2 m-4 md:mx-0">
					Submit
				</button>
			</form>
			{error && (
				<div className="flex flex-col justify-center md:flex-row">
					<p className="text-red-500 text-center">{error}</p>
				</div>
			)}
		</div>
	);
};

export default PieceIdInput;
