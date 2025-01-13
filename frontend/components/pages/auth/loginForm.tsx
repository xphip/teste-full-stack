import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Título não pode ser vazio."
	}),
	password: z.string().min(2, {
		message: "Descrição não pode ser vazio."
	})
});

export function LoginForm({ className }: { className?: string }) {
	const { push } = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: ""
		}
	});

	const isSubmitting = form.formState.isSubmitting;

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await new Promise(resolve => setTimeout(resolve, 1000));

		toast({
			variant: "default",
			description: "Seja bem vindo."
		});

		await push("/dashboard");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input type={"text"} placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type={"password"} placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className={"flex flex-row gap-6"}>
					<Button variant={"default"} className={"w-full"} type="submit" disabled={isSubmitting}>
						{isSubmitting && (<Loader className={"animate-spin"} />)}
						Login
					</Button>
					<Button asChild variant={"link"} className={"w-full"} type="button">
						<Link href={"/auth/register"}>Register</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
