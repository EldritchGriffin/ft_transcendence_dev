/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "cdn.intra.42.fr" },
    ],
  },
  reactStrictMode: false,
};
