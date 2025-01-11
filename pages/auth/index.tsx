import { useRouter } from "next/router";
import { useEffect } from "react";
import { withNoLayout } from "@/lib/withNoLayout";

export default withNoLayout(function Auth() {
	const { push } = useRouter();

	useEffect(() => {
		push("/auth/login");
	});

	return null;
});
