/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org", "placeimg.com"],
  },
};

module.exports = nextConfig;
