import React from "react";
import artScoreSheet from "@/lib/score-sheets/art-gallery.json";
import filmScoreSheet from "@/lib/score-sheets/film-festival.json";
import performanceScoreSheet from "@/lib/score-sheets/performing-arts.json";

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
			<h3 className="text-2xl m-4 text-center font-[500] uppercase text-orient">
				Scoring Criterias
			</h3>
			<div className="flex flex-row flex-wrap p-4 justify-center items-stretch">
				{data?.subCategories[0]?.questions?.map((question, index) => (
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
									<div key={index} className="py-2">
										<p>{desc}</p>
									</div>
								))}
							</div>
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
				))}
			</div>
			<div className="text-md m-4 text-center font-[500] uppercase text-orient">
				Max Points: {data.subCategories[0].maxPoints}
			</div>
			<br></br>
		</div>
	);
};

export default SampleScoreSheet;
