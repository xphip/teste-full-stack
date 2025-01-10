import { clsx } from "clsx";
import { MenuButtom } from "@/components/sideMenuComponents";

export default function SideMenu({ className }: { className?: string }) {
	return (
		<div className={clsx("sticky top-0 h-dvh overflow-hidden",
			"border-r border-neutral-950/30 shadow shadow-black bg-neutral-900",
			className)}>
			<div className={"mt-16 pt-8 p-3 space-y-2"}>
				<MenuButtom href="/dashboard">Dashboard</MenuButtom>
				<MenuButtom href="/tasks">Tarefas</MenuButtom>
			</div>
		</div>
	);
}
