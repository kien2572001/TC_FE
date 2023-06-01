/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "http://localhost:3008", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
