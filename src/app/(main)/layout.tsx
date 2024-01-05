import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/custom/Navbar";

interface LayoutProps {
	children: React.ReactNode;
	params: any;
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div>
			<Navbar user={user || Object()} />
			<div className="bg-slate-100">
				<div className="max-w-screen-lg min-h-screen items-center justify-between mx-auto p-10">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
