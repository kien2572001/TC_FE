/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "http://13.212.172.169:3008", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
