import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export default function Footer() {
	return (
		<div className={cn(geistSans.variable, geistMono.variable,
			"py-6 px-10 border-t border-neutral-300/20 bg-neutral-900 font-[family-name:monospace]")}
		>
			© 2025, Tasko.
		</div>
	);
}
