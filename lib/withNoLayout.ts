import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export function withNoLayout(Component: NextPageWithLayout) {
	Component.getLayout = function getLayout(page: ReactElement) {
		return page;
	}
	return Component;
}
