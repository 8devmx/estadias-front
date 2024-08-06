// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,compiler: {
//     // Enables the styled-components SWC transform
//     styledComponents: true
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
