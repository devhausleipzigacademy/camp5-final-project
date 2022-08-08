/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    domains: [
      "upload.wikimedia.org",
      "placeimg.com",
      "images.unsplash.com",
      "unsplash.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "res.cloudinary.com",
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      fs: false,
    };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
