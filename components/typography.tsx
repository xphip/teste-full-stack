import { ReactNode } from "react";

export function H1({children}: {children: ReactNode}) {
	return (
		<h1 className={"text-3xl mb-8 font-semibold break-words"}>
			{children}
		</h1>
	);
}
