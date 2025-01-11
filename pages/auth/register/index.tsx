import Box from "@/components/box";
import { H1 } from "@/components/typography";
import { withNoLayout } from "@/lib/withNoLayout";
import { RegisterForm } from "@/components/pages/auth/registerForm";
import { Separator } from "@/components/ui/separator";

export default withNoLayout(function Register() {
	return (
		<div className={"min-h-dvh w-full"}>
			<div className={"p-10"}>
				<Box className={"xl:w-[500px] mt-40 mx-auto px-12 py-6"}>
					<H1 className={"w-full text-center"}>Tasko</H1>
					<p className={"w-full text-center"}>Crie sua conta para se conectar.</p>
					<Separator className={"my-6"}/>
					<RegisterForm />
				</Box>
			</div>
		</div>
	);
});
