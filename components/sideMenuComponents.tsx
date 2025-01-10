import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export function MenuButtom({ href, children }: { href: string, children: React.ReactNode }) {
	return (
		<Link href={href}
			  className={clsx("block px-3 py-2 hover:underline rounded  bg-neutral-950 hover:bg-neutral-800")}>
			{children}
		</Link>
	);
}
