import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import artScoreSheet from "@/lib/score-sheets/art-gallery.json";

// JSON Schema for score sheet
interface ScoreSheet {
	topic: string;
	numOfCategories: number;
	subCategories: subCategoriesList[];
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
	}

	return (
		<div>
			<h3 className="text-xl m-4 text-center font-[500] uppercase text-orient">
				Sample Score Sheet (by Categories)
			</h3>
			<Accordion type="multiple">
				{data?.subCategories?.map((subCategory, index) => (
					<AccordionItem value={"item-" + index}>
						<AccordionTrigger className="text-lg font-[400] text-slate-700">
							{subCategory?.subcategoryTitle}
						</AccordionTrigger>
						<AccordionContent>
							<ul className="px-4">
								{subCategory?.questions.map(
									(question, index) => (
										<li key={index}>
											<p className="text-[1rem] font-[500] italic">
												{`${question.criteria} (${question.maxCriteriaPoints} points)`}
											</p>
											<ul className="ml-4 mb-2 text-slate-600 tracking-wide">
												{question.description.map(
													(description, index) => (
														<li
															className="py-1"
															key={index}>
															{description}
														</li>
													)
												)}
											</ul>
										</li>
									)
								)}
							</ul>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<br></br>
		</div>
	);
};

export default SampleScoreSheet;
