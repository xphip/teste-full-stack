import { MouseEvent, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
	Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { NotebookPen, Trash } from "lucide-react";
import Link from "next/link";

export interface TableRow {
	id: number;
	title: string;
	description: string;
	createdAt: string;
}

export function TasksTable({ rows }: { rows: Array<TableRow> }) {
	return (
		<Table className={"table-fixed w-full"}>
			<TableHeader className={"hover:bg-transparent pointer-events-none"}>
				<TableRow>
					<TableHead className={"w-1/12"}>ID</TableHead>
					<TableHead className={"w-3/12"} align="left">Title</TableHead>
					<TableHead className={"w-4/12"} align="left">Description</TableHead>
					<TableHead className="w-2/12" align="left">Created At</TableHead>
					<TableHead className={"w-2/12 text-right"} align={"right"}>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.length > 0 && rows.map((row) =>
					<TableRow key={row.id} className={"w-full hover:bg-neutral-900"}>
						<TableCell className={"truncate font-medium"}>{row.id}</TableCell>
						<TableCell className={"truncate"}>{row.title}</TableCell>
						<TableCell className={"truncate"}>{row.description}</TableCell>
						<TableCell className={"truncate"}>{row.createdAt}</TableCell>
						<TableCell className={"flex flex-row-reverse gap-4"} align={"right"}>
							<Link className={"p-1"} href={"/"}> <Trash size={"15"} /></Link>
							<Link className={"p-1"} href={"/"}> <NotebookPen size={"15"} /></Link>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

export function TasksTablePagination() {
	function handlePagination(event: MouseEvent, page: number) {
		event.preventDefault();
		setPagination(old => {
			const newPage = old + page;
			if (newPage < 1) return old;
			return newPage;
		});
	}

	const [pagination, setPagination] = useState<number>(1);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" onClick={(e) => handlePagination(e, -1)} />
				</PaginationItem>

				<PaginationItem>
					<PaginationLink href="#" onClick={(e) => e.preventDefault()}>{pagination}</PaginationLink>
				</PaginationItem>

				<PaginationItem>
					<PaginationNext href="#" onClick={(e) => handlePagination(e, 1)} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
