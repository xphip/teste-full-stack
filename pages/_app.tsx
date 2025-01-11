import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/theme/layout";
import { Toaster } from "@/components/ui/toaster";
import { ReactElement } from "react";
import { AppPropsWithLayout } from "@/lib/withNoLayout";


function DefaultLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	);
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ?? DefaultLayout;

	return (
		<>
			<Head>
				<title>Tasko - Task Manager</title>
			</Head>
			{getLayout(<Component {...pageProps} />)}
			<Toaster />
		</>
	);
}
