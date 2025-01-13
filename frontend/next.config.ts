import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	output: "export",
	// TODO: criar loader customizado para carregamento de imagens
	// images: {
	// 	loader: "custom",
	// 	loaderFile: "./my-loader.ts"
	// }
};

export default nextConfig;
