import { ReactNode } from "react";
import Footer from "@/theme/footer";
import Header from "@/theme/header";

export default function Body({ children }: { children: ReactNode }) {
	return (
		<div className={"bg-black"}>
			<div className={"min-h-dvh"}>
				<Header />
				<div className={"w-[900px] mx-auto py-8"}>
					{children}
				</div>
			</div>
			<Footer />
		</div>
	);
}
