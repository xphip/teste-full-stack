import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function H1({children, className}: {children: ReactNode, className?: string}): ReactNode {
	return (
		<h1 className={cn("text-3xl mb-8 font-semibold break-words", className)}>
			{children}
		</h1>
	);
}
