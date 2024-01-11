"use client";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScoreSheetInput from "@/components/custom/ScoreSheetInput";
import PieceIdInput from "@/components/custom/PieceIdInput";

const Categories = ["art-gallery", "film-festival", "performing-arts"];

const TopicPage = ({ params }: { params: { category: string } }) => {
	const router = useRouter();

	// Add a global route guard
	useEffect(() => {
		if (!Categories.includes(params.category)) {
			// Redirect or handle unauthorized access
			//console.log(params.category);
			router.push("/home");
		}
	}, [params.category, router]);

	if (!Categories.includes(params.category)) return;

	return (
		<div>
			<PieceIdInput category={params.category} />
			<br></br>
			<br></br>
			<ScoreSheetInput category={params.category} />
		</div>
	);
};

export default TopicPage;
