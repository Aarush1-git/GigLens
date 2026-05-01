/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // When someone visits the root domain...
        source: '/',
        // ...serve them the static HTML file
        destination: '/index.html',
      }
    ]
  }
};

export default nextConfig;