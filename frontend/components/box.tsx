import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BoxProps {
	children: ReactNode;
	className?: string;
	title?: string | React.FC;
	description?: string | React.FC;
}

export default function Box({ children, className, title: Title, description: Description }: BoxProps) {
	return (
		<div className={cn("w-full my-4 flex flex-col justify-start", className,
			"rounded border border-neutral-300/20 bg-neutral-900/50",
			className)}
		>
			<div className={cn({"p-6 border-b border-neutral-300/20": Title || Description})}>
				{Title && <div className={"leading-6 text-white"}>
					{typeof Title === "string" ? Title : <Title />}
				</div>}
				{Description && <div className={"leading-5 text-white/60"}>
					{typeof Description === "string" ? Description : <Description />}
				</div>}
			</div>
			<div className={"p-6"}>
				{children}
			</div>
		</div>
	);
}
