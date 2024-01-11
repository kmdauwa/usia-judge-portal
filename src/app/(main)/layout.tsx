import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/custom/navbar";
import {
	getUserType,
	getJudgeMajorCategory,
} from "@/lib/server-actions/user-actions";

interface LayoutProps {
	children: React.ReactNode;
	params: any;
}

interface User {
	email: string;
	id: string;
	// add more fields below based on the user data that is fetched from supabase client
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return; // user does not exist
	}

	const userType = await getUserType(user.id);
	const judgeCategory = await getJudgeMajorCategory(user.id);

	return (
		<div>
			<Navbar
				user={user as User}
				userType={userType}
				judgeCategory={judgeCategory}
			/>
			<div className="bg-slate-100">
				<div className="max-w-screen-lg min-h-screen items-center justify-between mx-auto p-10">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
