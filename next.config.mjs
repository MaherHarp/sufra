/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Unsplash resizes on its own CDN, so images skip the Next.js optimizer
    // and are requested at the right width straight from images.unsplash.com.
    loader: "custom",
    loaderFile: "./lib/unsplashLoader.ts",
  },
};
export default nextConfig;
