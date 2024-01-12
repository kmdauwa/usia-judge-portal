import React, { useEffect, useState } from "react";
import artScoreSheet from "@/lib/score-sheets/art-gallery.json";
import filmScoreSheet from "@/lib/score-sheets/film-festival.json";
import performanceScoreSheet from "@/lib/score-sheets/performing-arts.json";
import { set } from "zod";

// JSON Schema for score sheet
interface ScoreSheet {
	topic: string;
	numOfCategories: number;
	subCategories: subCategoriesList[];
	maxPoints: number;
}

interface subCategoriesList {
	subcategoryTitle: string;
	questions: questionList[];
	maxPoints: number;
}

interface questionList {
	criteria: string;
	description: string[];
	maxCriteriaPoints: number;
}

const ScoreSheetInput = ({
	category,
	setIdSubmitted,
}: {
	category: string;
	setIdSubmitted: any;
}) => {
	var data = {} as ScoreSheet;
	if (category == "art-gallery") {
		data = artScoreSheet as ScoreSheet;
	} else if (category == "film-festival") {
		data = filmScoreSheet as ScoreSheet;
	} else if (category == "performing-arts") {
		data = performanceScoreSheet as ScoreSheet;
	}

	// TODO: Adjust the index of the subcategory and questions based on the category
	let criterias = data.subCategories[0].questions;

	const [error, setError] = useState("");
	const [finalScore, setFinalScore] = useState(0);
	const [submitBtnClicked, setSubmitBtnClicked] = useState(false);

	const onScoreChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		let maxPoints = criterias[index].maxCriteriaPoints;
		let points = e.target.value;

		// Empty validation
		if (points == "") {
			return setError("Please fill in all the fields");
		}

		// Integer validation
		let inputPoints = parseInt(points);

		if (inputPoints > maxPoints) {
			return setError(
				"Points cannot be greater than max points for the criteria: " +
					criterias[index].criteria
			);
		}

		if (inputPoints < 0) {
			return setError(
				"Points cannot be less than 0 for the criteria: " +
					criterias[index].criteria
			);
		}

		setError("");
	};

	const handlePointsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (error) {
			return;
		}

		// customize error based on input of points in each category
		for (let i = 0; i < criterias.length; i++) {
			let maxPoints = criterias[i].maxCriteriaPoints;
			let points = (e.currentTarget.elements[i] as HTMLInputElement)
				.value;

			// Integer validation
			let inputPoints = parseInt(points);

			// Empty validation
			if (points == "") {
				return setError("Please fill in all the fields");
			}

			// TODO: Update the scores database based on the criteria points from the form
			// Add database func logic here

			// Final score calculation
			setFinalScore((prev) => prev + inputPoints);
		}

		// Prevent multiple submissions
		setSubmitBtnClicked(true);

		setError("");
	};

	return (
		<div>
			<h3 className="text-2xl m-4 text-center font-[500] uppercase text-orient">
				Scoring Piece #{/* Add piece number here */}
			</h3>
			<div className="text-xl m-2 text-center font-[400] text-orient">
				<div>Piece Title - Starry Night of Devotion</div>
				<div>Subcategory - Painting</div>
			</div>
			<form
				className="flex flex-col justify-center"
				id="pointsForm"
				onSubmit={(e) => handlePointsSubmit(e)}>
				<div className="flex flex-row flex-wrap p-4 justify-center items-stretch">
					{data?.subCategories[0].questions?.map(
						(question, index) => (
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
										{question.description.map(
											(desc, index) => (
												<div
													key={index}
													className="py-1">
													<p>{desc}</p>
												</div>
											)
										)}
									</div>
								</div>
								<div className="flex flex-col justify-center items-center mt-1 md:flex-row h-full justify-self-end">
									<input
										className="w-1/2 m-2 md:m-4 p-2 tracking-wider text-center border-2 border-slate-700 rounded-md [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
										type="number"
										placeholder="Points"
										name={question.criteria}
										onChange={(e) =>
											onScoreChange(e, index)
										}
									/>
								</div>

								<div className="flex flex-col justify-center mt-1 md:flex-row h-full justify-self-end">
									<p className="text-center mt-auto">
										Max Points:{" "}
										<span className="text-orient">
											{question.maxCriteriaPoints}
										</span>
									</p>
								</div>
							</div>
						)
					)}
				</div>
				<div className="text-lg m-4 text-center font-[500] uppercase text-orient">
					Final Score:
					<span className="mx-2">
						{finalScore} / {data.subCategories[0].maxPoints}
					</span>
				</div>
				{error && (
					<div className="flex flex-row justify-center">
						<p className="bg-red-100 p-4 rounded-lg text-red-500 text-center w-1/2">
							{error}
						</p>
					</div>
				)}
				<div className="flex flex-row flex-wrap p-4 my-4 justify-center items-stretch">
					<button
						type="button"
						onClick={() => setIdSubmitted()}
						className="flex flex-col justify-center bg-red-500 tracking-wide text-white rounded-md p-2 px-4 mr-4">
						Cancel
					</button>
					<button
						type="submit"
						disabled={submitBtnClicked}
						className="flex flex-col justify-center bg-slate-700 tracking-wide disabled:bg-slate-400 text-white rounded-md p-2 px-4 m md:mx-0">
						{submitBtnClicked ? "Submitting..." : "Submit Scores"}
					</button>
				</div>
			</form>
			<br></br>
		</div>
	);
};

export default ScoreSheetInput;
