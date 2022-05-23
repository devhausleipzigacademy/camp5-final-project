/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["upload.wikimedia.org", "placeimg.com", "unsplash.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
