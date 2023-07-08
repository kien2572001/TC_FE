/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "https://tastingcuisine.kien2572001.tech/", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
