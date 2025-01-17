import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, delay } from "@/lib/utils";
import React from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import useApi from "@/lib/api";

const FormSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username não pode ser vazio.",
        }),
        password: z.string().min(2, {
            message: "Senha não pode ser vazio.",
        }),
        repassword: z.string().min(2, {
            message: "Password não pode ser vazio.",
        }),
    })
    .superRefine(({ password, repassword }, ctx) => {
        if (password !== repassword) {
            ctx.addIssue({
                code: "custom",
                message: "As senhas não conicidem.",
                path: ["repassword"],
            });
        }
    });

export function RegisterForm({ className }: { className?: string }) {
    const { push } = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
            repassword: "",
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        await delay(1000);
        const api = useApi("/auth/register")();
        if (error) {
            toast({
                variant: "destructive",
                title: "Falha ao se registrar",
                description: error,
            });
            return;
        }

        toast({
            variant: "default",
            title: "Registro realizado com sucesso!",
            description: "Faça login para acessar sua conta.",
        });

        await push("/auth/login");
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
                <FormField
                    control={form.control}
                    name="repassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repeat password</FormLabel>
                            <FormControl>
                                <Input type={"password"} placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={"flex flex-row gap-6"}>
                    <Button
                        variant={"default"}
                        className={"w-full"}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader className={"animate-spin"} />}
                        Register
                    </Button>
                    <Button asChild variant={"link"} className={"w-full"} type="button">
                        <Link href={"/auth/login"}>Login</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
