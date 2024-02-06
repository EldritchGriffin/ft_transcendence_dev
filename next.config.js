/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: ["res.cloudinary.com", "cdn.intra.42.fr"],
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "cdn.intra.42.fr" },
    ],
  },
  reactStrictMode: false,
};
