import Box from "@/components/box";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import dayjs from "dayjs";
import { FormCreate } from "@/components/pages/tasks/FormCreate";
import { Separator } from "@/components/ui/separator";
import { TableRow, TasksTable, TasksTablePagination } from "@/components/pages/listTasks";


function fakeData(): Array<TableRow> {
	const data = [...new Array(10).keys().map((i) => (
		{
			id: i,
			title: "Titulo teste",
			description: "Descricao teste",
			createdAt: dayjs(new Date().getTime()).format("DD/MM/YYYY")
		} as TableRow
	))];
	return data satisfies Array<TableRow>;
}

export default function Tasks() {
	return (
		<>
			<div className={"flex flex-row items-center justify-between"}>
				<H1>Gerenciador de Tasks</H1>
				<Sheet>
					<Button asChild variant="default">
						<SheetTrigger>
							<Plus />
							Criar task
						</SheetTrigger>
					</Button>
					<SheetContent className={"overflow-y-auto"}>
						<SheetHeader>
							<SheetTitle className={"uppercase"}>Criar nova task</SheetTitle>
							<SheetDescription></SheetDescription>
						</SheetHeader>

						<Separator className={"my-4"} />

						<FormCreate />
					</SheetContent>
				</Sheet>
			</div>

			<Box>
				<TasksTable rows={fakeData()} />
				<Separator className={"my-4"} />
				<TasksTablePagination />
			</Box>
		</>
	);
}

