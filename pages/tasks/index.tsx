import Box from "@/components/box";
import { H1 } from "@/components/typography";
import Button from "@/components/button";

export default function Tasks() {
	return (
		<div className="">
			<div className={"flex flex-row items-center justify-between"}>
				<H1>Gerenciador de Tasks</H1>
				<Button>Criar nova task</Button>
			</div>
			<Box>
				<div>filtro</div>
				<div>table</div>
			</Box>
		</div>
	);
}
