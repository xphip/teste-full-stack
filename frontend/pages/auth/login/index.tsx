import Box from "@/components/box";
import { H1 } from "@/components/typography";
import { LoginForm } from "@/components/pages/auth/loginForm";
import { withNoLayout } from "@/lib/withNoLayout";
import { Separator } from "@/components/ui/separator";

export default withNoLayout(function Login() {
	return (
		<div className={"min-h-dvh w-full"}>
			<div className={"p-10"}>
				<Box className={"xl:w-[500px] mt-40 mx-auto px-12 py-6"}>
					<H1 className={"w-full text-center"}>Tasko</H1>
					<p className={"w-full text-center"}>Faça login para se conectar.</p>
					<Separator className={"my-6"}/>
					<LoginForm />
				</Box>
			</div>
		</div>
	);
});
