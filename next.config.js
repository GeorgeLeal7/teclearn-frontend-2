/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return {
			afterFiles: [
				{
					source: '/:path*',
					destination: `http://10.107.144.25:8080/:path*`,
				},
			],
		};
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
