"use client";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";

const Categories = ["art-gallery", "films", "performing-arts"];

const TopicPage = ({ params }: { params: { category: string } }) => {
	const router = useRouter();

	// Add a global route guard
	useEffect(() => {
		if (!Categories.includes(params.category)) {
			// Redirect or handle unauthorized access
			console.log(params.category);
			router.push("/home");
		}
	}, [params.category, router]);

	if (!Categories.includes(params.category)) return;

	return <div>{params.category} page</div>;
};

export default TopicPage;
