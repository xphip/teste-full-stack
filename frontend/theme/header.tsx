import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
	return (
		<div className={cn("sticky top-0 z-10 w-full h-16 px-8 flex flex-row items-center justify-end",
			"bg-neutral-50 text-black border-b border-gray-900/20 shadow-2xl shadow-black")}
		>
			<Button asChild variant={"secondary"}>
				<Link href="/auth/login">Logout</Link>
			</Button>
		</div>
	);
}
