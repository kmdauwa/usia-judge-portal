import React from "react";
import artScoreSheet from "@/lib/score-sheets/art-gallery.json";
import filmScoreSheet from "@/lib/score-sheets/film-festival.json";
import performanceScoreSheet from "@/lib/score-sheets/performing-arts.json";

// JSON Schema for score sheet
interface ScoreSheet {
	topic: string;
	numOfCategories: number;
	subCategories: String[];
	questions: questionList[]; // Add this line
}

interface questionList {
	criteria: string;
	description: string[];
	maxCriteriaPoints: number;
}

const ScoreSheetInput = ({ category }: { category: string }) => {
	var data = {} as ScoreSheet;
	if (category == "art-gallery") {
		data = artScoreSheet as ScoreSheet;
	} else if (category == "film-festival") {
		data = filmScoreSheet as ScoreSheet;
	} else if (category == "performing-arts") {
		data = performanceScoreSheet as ScoreSheet;
	}

	const [error, setError] = React.useState("");
	

	const handlePointsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		
		let Points = (e.currentTarget.elements[0] as HTMLInputElement).value
	 
		console.log(Points);

		// Check if the points is valid
		// idea is to get each point element. Since we have to store each element
		if (Points.length === 0) {
			return setError("Please enter a value");
		}
		
	
		setError("");
	};

	return (
		<div>
			<h3 className="text-2xl m-4 text-center font-[500] uppercase text-orient">
				Scoring Criterias
			</h3>
			<form
				className="flex flex-col justify-center md:flex-row" id="pointsForm"
				onSubmit={(e) => handlePointsSubmit(e)}>
				<div className="flex flex-row flex-wrap p-4 justify-center items-stretch">
					{data?.questions?.map((question, index) => (
						<div
							className="flex flex-col md:w-2/5 p-8 m-2 bg-slate-200 rounded-lg shadow-sm"
							key={index}>
							<div className="flex flex-col justify-center md:flex-row">
								<p className="text-lg mb-1 italic font-[500] text-center">
									{question.criteria}
								</p>
							</div>
							<div className="flex flex-col justify-center md:flex-row">
								<div className="text-center">
									{question.description.map((desc, index) => (
										<div key={index}>
											<p>{desc}</p>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col justify-center mt-1 md:flex-row h-full justify-self-end">
							<input
									className="md:w-1/2 mx-4 md:m-4 p-2 tracking-wider text-center border-2 border-slate-700 rounded-md [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
									type="text"
									placeholder="Points"
									name={question.criteria}
							/>
							</div>
							{error && (
								<div className="flex flex-col justify-center md:flex-row">
									<p className="text-red-500 text-center">{error}</p>
								</div>
							)}
							<div className="flex flex-col justify-center mt-1 md:flex-row h-full justify-self-end">
								<p className="text-center mt-auto">
									Max Points:{" "}
									<span className="text-orient">
										{question.maxCriteriaPoints}
									</span>
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="text-md m-4 text-center font-[500] uppercase text-orient">
				Max Points: 80
				</div>
				<div className="flex flex-row flex-wrap p-4 justify-center items-stretch">
				<button
					type="submit"
					className="flex flex-col justify-center bg-slate-700 text-white rounded-md p-2 px-4 m-4 md:mx-0">
					Submit
				</button>
				</div>
			</form>
			<br></br>
		</div>
	);
};

export default ScoreSheetInput;
