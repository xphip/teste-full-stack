import { Geist, Geist_Mono } from "next/font/google";
import { clsx } from "clsx";
import { ReactNode } from "react";
import Body from "@/theme/body";
import SideMenu from "@/theme/sideMenu";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className={clsx(geistSans.variable, geistMono.variable,
			"relative min-h-dvh grid md:grid-cols-[16rem_1fr] grid-cols-[0rem_1fr] leading-none font-[family-name:var(--font-geist-sans)]")}
		>
			<SideMenu/>
			<Body>
				{children}
			</Body>
		</div>
	);
}
