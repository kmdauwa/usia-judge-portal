import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

import { cookies } from "next/headers";

const HomePage = async () => {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return;

	return (
		<div>
			<div className="">
				<h3 className="text-xl m-4 text-center font-[500] uppercase text-orient">
					Judging History
				</h3>
				<div className="bg-slate-200 p-4 m-2 rounded-lg flex flex-row justify-around">
					<div>ID: 342024</div>
					<div>Category: Art Gallery</div>
					<div>Subcategory: Photography</div>
					<div>Score: 70/80</div>
				</div>
				<div className="bg-slate-200 p-4 m-2 rounded-lg flex flex-row justify-around">
					<div>ID: 473239</div>
					<div>Category: Films</div>
					<div>Subcategory: Reels</div>
					<div>Score: 90/100</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
