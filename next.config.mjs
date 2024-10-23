/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arrangespy.s3-tastewp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
