import { clsx } from "clsx";

export default function Header() {
	return (
		<div className={clsx("sticky top-0 w-full h-16 px-8 flex flex-row items-center justify-end",
			"bg-neutral-50 text-black border-b border-gray-900/20 shadow-2xl shadow-black")}
		>
			<div className={""}>login</div>
		</div>
	);
}
