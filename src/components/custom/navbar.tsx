"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "../../../public/gef2024logo.png";
import Image from "next/image";
import { actionSignOutUser } from "@/lib/server-actions/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { getUserType } from "@/lib/server-actions/user-actions";

interface User {
	name: string;
	email: string;
	id: string;
	// add more fields below based on the user data that is fetched from supabase client
}

const NavbarUI: React.FC<{ user: User }> = ({ user }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [userType, setUserType] = useState("");

	const handleSignOut = async () => {
		const { error } = await actionSignOutUser();
		if (error) {
			console.log("Error signing out:", error.message);
		} else {
			// redirect to home page
			router.push("/login");
		}
	};

	useEffect(() => {
		// console.log(user.id);
		getUserType(user.id).then((data) => {
			setUserType(data);
		});
	}, [user]);

	return (
		<div className="sticky top-0 bg-white">
			<Navbar
				fluid
				rounded
				className="max-w-screen-lg items-center justify-between mx-auto p-5">
				<Navbar.Brand href="/home">
					<Image
						className="mx-3"
						src={Logo}
						height={50}
						alt="GE Festival Logo"
					/>
					<span className="self-center text-2xl font-[500] whitespace-nowrap dark:text-white">
						USIA Judge Portal
					</span>
				</Navbar.Brand>
				<div className="flex md:order-2">
					<Dropdown
						arrowIcon={false}
						inline
						label={
							<Avatar
								alt="User settings"
								img="https://img.icons8.com/material/96/user-male-circle--v1.png"
								rounded
							/>
						}>
						<Dropdown.Header>
							<span className="block text-sm">{user.name}</span>
							<span className="block truncate text-sm font-medium">
								{user.email}
							</span>
						</Dropdown.Header>
						{userType != "judge" && (
							<>
								<Dropdown.Item>Dashboard</Dropdown.Item>
								<Dropdown.Item>Settings</Dropdown.Item>
								<Dropdown.Item>Earnings</Dropdown.Item>
								<Dropdown.Divider />
							</>
						)}
						<Dropdown.Item
							onClick={() => handleSignOut()}
							className="text-red-500">
							Sign out
						</Dropdown.Item>
					</Dropdown>
					<Navbar.Toggle />
				</div>
				<Navbar.Collapse>
					<Navbar.Link
						className="tracking-wide text-[1rem]"
						active={pathname === "/home"}
						href="/home">
						Home
					</Navbar.Link>
					<Navbar.Link
						className="tracking-wide text-[1rem]"
						active={pathname.includes("/art-gallery")}
						href="/art-gallery">
						Art Gallery
					</Navbar.Link>
					<Navbar.Link
						className="tracking-wide text-[1rem]"
						active={pathname.includes("/film-festival")}
						href="/film-festival">
						Film Festival
					</Navbar.Link>
					<Navbar.Link
						className="tracking-wide text-[1rem]"
						active={pathname.includes("/performing-arts")}
						href="/performing-arts">
						Performing Arts
					</Navbar.Link>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavbarUI;
