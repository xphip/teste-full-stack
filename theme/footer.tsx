import { clsx } from "clsx";
import { Geist, Geist_Mono } from "next/font/google";

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
		<div className={clsx(geistSans.variable, geistMono.variable,
			"py-6 px-10 border-t border-neutral-300/20 bg-neutral-900 font-[family-name:monospace]")}
		>
			© 2025, Tasko.
		</div>
	);
}
