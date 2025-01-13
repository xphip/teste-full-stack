import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MenuButtom({ href, children }: { href: string, children: React.ReactNode }) {
	return (
		<Link href={href}
			  className={cn("block px-3 py-2 hover:underline rounded  bg-neutral-950 hover:bg-neutral-800")}>
			{children}
		</Link>
	);
}
