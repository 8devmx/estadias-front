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
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8000',
  },
};

export default nextConfig;