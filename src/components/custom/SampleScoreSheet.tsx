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

const SampleScoreSheet = ({ category }: { category: string }) => {
	var data = {} as ScoreSheet;
	if (category == "art-gallery") {
		data = artScoreSheet as ScoreSheet;
	} else if (category == "film-festival") {
		data = filmScoreSheet as ScoreSheet;
	} else if (category == "performing-arts") {
		data = performanceScoreSheet as ScoreSheet;
	}

	return (
		<div>
			<h3 className="text-xl m-4 text-center font-[500] uppercase text-orient">
				Sample Score Sheet
			</h3>
			<div>
				{data?.questions?.map((question, index) => (
					<div key={index}>
						<div className="flex flex-col justify-center md:flex-row">
							<p className="text-lg italic font-[500] text-center">
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
						<div className="flex flex-col justify-center md:flex-row">
							<p className="text-center">
								Max Points: {question.maxCriteriaPoints}
							</p>
						</div>
						<br></br>
					</div>
				))}
			</div>
			<div className="text-md m-4 text-center font-[500] uppercase text-orient">
				Max Points: 80
			</div>
			<br></br>
		</div>
	);
};

export default SampleScoreSheet;
