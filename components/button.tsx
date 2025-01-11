import { ReactNode } from "react";

export default function Button({children}: {children: ReactNode}) {
	return (
		<button className={"p-2 bg-gray-300 text-black rounded"}>{children}</button>
	);
}
