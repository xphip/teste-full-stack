import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { Loader } from "lucide-react";

const FormSchema = z.object({
	title: z.string().min(2, {
		message: "Título não pode ser vazio."
	}),
	description: z.string().min(2, {
		message: "Descrição não pode ser vazio."
	}),
	isCompleted: z.boolean({
		message: "Marca se a task já foi completada."
	})
});

export function FormCreate({ className }: { className?: string }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: "",
			description: "",
			isCompleted: false
		}
	});

	const isSubmitting = form.formState.isSubmitting;

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
				  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			)
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título</FormLabel>
							<FormControl>
								<Input type={"text"} placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Textarea placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="isCompleted"
					render={({ field }) => (
						<FormItem className={"flex flex-row items-center"}>
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className={"px-2 cursor-pointer"} style={{margin: 0}}>Marcar como completado.</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator className={"my-4"} />
				<Button variant={"default"} className={"w-full"} type="submit" disabled={isSubmitting}>
					{isSubmitting && (<Loader className={"animate-spin"} />)}
					Criar
				</Button>
			</form>
		</Form>
	);
}
