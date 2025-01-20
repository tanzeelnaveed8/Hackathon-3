/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.sanity.io'], // Allow images from the Sanity CDN
    },
    reactStrictMode: true, // Optional: Enables React's Strict Mode
  };
  
  export default nextConfig;
  