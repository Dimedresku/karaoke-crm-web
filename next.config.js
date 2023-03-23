/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.56.110:8080/api/:path*"
      }
    ]
  }
}

module.exports = nextConfig
