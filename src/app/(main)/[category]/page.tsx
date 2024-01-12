"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ScoreSheetInput from "@/components/custom/ScoreSheetInput";
import PieceIdInput from "@/components/custom/PieceIdInput";
import SampleScoreSheet from "@/components/custom/SampleScoreSheet";

const Categories = ["art-gallery", "film-festival", "performing-arts"];

const TopicPage = ({ params }: { params: { category: string } }) => {
	const router = useRouter();
	const [idSubmitted, setIdSubmitted] = useState();

	// Add a global route guard
	useEffect(() => {
		if (!Categories.includes(params.category)) {
			// Redirect or handle unauthorized access
			//console.log(params.category);
			router.push("/home");
		}
	}, [params.category, router]);

	if (!Categories.includes(params.category)) return;

	useEffect(() => {
		if (idSubmitted) {
			// TODO: Pull info about this piece from the database & pass it to the score sheet input
		}
	}, [idSubmitted]);

	return (
		<div>
			{!idSubmitted ? (
				<>
					<PieceIdInput
						category={params.category}
						setIdSubmitted={setIdSubmitted}
					/>
					<br></br>
					<br></br>
					<SampleScoreSheet category={params.category} />
				</>
			) : (
				<ScoreSheetInput
					setIdSubmitted={setIdSubmitted}
					category={params.category}
				/>
			)}
		</div>
	);
};

export default TopicPage;
